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
    return data.data || [];
  } catch (error) {
    console.error(`Error in fetchAPI for path: ${path}:`, error);
    return [];
  }
}

// Fetches all rides for the main and archives pages
export async function getRides() {
  return await fetchAPI('/rides?populate=featured_image');
}

// Fetches a single ride by its slug for the detail page
export async function getRide(slug) {
  const rides = await fetchAPI(`/rides?filters[documentId][$eq]=${slug}&populate=*`);
  // The API returns an array, so we return the first item.
  return rides?.[0] || null;
}