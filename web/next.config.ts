import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // News articles come from many different source domains so we allow
        // any HTTPS host. TODO: restrict to known news CDN domains before production.
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
