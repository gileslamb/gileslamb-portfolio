import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Unlisted grant-panel listening pages: keep out of search
        source: "/listen/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/immersive/museum-reel",
        destination: "/reels/museum-reel",
        permanent: true,
      },
      {
        source: "/resonantbeing",
        destination: "/urlar",
        permanent: true,
      },
      {
        // Moved 3 Sep 2026: the listening room now lives under /releases
        source: "/invisible-threads",
        destination: "/releases/invisible-threads",
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
        source: "/releases/hemispheric-joy",
        destination: "/releases/hemispheric-joy/index.html",
      },
      {
        source: "/releases/hemispheric-joy/listen",
        destination: "/releases/hemispheric-joy/listen/index.html",
      },
      {
        // Archived 2 Aug 2026: the 8 June 2026 invite-only preview card.
        // /live is now an App Router page; the invite kept at its own URL.
        source: "/live-preview-8-june",
        destination: "/live-preview-8-june/index.html",
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
