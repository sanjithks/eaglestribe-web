// lib/data.js

// This function remains the same.
async function fetchAPI(path) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${path}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`API fetch error for path: ${path}:`, await res.text());
      return []; 
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error in fetchAPI for path: ${path}:`, error);
    return [];
  }
}

// NOTE: We assume your API and/or RideTile component handles the data flattening,
// so we will access properties like `ride.ride_date` directly, as per your working code.

// --- Centralized Data Processing ---

// NEW: This internal function is the single source of truth for sorted rides.
async function getSortedRides() {
  // 1. Fetch all rides from the base function
  const rides = await fetchAPI('/rides?populate=featured_image');

  // 2. Filter out any invalid entries
  const validRides = rides.filter(ride => ride && ride.ride_date);
  
  // 3. Sort them with the newest first and return
  return validRides.sort(
    (a, b) => new Date(b.ride_date) - new Date(a.ride_date)
  );
}


// --- EXPORTED FUNCTIONS FOR YOUR PAGES ---

/**
 * Use this on your main rides page.
 * It now gets the pre-sorted list and slices it.
 */
export async function getRecentRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(0, 3);
}

/**
 * Use this on your archives page.
 * It also gets the pre-sorted list and slices it.
 */
export async function getArchivedRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(3);
}

/**
 * This function for the detail page remains the same.
 */
export async function getRide(slug) {
  const rides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  return rides?.[0] || null;
}