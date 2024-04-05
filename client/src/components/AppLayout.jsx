import React from 'react'
import Navbar from "./Navbar"
import Sidebar from './Sidebar'

const AppLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="flex h-screen pt-20">
                <div className='bg-gray-200 w-[25%]'>
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
