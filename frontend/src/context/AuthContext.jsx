import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('skasc_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('skasc_user')
  }

  const getStoredUser = () => {
    const stored = localStorage.getItem('skasc_user')
    if (stored && !user) {
      setUser(JSON.parse(stored))
    }
    return user
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getStoredUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}