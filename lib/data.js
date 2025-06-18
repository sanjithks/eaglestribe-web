// lib/data.js

// This function is correct and remains the same.
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
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(`Error in fetchAPI for path: ${path}:`, error);
    return [];
  }
}

// Fetches all rides for the main and archives pages
export async function getRides() {
  // ✅ THE ONLY CHANGE IS HERE: We are explicitly asking the API for all the fields our RideTile needs.
  const queryString = '/rides?populate=featured_image&fields=title,short_description,ride_date,documentId';
  return await fetchAPI(queryString);
}

// Fetches a single ride by its slug for the detail page
export async function getRide(slug) {
  const rides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  return rides?.[0] || null;
}