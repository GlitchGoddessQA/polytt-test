import { useEffect, useState } from "react"

export function useIsLoading() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (!isLoading) return
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, (Math.random() * 1000) + 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading])
  return isLoading
}