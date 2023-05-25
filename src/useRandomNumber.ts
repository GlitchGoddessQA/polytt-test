import { useState, useEffect } from 'react'
import { useIsLoading } from './useIsLoading'

export function useRandomNumber() {
  const [randomNumber, setRandomNumber] = useState<null | number>(null)
  const isLoading = useIsLoading()
  useEffect(() => {
    if (isLoading) return
    setRandomNumber(Math.floor(Math.random() * 100 + 1))
  }, [isLoading])
  return [randomNumber, isLoading]
}