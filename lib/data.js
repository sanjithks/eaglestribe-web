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
  } catch (error)
  {
    console.error(`Error in fetchAPI for path: ${path}:`, error);
    return [];
  }
}

// This internal function correctly sorts your data. It should NOT be exported.
async function getSortedRides() {
  const queryString = '/rides?populate=featured_image&fields=title,short_description,ride_date,documentId';
  const rides = await fetchAPI(queryString);
  const validRides = rides.filter(ride => ride && ride.ride_date);
  const sortedRides = validRides.sort(
    (a, b) => new Date(b.ride_date) - new Date(a.ride_date)
  );
  return sortedRides;
}


// --- EXPORTED FUNCTIONS FOR YOUR PAGES ---

// ✅ FIX: Added the 'export' keyword here
export async function getRecentRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(0, 3);
}

// ✅ FIX: Added the 'export' keyword here. This will fix the build error.
export async function getArchivedRides() {
  const sortedRides = await getSortedRides();
  return sortedRides.slice(3);
}

// This function for the detail page is correct and should be exported.
export async function getRide(slug) {
  const rides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  return rides?.[0] || null;
}