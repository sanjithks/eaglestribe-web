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

// ✅ NEW: A helper function to simplify the Strapi data structure
function flattenAttributes(data) {
  if (!data) return null;
  // Takes an object like { id: 1, attributes: { title: '...' } }
  // and returns { id: 1, title: '...' }
  return {
    id: data.id,
    ...data.attributes,
  };
}

// --- Centralized Data Processing ---

async function getSortedRides() {
  // Fetch all rides, populating the necessary image field
  const rides = await fetchAPI('/rides?populate=featured_image');

  // ✅ FIX: Access the date from inside the `attributes` object
  const validRides = rides.filter(ride => ride.attributes && ride.attributes.ride_date);
  
  const sortedRides = validRides.sort(
    (a, b) => new Date(b.attributes.ride_date) - new Date(a.attributes.ride_date)
  );
  
  // ✅ IMPORTANT: Map over the sorted rides and flatten each one
  return sortedRides.map(flattenAttributes);
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

export async function getRide(slug) {
  const rides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  if (!rides || rides.length === 0) return null;
  
  // ✅ FIX: Flatten the single ride object before returning it
  return flattenAttributes(rides[0]);
}