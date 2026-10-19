import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/DashBoard/EmployeeDashBoard'
import AdminDashboard from './components/DashBoard/AdminDashBoard'
import { AuthContext } from './context/AuthProvider'
import { getLocalStorage } from './utils/LocalStorage'

const App = () => {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData] = useContext(AuthContext)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('loggedInUser')
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser(parsed.role)
        setLoggedInUserData(parsed.data || null)
      }
    } catch {
      localStorage.removeItem('loggedInUser')
    }
  }, [])

  const handleLogin = (email, password) => {
    const { admin } = getLocalStorage()
    const isAdmin = admin?.some((a) => a.email === email && a.password === password)

    if (isAdmin) {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return
    }

    const employee = userData?.find((e) => e.email === email && e.password === password)

    if (employee) {
      setUser('employee')
      setLoggedInUserData(employee)
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
    } else {
      alert('Invalid Credentials')
    }
  }

  const changeUser = (value) => {
    setUser(value)
    if (!value) setLoggedInUserData(null)
  }

  // always read the live copy so clicks show up immediately
  const currentEmployee =
    userData?.find((e) => e.email === loggedInUserData?.email) || loggedInUserData

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === 'admin' && <AdminDashboard changeUser={changeUser} />}
      {user === 'employee' && currentEmployee && (
        <EmployeeDashboard changeUser={changeUser} data={currentEmployee} />
      )}
    </>
  )
}

export default App