/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: process.env.NODE_ENV !== 'production' ? '' : "/rentreceipt",
  assetPrefix: process.env.NODE_ENV !== 'production' ? '' : "/rentreceipt"
}

module.exports = nextConfig
