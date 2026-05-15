import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Adrian_portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
