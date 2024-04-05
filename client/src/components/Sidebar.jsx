import React from 'react'
import { Link } from 'react-router-dom'
import { MdHome } from "react-icons/md";


const Sidebar = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='px-8 py-4 flex items-center gap-4'>
                <MdHome size={30} />
                <Link><h1 className="text-xl font-bold">Home</h1></Link>
            </div>

        </div>
    )
}

export default Sidebar
