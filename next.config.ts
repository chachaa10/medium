import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/@:author",
        destination: "/:author",
      },
      {
        source: "/@:author/:slug",
        destination: "/:author/:slug",
      },
    ];
  },
  typedRoutes: true,
};

export default nextConfig;
