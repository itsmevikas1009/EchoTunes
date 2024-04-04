import React from 'react'
import Logo from "../assest/spotify-logo.png"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='absolute w-full  py-2'>
            <div className='w-11/12 mx-auto flex items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <img src={Logo} alt="" className='h-[3rem]' />
                    <h1 className='text-2xl font-bold'>Spotify</h1>
                </div>

                <div className='flex gap-6 text-lg font-semibold'>
                   <button>SignUp</button>
                   <button>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
