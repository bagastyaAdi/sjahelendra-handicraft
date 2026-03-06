/**
 * Converts a string to a URL-friendly slug.
 * Example: "Balinese Mask Carving" -> "balinese-mask-carving"
 */
export const createSlug = (text) => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w-]+/g, '')     // Remove all non-word chars
        .replace(/--+/g, '-');       // Replace multiple - with single -
};

/**
 * Reverts a slug back to a searchable string (basic conversion).
 * Note: This might not perfectly recreate the original string if special characters were removed,
 * but it works for ILIKE database queries.
 * Example: "balinese-mask-carving" -> "balinese mask carving"
 */
export const revertSlug = (slug) => {
    if (!slug) return '';
    return slug.replace(/-/g, ' ');
};
