import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/prototypes/creative-collab",
        destination: "/prototypes/creative-collab/index.html",
      },
    ];
  },
};

export default nextConfig;
