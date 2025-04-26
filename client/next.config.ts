import type { NextConfig } from "next";

function getStrapiHostFromEnv() {
  try {
    const rawUrl =
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
