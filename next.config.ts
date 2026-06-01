import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sachnet.thewarriors.team",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
