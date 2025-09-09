import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8080'

// Paths that should NOT be prefixed with /api/
const SPECIAL_PATHS = new Set(['logout'])

interface ProxyContext {
  params: Promise<{ path?: string[] }>
}

async function handler(req: NextRequest, context: ProxyContext) {
  const params = await context.params
  const pathArray = params?.path ?? []

  // Determine backend path
  const backendPath =
    pathArray.length === 0
      ? ''
      : SPECIAL_PATHS.has(pathArray[0])
      ? pathArray.join('/')
      : `api/${pathArray.join('/')}`

  const url = `${BACKEND_URL}/${backendPath}${req.nextUrl.search || ''}`

  // Forward the request body correctly
  const contentType = req.headers.get('content-type') || ''
  let body: BodyInit | undefined
  if (!['GET', 'HEAD'].includes(req.method || '')) {
    if (contentType.includes('application/json')) {
      body = JSON.stringify(await req.json())
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      body = await req.text()
    } else {
      body = await req.arrayBuffer() // fallback for binary
    }
  }

  // Forward the request to backend
  const res = await fetch(url, {
    method: req.method,
    headers: {
      'content-type': contentType,
      cookie: req.headers.get('cookie') || '',
      'X-XSRF-TOKEN': req.headers.get('X-XSRF-TOKEN') || '',
    },
    body,
  })

  // Handle empty-body status codes
  const noBodyStatus = [204, 205, 304]
  let response: NextResponse

  if (noBodyStatus.includes(res.status)) {
    response = new NextResponse(null, { status: res.status })
  } else {
    const responseBody = await res.text()
    response = new NextResponse(responseBody, { status: res.status })
  }

  // Forward Set-Cookie headers
  const setCookie = res.headers.get('set-cookie')
  if (setCookie) response.headers.set('set-cookie', setCookie)

  return response
}

// Export for all HTTP methods
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
