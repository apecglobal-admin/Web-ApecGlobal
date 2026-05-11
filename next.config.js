/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
    // Allow local images without domains restriction
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Removed optimizeCss to prevent Tailwind build issues
}

module.exports = nextConfig
