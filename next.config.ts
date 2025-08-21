import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"], // Sanity’s image domain
  },
  webpack(config) {
    // Ignore source map files from chrome-aws-lambda and puppeteer-core
    config.module.rules.push({
      test: /\.js\.map$/,
      loader: "ignore-loader",
    });
    return config;
  },
};

export default nextConfig;
