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
        source: "/releases/orbital-fifths",
        destination: "/releases/orbital-fifths/index.html",
      },
      {
        source: "/releases/orbital-fifths/listen",
        destination: "/releases/orbital-fifths/listen/index.html",
      },
      {
        source: "/live",
        destination: "/live/index.html",
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
