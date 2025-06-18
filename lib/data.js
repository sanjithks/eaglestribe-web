// lib/data.js

// This function fetches the raw, nested data from Strapi. It is correct.
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

// ✅ NEW: A helper function to transform the nested data into a simple, flat object.
function flattenAttributes(data) {
  if (!data) return null;
  return {
    id: data.id,
    ...data.attributes,
  };
}

// --- Centralized Data Processing ---

async function getSortedRides() {
  const queryString = '/rides?populate=featured_image&fields=title,short_description,documentId,ride_date';
  const nestedRides = await fetchAPI(queryString);

  // Filter and sort using the correct nested path
  const validRides = nestedRides.filter(ride => ride.attributes && ride.attributes.ride_date);
  const sortedRides = validRides.sort(
    (a, b) => new Date(b.attributes.ride_date) - new Date(a.attributes.ride_date)
  );
  
  // ✅ IMPORTANT: Return the FLATTENED array for components to use.
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
  const nestedRides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  if (!nestedRides || nestedRides.length === 0) return null;
  
  // ✅ Flatten the single ride object before returning it.
  return flattenAttributes(nestedRides[0]);
}