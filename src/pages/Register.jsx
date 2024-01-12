import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import React from 'react'
import axios from 'axios'
export default function Register() {

    const navigate = useNavigate()

    const handleGoogleRegister = (event) => {
        event.preventDefault()
        const userName = event.target.userName.value
        const email = event.target.email.value
        const password = event.target.password.value
        const password2 = event.target.password2.value

        
        if(!email || !password || !password2) {
            return alert('silahkan lengkapi data')
        } 
        if(password !== password2) {
            return alert('password harus sama')
        }
        if(password.length < 6) {
            return alert('password harus lebih dari 6 karakter')
        }
        
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const requestingData = {
                userName: userName,
                email: email, 
                password: password,
                password2: password2
            }
            axios({
                method: "POST",
                url: "http://localhost:3200/users",
                data: requestingData
            }).then((result) => {
                console.log(result)
                if(result.data.users) {
                    sendEmailVerification(userCredential.user)
                    navigate('/login')
                    localStorage.setItem('userName', JSON.stringify(requestingData.userName))
                    localStorage.setItem('userEmail', JSON.stringify(requestingData.email))
                }
            }).catch((error) => {
                console.log('saat ini anda mengirim data ke server', error)
            })
            

        })
        .catch((error) => {
            console.error(error)
        })
    }

  return (
    <main className='w-screen min-h-screen flex flex-col max-w-[500px] mx-auto p-10'>
        <form className='w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6' autoComplete='off' onSubmit={handleGoogleRegister}>
            <h1 className='text-4xl text-yellow-600 text-center' >Register</h1>

            <div className='flex flex-col gap-2'>
                <label htmlFor='userName'>UserName</label>
                <input type='text' id='userName' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>
            
            <div className='flex flex-col gap-2'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor='password2'>Confirm Password</label>
                <input type='password' id='password2' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='mt-4 flex flex-col gap-2'>
                <div className='flex gap-3'>
                    <button className='h-10 w-full bg-yellow-600 text-white rounded-lg' type='submit'>Register</button>
                    <Link to={'/'} className='h-10 w-full bg-slate-500 text-white rounded-lg flex justify-center items-center' >Login</Link>
                </div>
                <button type="button" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Using Google</button>
            </div>

        </form>
    </main>
  )
}
