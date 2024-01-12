import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword  } from 'firebase/auth'

export default function Login() {

    const navigate = useNavigate()

    const handleGoogleLogin = () => {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider)
            .then((result) => {
                console.info(result)
                localStorage.setItem('user', JSON.stringify(result.user))
                navigate('/dashboard')
            })
            .catch((err) => {
                console.info(err)
            })
    }

    const handleEmailGoogleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value

        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.clear()
            const user = userCredential.user
            if(user.emailVerified) {
                alert('Login success')
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/dashboard')
            } else {
                alert('Verifikasi terlebih dahulu')
            }
        })
        .catch(() => {
            // kita bisa buat if jika email tidak sesuai
            const userEmail = JSON.parse(localStorage.getItem('userEmail'))
            if(userEmail) {
                return alert('Akun yang Anda masukkan salah')
            } else {
                return alert('Verifikasi terlebih dahulu')
            }
        })
    } 

  return (
    <main className='w-screen min-h-screen flex flex-col max-w-[500px] mx-auto p-10'>
        <form className='w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6' autoComplete='off' onSubmit={handleEmailGoogleLogin}>
            <h1 className='text-4xl text-[#79C3AD] text-center' >Login</h1>

            <div className='flex flex-col gap-2'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
            </div>

            <div className='mt-4 flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <button className='h-10 w-full bg-blue-500 text-white rounded-lg' type='submit'>Login</button>
                    <Link to={'/register'} className='h-10 w-full bg-slate-500 text-white rounded-lg flex justify-center items-center' >Register</Link>
                </div>
                <button type="button" onClick={handleGoogleLogin} className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Using Google</button>
            </div>

        </form>
    </main>
  )
}
