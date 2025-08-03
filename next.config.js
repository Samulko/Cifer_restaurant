/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Cifer_restaurant' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Cifer_restaurant' : '',
}

module.exports = nextConfig