const nextConfig = {
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
