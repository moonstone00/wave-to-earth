import { Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './firebase'
import Find from './pages/Find'

export default function App() {

  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const auth = getAuth()
    onAuthStateChanged(auth, (result) => {
      if(result) {
        setIsLogin(true)
        setIsLoading(false)
        return
      }

      setIsLogin(false)
      setIsLoading(false)

    })

  }, [])

  if(isLoading) {
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center' >
        Loading...
      </div>
    )
  }

  return (

    <>
      {isLogin ? 
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      :
        <Routes>
          <Route path='/' element={<Find/>} />
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/register' element={<Register/>} ></Route>
        </Routes>
    
    }
    </>
  )
}