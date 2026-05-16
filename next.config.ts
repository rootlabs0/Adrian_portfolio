import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Only apply basePath in production (static export for GitHub Pages)
  // Dev server doesn't properly support basePath with public assets
  basePath: process.env.NODE_ENV === "production" ? "/Adrian_portfolio" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
