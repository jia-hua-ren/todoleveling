import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8080'

// Paths that should bypass proxy and go directly to backend
const DIRECT_BACKEND_PATHS = [
  '/login/oauth2',
  '/oauth2/authorization',
  '/logout',
]

interface ProxyContext {
  params: Promise<{ path?: string[] }>
}

async function handler(req: NextRequest, context: ProxyContext) {
  const params = await context.params
  const pathArray = params?.path ?? []
  const pathname = `/${pathArray.join('/')}`

  // Skip OAuth-related paths
  if (DIRECT_BACKEND_PATHS.some((prefix) => pathname.startsWith(prefix))) {
    const directUrl = `${BACKEND_URL}${pathname}${req.nextUrl.search || ''}`
    return NextResponse.redirect(directUrl)
  }

  // Everything else is /api/*
  const url = `${BACKEND_URL}/api${pathname}${req.nextUrl.search || ''}`
  console.log(`Proxying request to: ${url}`)

  // Forward body safely
  const contentType = req.headers.get('content-type') || ''
  let body: BodyInit | undefined
  if (!['GET', 'HEAD'].includes(req.method || '')) {
    if (contentType.includes('application/json')) {
      try {
        const json = await req.json()
        body = Object.keys(json).length > 0 ? JSON.stringify(json) : undefined
      } catch {
        body = undefined // no JSON body provided
      }
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      body = await req.text()
    } else {
      const buffer = await req.arrayBuffer()
      body = buffer.byteLength > 0 ? buffer : undefined
    }
  }

  // Forward request
  const res = await fetch(url, {
    method: req.method,
    headers: {
      'content-type': contentType,
      cookie: req.headers.get('cookie') || '',
      'X-XSRF-TOKEN': req.headers.get('X-XSRF-TOKEN') || '',
    },
    body,
  })

  // Build response (preserve body + headers)
  const noBodyStatus = [204, 205, 304]
  let response: NextResponse

  if (noBodyStatus.includes(res.status)) {
    response = new NextResponse(null, { status: res.status })
  } else {
    response = new NextResponse(res.body, {
      status: res.status,
      headers: Object.fromEntries(res.headers),
    })
  }

  // Forward Set-Cookie header(s)
  const setCookie = res.headers.get('set-cookie')
  if (setCookie) {
    response.headers.set('set-cookie', setCookie)
  }

  return response
}

// Export handlers
export const GET = (req: NextRequest, context: ProxyContext) =>
  handler(req, context)
export const POST = (req: NextRequest, context: ProxyContext) =>
  handler(req, context)
export const PUT = (req: NextRequest, context: ProxyContext) =>
  handler(req, context)
export const PATCH = (req: NextRequest, context: ProxyContext) =>
  handler(req, context)
export const DELETE = (req: NextRequest, context: ProxyContext) =>
  handler(req, context)
