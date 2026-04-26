/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    remotePatterns: [{ protocol: 'https', hostname: '**.ecosystem.org' }],
  },
  experimental: { optimizePackageImports: ['lucide-react', 'motion'] },
}

module.exports = nextConfig
