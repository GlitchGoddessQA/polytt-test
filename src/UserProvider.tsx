import { createContext, useContext, useCallback, useState, useMemo, useEffect } from 'react'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const UserContext = createContext<{
  user: User | null
  loading: boolean,
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}>({
  user: null,
  loading: true,
  login: async (email: string, password: string) => { },
  logout: () => { }
})

export interface User {
  email: string
}

export interface UserProviderProps {
  children: React.ReactNode
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const login = useCallback(async (email: string, password: string) => {
    if (password !== 'secret') {
      throw new Error('Invalid password')
    }
    await wait(1000)
    window.localStorage.setItem('email', email)
    setUser({ email })

  }, [])

  const logout = useCallback(async () => {
    window.localStorage.removeItem('email')
    setUser(null)
  }, [])

  useEffect(() => {
    if (!loading) return
    setLoading(false)
    const email = window.localStorage.getItem('email')
    if (email) {
      setUser({ email })
    }
  }, [loading])

  const value = useMemo(() => {
    return { user, login, logout, loading }
  }, [user, login, logout, loading])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
} 