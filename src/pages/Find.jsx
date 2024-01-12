import axios from 'axios'
import React from 'react'

export default function Find() {

    const handleSend = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const location = event.target.location.value
        const date = event.target.date.value

        const resetFormValues = () => {
            document.getElementById('name').value = ''
            document.getElementById('location').value = ''
            document.getElementById('date').value = ''
        }

        const requestingData = {
            name: name, 
            location: location,
            date: date
        }

        axios({
            method: "POST",
            url: "http://localhost:3200/report",
            data: requestingData
        }).then(() => {
            alert('Data berhasil terkirim\nTerima kasih atas laporan Anda😊')
            resetFormValues()
        })
    }

  return (
    <main className='w-screen min-h-screen flex flex-col max-w-[500px] mx-auto p-10'>
        <form className='mb-4' autoComplete='off' onSubmit={handleSend}>
            <h1 className='text-4xl text-[#79C3AD] text-center mb-8' >Find Something</h1>
            <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' className='h-10 px-3 rounded-md border-[1px] border-gray-300 outline-none' />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor='location'>Location</label>
                <input type='text' id='location' className='h-10 px-3 rounded-md border-[1px] border-gray-300 outline-none' />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
                <label htmlFor='date'>Date</label>
                <input type='text' id='date' className='h-10 px-3 rounded-md border-[1px] border-gray-300 outline-none' />
            </div>

            <button type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Send</button>
        </form>
    </main>
  )
}
