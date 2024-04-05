import React from 'react'
import Navbar from "./Navbar"
import Sidebar from './Sidebar'

const AppLayout = ({ children }) => {
    return (
        <>
            <Navbar bg={'black'} text={'white'} />
            <div className="flex h-screen pt-16">
                <div className=' w-[25%] bg-black text-white'>
                    <Sidebar />
                </div>
                <div className='w-[75%] overflow-hidden '>
                    {children}
                </div>

            </div>
        </>

    )
}

export default AppLayout
