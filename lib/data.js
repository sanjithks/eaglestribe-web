// lib/data.js
// This file centralizes all your data fetching logic for rides.

async function fetchAPI(path) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${path}`;
  try {
    const res = await fetch(url, {
      // Use time-based revalidation to keep the site static but fresh.
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) {
      console.error(`API fetch error for path: ${path}:`, await res.text());
      throw new Error('Failed to fetch API');
    }
    const data = await res.json();
    // Strapi V4 returns data nested under a `data` property
    return data.data || [];
  } catch (error) {
    console.error(`Error in fetchAPI for path: ${path}:`, error);
    return [];
  }
}

// --- CORE RIDE FETCHING LOGIC ---

// Fetches all rides from the API. We'll call this internally.
async function fetchAllRides() {
  // We populate the featured_image here for the ride tiles.
  return await fetchAPI('/rides?populate=featured_image');
}

/**
 * NEW INTERNAL FUNCTION: The single source of truth for sorted rides.
 * It fetches, validates, and sorts all rides at once.
 */
async function getSortedRides() {
  const rides = await fetchAllRides();
  
  // Filter out any entries that might be missing the required date attribute.
  const validRides = rides.filter(ride => ride.attributes && ride.attributes.ride_date);
  
  // Sort the rides with the newest first.
  // Note: We use `ride.attributes.ride_date` because of the Strapi V4 structure.
  return validRides.sort(
    (a, b) => new Date(b.attributes.ride_date) - new Date(a.attributes.ride_date)
  );
}


// --- EXPORTED FUNCTIONS FOR YOUR PAGES ---

/**
 * NEW: Use this on your main rides page.
 * Gets the 3 most recent rides.
 */
export async function getRecentRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(0, 3);
}

/**
 * NEW: Use this on your archives page.
 * Gets all rides except for the 3 most recent.
 */
export async function getArchivedRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(3);
}

/**
 * Fetches a single ride by its slug for the detail page.
 * This function remains unchanged.
 */
export async function getRide(slug) {
  const rides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  // The API returns an array, so we return the first item.
  return rides?.[0] || null;
}