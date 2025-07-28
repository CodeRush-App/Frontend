import type { NextConfig } from "next";
import { resolve } from 'path';

const nextConfig: NextConfig = {
  webpack: (config: NextConfig) => {
    config.resolve.alias['@'] = resolve(__dirname, 'src');
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};

export default nextConfig;
