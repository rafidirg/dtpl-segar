export function getGoogleMapsApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Google Maps API key is not defined in environment variables."
    );
  }
  return apiKey;
}