/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
    ]
  },
}

module.exports = nextConfig
