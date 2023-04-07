const {UserRewrites} = require('./configs/rewrites/user.module.api-list')
const {ProviderRewrites} = require('./configs/rewrites/provider.module.api-list');
const {MovieRewrites} = require('./configs/rewrites/movie.module.api-list')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname:'image.tmdb.org',
        pathname:'/**'
      }
    ]
  },
  // reactStrictMode: true,
  async rewrites() {
    return [
      ...UserRewrites,
      ...ProviderRewrites,
      ...MovieRewrites,
    ]
  }
}

module.exports = nextConfig
