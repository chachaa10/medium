import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/@:author",
        destination: "/:author",
      },
      {
        source: "/@:author/:posts",
        destination: "/:author/:posts",
      },
    ];
  },
  typedRoutes: true,
};

export default nextConfig;
