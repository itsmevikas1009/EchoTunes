import React from 'react'
import { Link } from 'react-router-dom'
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";



const Sidebar = () => {
    return (
        <div className=' p-3'>
            <div className='px-8 py-8  pl-16 flex flex-col gap-6 bg-[#1a1a1a] rounded-lg '>
                <Link to="/" className='flex items-center gap-6'>
                    <MdHome size={30} />
                    <h1 className="text-xl font-bold">Home</h1>
                </Link>
                <Link to="/search" className='flex items-center gap-6'>
                    <FaSearch size={24} />
                    <h1 className="text-xl font-semibold">Search</h1>
                </Link>
            </div>

        </div>
    )
}

export default Sidebar
