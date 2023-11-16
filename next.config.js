/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'referrer-policy', value: 'no-referrer' }],
      },
    ];
  },
};

module.exports = nextConfig;
