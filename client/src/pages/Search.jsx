import React from 'react'
import AppLayout from '../components/AppLayout'
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const browse = [
    {
        "title": "Blinding ",
        "image_url": "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe"
    },

    {
        "title": "Blinding ",
        "image_url": "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe"
    },

    {
        "title": "Blinding Lights",
        "image_url": "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe"
    },
    {
        "title": "Blinding Lights",
        "image_url": "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe"
    },
    {
        "title": "Blinding Lights",
        "image_url": "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe"
    },
    {
        "title": "Blinding Lights",
        "image_url": "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe"
    },
    {
        "title": "Blinding Lights",
        "image_url": "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe"
    },


]


const Search = () => {
    return (
        <AppLayout>
            <div className='sticky top-0 bg-black bg-opacity-85 z-50 hidden md:block'>
                <div className='flex items-center gap-12 z-10'>
                    <Link to="/">  <FaArrowLeft size={24} color='white' className='m-4' /></Link>

                    <form className='w-full py-4'>
                        <div className='relatisve'>
                            <input type="text" className='w-[35%] p-4 px-12 rounded-3xl bg-[#1a1a1a] outline-none text-white '
                                placeholder='What do you want to play ?' />

                            <span className='absolute left-4 top-5 mx-auto'>
                                <FaSearch color='white' />
                            </span>
                        </div>
                    </form>
                </div>
            </div >

            <div className='bg-[#1a1a1a] min-h-[85vh] p-8 h-full text-white rounded-md'>
                <h1 className='text-2xl font-bold'>Browse all </h1>
                <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 z-10 '>
                    {
                        browse.map((i, index) => {
                            const { title, image_url } = i;

                            return (
                                <div key={index} className="relative">
                                    <img src={image_url} alt="" height={200} width={200} className='rounded-lg ' />
                                    <h1 className='absolute top-2 left-2 font-bold text-lg md:text-2xl'>{title}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </AppLayout >
    )
}

export default Search
