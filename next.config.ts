import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },
  async redirects() {
    return [
      // /work/vagus → case study HTML. A silent rewrite at this path would break
      // relative links (assets/, case/, prototype); landing on the .html URL keeps them working.
      {
        source: "/work/vagus",
        destination: "/work/vagus/vagus-case-study.html",
        permanent: false,
      },
      {
        source: "/work/vagus/",
        destination: "/work/vagus/vagus-case-study.html",
        permanent: false,
      },
    ];
  },
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
