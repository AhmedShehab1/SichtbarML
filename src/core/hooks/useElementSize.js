import { useEffect, useState } from 'react'

export function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) {
      return undefined
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }

      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return size
}
