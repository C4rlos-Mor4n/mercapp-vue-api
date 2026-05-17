import { ref, onUnmounted } from 'vue'

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  let controller = null

  async function execute(fn) {
    if (controller) controller.abort()
    controller = new AbortController()
    loading.value = true
    error.value = null

    try {
      const result = await fn(controller.signal)
      data.value = result
      return result
    } catch (err) {
      if (err.name === 'AbortError') return
      error.value = err.message || 'Error al cargar datos'
      try {
        const result = await fn(controller.signal)
        data.value = result
        return result
      } catch (retryErr) {
        if (retryErr.name === 'AbortError') return
        error.value = retryErr.message || 'Error al cargar datos'
        throw retryErr
      }
    } finally {
      loading.value = false
    }
  }

  function cancel() {
    if (controller) controller.abort()
  }

  onUnmounted(() => cancel())

  return { data, loading, error, execute, cancel }
}
