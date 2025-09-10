import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV !== 'production'

const nextConfig: NextConfig = {
  async rewrites() {
    if (!isDev) return [] // no rewrites needed in prod

    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
      {
        source: '/auth/login',
        destination: 'http://localhost:8080/auth/login',
      },
      {
        source: '/login/:path*',
        destination: 'http://localhost:8080/login/:path*',
      },
      {
        source: '/oauth2/:path*',
        destination: 'http://localhost:8080/oauth2/:path*',
      },
      {
        source: '/logout',
        destination: 'http://localhost:8080/logout',
      },
    ]
  },
  images: {
    remotePatterns: [new URL('https://*.googleusercontent.com/**')],
  },
}

export default nextConfig
