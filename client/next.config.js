/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source:"/hello",
        destination:"/hi",
        permanent : false,
      }
    ]
  }
}

module.exports = nextConfig
