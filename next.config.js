/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['utils', 'hooks', 'components', 'pages'],
  }
};

module.exports = nextConfig;