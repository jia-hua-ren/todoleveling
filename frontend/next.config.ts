import type { NextConfig } from 'next'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

if (!backendUrl) {
  throw new Error('Missing BACKEND_URL env variable')
}
console.log('Backend URL:', backendUrl)

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // API endpoints
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },

      // Login
      {
        source: '/auth/login',
        destination: `${backendUrl}/auth/login`,
      },

      // OAuth callback
      { source: '/login/:path*', destination: `${backendUrl}/login/:path*` },

      { source: '/oauth2/:path*', destination: `${backendUrl}/oauth2/:path*` },

      // Logout
      {
        source: '/logout',
        destination: `${backendUrl}/logout`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/logout',
        destination: `${backendUrl}/logout`,
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [new URL('https://*.googleusercontent.com/**')],
  },
}

export default nextConfig
