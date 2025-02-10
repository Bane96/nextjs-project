import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ev-database.org',
                pathname: '/img/**'
            }
        ]
    }
};

export default nextConfig;
