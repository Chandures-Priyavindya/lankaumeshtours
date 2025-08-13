import type { NextConfig } from "next";

const isExport = process.env.EXPORT === 'true';

const nextConfig: NextConfig = {
  // Only use static export for deployment
  ...(isExport && { output: 'export' }),
  
  basePath: isExport ? '/lankaumeshtours' : '',
  assetPrefix: isExport ? '/lankaumeshtours/' : '',
  
  images: {
    unoptimized: isExport,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  trailingSlash: isExport,
};

export default nextConfig;