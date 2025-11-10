import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode : true, 
  images : {
    domains : [
      'images6.alphacoders.com',
      'images2.alphacoders.com',
      'images3.alphacoders.com',
      'images4.alphacoders.com',
      'images8.alphacoders.com',
    ]
  }
};

export default nextConfig;
