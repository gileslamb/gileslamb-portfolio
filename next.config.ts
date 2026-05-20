import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/immersive/museum-reel",
        destination: "/reels/museum-reel",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/unstable-systems/001",
        destination: "/unstable-systems/001/index.html",
      },
      {
        source: "/unstable-systems/001/listen",
        destination: "/unstable-systems/001/listen/index.html",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "substack-post-media.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gileslamb.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
