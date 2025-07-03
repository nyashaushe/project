// Utility to fetch content from Strapi backend
// Usage: getStrapiContent('blogs'), getStrapiContent('newsletters'), etc.

export async function getStrapiContent(contentType: string) {
  const res = await fetch(`http://localhost:1337/api/${contentType}`);
  if (!res.ok) throw new Error('Failed to fetch content');
  const data = await res.json();
  return data;
}
