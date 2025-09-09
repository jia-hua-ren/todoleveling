export async function getCsrfToken(): Promise<string> {
  const res = await fetch('/api/proxy/csrf', {
    credentials: 'include', // include session cookie
  })

  if (!res.ok) throw new Error('Failed to fetch CSRF token')

  const data = await res.json()
  return data.token // Use this token in POST headers
}
