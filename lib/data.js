// lib/data.js

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

async function getSortedRides() {
  // ✅ FIX: We now explicitly ask for the fields we need for the tiles and sorting.
  // This guarantees that `documentId`, `title`, etc., will always be included in the response.
  const queryString = '/rides?populate=featured_image&fields=title,short_description,documentId,ride_date';
  const rides = await fetchAPI(queryString);

  const validRides = rides.filter(ride => ride && ride.ride_date);
  
  const sortedRides = validRides.sort(
    (a, b) => new Date(b.ride_date) - new Date(a.ride_date)
  );
  
  return sortedRides;
}


// --- EXPORTED FUNCTIONS FOR YOUR PAGES ---
// (These do not need to change)

export async function getRecentRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(0, 3);
}

export async function getArchivedRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(3);
}

export async function getRide(slug) {
  const rides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  return rides?.[0] || null;
}