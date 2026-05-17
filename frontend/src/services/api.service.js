const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options
  }

  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.message || 'Error en la petición')
    error.status = response.status
    error.errors = data.errors || []
    throw error
  }

  return data
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' })
}
