import React from 'react'
import logo from "../assets/imgs/logo.png"
import { AiOutlineMessage } from "react-icons/ai"
import { IoNotificationsOutline } from "react-icons/io5"
import { VscAccount } from "react-icons/vsc"
export default function Nav() {
    return (
        <nav className=' m-4 rounded  w-full shadow-2xl' style={{ padding: "10px" }}>
            <div className='flex  justify-between  w-full'>
                <div className='flex flex-col font-primary font-bold items-center'>
                    <img alt='logo' src={logo} width={39} height={39} />
                    <span>Chat App</span>
                </div>
                <div className='flex md:me-10 me-4'>

                    <span className='bg-gray-300 p-1 rounded-full cursor-pointer me-2' ><AiOutlineMessage size={35} /></span>
                    <span className='bg-gray-300 p-1 rounded-full cursor-pointer me-2'><IoNotificationsOutline size={35} /></span>
                    <span className='bg-gray-300 p-1 rounded-full cursor-pointer me-2'><VscAccount size={35} /></span>
                </div>
            </div>


        </nav>)
}
