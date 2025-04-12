export function getStrapiURL() {
  return process.env.STRPI_API_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url: string) {
  if (!url) return null;
  return url.startsWith("/") ? `${getStrapiURL()}${url}` : url;
}
