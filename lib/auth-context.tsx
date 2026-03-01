"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // CTF #5 Ghost Session: check localStorage for lingering session
    const token = localStorage.getItem("tb_session_token")
    const storedUser = localStorage.getItem("tb_user")
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } catch {
        // ignore
      }
    }
  }, [])

  const login = useCallback((email: string, _password: string) => {
    // Mock auth - accepts any password
    const mockUser = { email, name: email.split("@")[0] }
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("tb_session_token", "mock-jwt-" + Date.now())
    localStorage.setItem("tb_user", JSON.stringify(mockUser))
    return true
  }, [])

  const register = useCallback((name: string, email: string, _password: string) => {
    const mockUser = { email, name }
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("tb_session_token", "mock-jwt-" + Date.now())
    localStorage.setItem("tb_user", JSON.stringify(mockUser))
    return true
  }, [])

  const logout = useCallback(() => {
    // CTF #5 Ghost Session: clear UI state but DO NOT clear localStorage token
    setUser(null)
    setIsAuthenticated(false)
    // Intentionally NOT clearing: localStorage.removeItem("tb_session_token")
    // Intentionally NOT clearing: localStorage.removeItem("tb_user")
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
