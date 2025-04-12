import type { NextConfig } from "next";

function getStrapiHostFromEnv() {
  try {
    const rawUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
    const { hostname } = new URL(rawUrl);
    return hostname;
  } catch (err) {
    console.warn(
      "⚠️ Invalid STRAPI_API_URL in .env, using 'localhost' as fallback"
    );
    return "localhost";
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [getStrapiHostFromEnv(), "localhost"],
  },
};

export default nextConfig;
