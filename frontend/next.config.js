/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['jotai-devtools'],
  images: {
    domains: ['loremflickr.com'],
  },
}

module.exports = nextConfig
