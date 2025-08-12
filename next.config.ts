import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export
  output: 'export',
  
  // IMPORTANT: Set your GitHub repo name here
  basePath: '/lankaumeshtours', // Replace with your actual repo name
  assetPrefix: '/lankaumeshtours', // Replace with your actual repo name
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    // Alternative: use a custom loader
    // loader: 'custom',
    // loaderFile: './src/lib/imageLoader.js'
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable trailing slash for static hosting
  trailingSlash: true,
};

export default nextConfig;