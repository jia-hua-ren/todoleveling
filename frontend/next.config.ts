import type { NextConfig } from 'next'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

if (!backendUrl) {
  throw new Error('Missing BACKEND_URL env variable')
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://*.googleusercontent.com/**')],
  },
}

export default nextConfig
