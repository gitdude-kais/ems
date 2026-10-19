import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage'

export const AuthContext = createContext([[], () => {}])

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    if (!localStorage.getItem('employees')) setLocalStorage()
    return getLocalStorage().employees || []
  })

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(userData))
  }, [userData])

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider