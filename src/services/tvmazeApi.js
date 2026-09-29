const BASE_URL = 'https://api.tvmaze.com';

/**
 * Fetch all shows with pagination (page 0 gives the primary top shows)
 * @param {number} page 
 * @returns {Promise<Array>}
 */
export async function fetchShows(page = 0) {
  try {
    const res = await fetch(`${BASE_URL}/shows?page=${page}`);
    if (!res.ok) {
      throw new Error(`Failed to load shows: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
}

/**
 * Search shows by title query
 * @param {string} query 
 * @returns {Promise<Array>}
 */
export async function searchShows(query) {
  if (!query || !query.trim()) {
    return [];
  }

  try {
    const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`);
    if (!res.ok) {
      throw new Error(`Failed to search shows: ${res.statusText}`);
    }
    const data = await res.json();
    // TVMaze search returns [{ score, show: { ... } }, ...]
    // Normalize into flat array of show objects
    return data.map(item => item.show || item);
  } catch (error) {
    console.error(`Error searching shows for "${query}":`, error);
    throw error;
  }
}

/**
 * Fetch single show details by ID
 * @param {string|number} id 
 * @returns {Promise<Object>}
 */
export async function fetchShowById(id) {
  try {
    const res = await fetch(`${BASE_URL}/shows/${id}`);
    if (!res.ok) {
      throw new Error(`Show not found: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching show ${id}:`, error);
    throw error;
  }
}

/**
 * Utility to strip HTML tags safely for snippet generation
 * @param {string} html 
 * @returns {string}
 */
export function stripHtml(html) {
  if (!html) return 'No description available.';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Format date string into Year (e.g. "2024-03-15" -> "2024")
 * @param {string} dateStr 
 * @returns {string}
 */
export function getYear(dateStr) {
  if (!dateStr) return 'TBA';
  const match = dateStr.match(/^\d{4}/);
  return match ? match[0] : dateStr;
}

/**
 * Format rating with star
 * @param {Object} ratingObj 
 * @returns {string}
 */
export function formatRating(ratingObj) {
  if (ratingObj && ratingObj.average !== null && ratingObj.average !== undefined) {
    return ratingObj.average.toFixed(1);
  }
  return 'N/A';
}
