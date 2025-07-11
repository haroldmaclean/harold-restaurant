/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'images.unsplash.com', 'your-custom-domain.com'],
  },
}

module.exports = nextConfig
