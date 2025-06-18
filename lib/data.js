// lib/data.js

// This function is correct and remains the same.
async function fetchAPI(path) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${path}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`API fetch error for path: ${path}:`, await res.text());
      return [];
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(`Error in fetchAPI for path: ${path}:`, error);
    return [];
  }
}

// --- Centralized Data Processing ---

// This internal function now correctly handles your flat data structure.
async function getSortedRides() {
  const rides = await fetchAPI('/rides?populate=featured_image');

  // ✅ FIX: Access `ride_date` directly, because your data is flat.
  const validRides = rides.filter(ride => ride && ride.ride_date);
  
  const sortedRides = validRides.sort(
    (a, b) => new Date(b.ride_date) - new Date(a.ride_date)
  );
  
  // No need to flatten data that is already flat.
  return sortedRides;
}


// --- EXPORTED FUNCTIONS FOR YOUR PAGES ---

export async function getRecentRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(0, 3);
}

export async function getArchivedRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(3);
}

// This function is now also simplified.
export async function getRide(slug) {
  const rides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  
  // No flattening needed, just return the first result.
  return rides?.[0] || null;
}