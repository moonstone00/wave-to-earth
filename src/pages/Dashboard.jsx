import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

    const [user, setUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const handleLogout = () => {
        const auth = getAuth()
        signOut(auth)
        .then(result => {
            localStorage.clear()
            navigate('/')
        })
        .catch((err) => {
            console.error(err)
        })
    }

    return (
        <main className='w-screen min-h-screen flex max-w-[600px] items-center mx-auto p-12' >

            <div className='w-full bg-white p-6 shadow-lg flex flex-col gap-4 items-center rounded-lg' >
                <h1 className='text-4xl text-[#79C3AD]' >Dashboard</h1>
                <img src={user?.photoURL} alt="image data" className='w-[80px] h-[80px] rounded-full object-cover' />
                <h3>{user?.email}</h3>
                <button className='h-10 bg-[#79C3AD] text-white rounded-lg w-full' onClick={handleLogout} >Logout</button>
            </div>
        </main> 
    )
}
