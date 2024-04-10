import { WifiIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from "framer-motion"
export default function UserItem({ user, isDarkMode, status, selectedUserId, setSelectedUserId }: any) {
    const [image, setImage] = useState("")
    useEffect(() => {
        const getPict = async () => {
            const response = await axios.get(`/storage/picture/${user.picture}`, {
                responseType: 'blob',
            })
            if (response.status == 200) {

                const blobUrl = URL.createObjectURL(response.data);
                setImage(blobUrl)
            }

        }
        getPict();

    }, [])
    const [visible, setVisible] = useState(false)



    return (
        <button
            className={` flex items-center   justify-between  cursor-pointer m-2 `}

            onClick={e => {
                setSelectedUserId(user.id)
            }}
        >
            <motion.img
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="rounded-full object-cover h-10 w-10" src={image} />
            {visible && <motion.div
                variants={{
                    hidden: {
                        x: 50,
                        opacity: 0
                    },
                    show: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.5
                        }
                    }
                }}
                initial="hidden"
                animate={visible ? "show" : "hidden"}



                className={`leading-snug text-xs ms-12 w-full  flex items-start fixed z-50    ${isDarkMode ? "text-white" : "font-bold"}  `}><span>{user.first_name.toUpperCase() + " " + user.last_name.toUpperCase()}</span>
            </motion.div>}
            <div className="ml-2 flex flex-col justify-start  items-start md:block hidden">
                <div className={`leading-snug text-xs   ${isDarkMode ? "text-white" : "font-bold"}  `}><span>{user.first_name.toUpperCase() + " " + user.last_name.toUpperCase()}</span></div>
                <div className="leading-snug text-xs dark:text-gray-400 ">{status == "Online" ? <span className='flex items-center text-green-600' ><WifiIcon className='w-3 h-3' /> {status}</span> : status}</div>
            </div>
        </button>

    )
}
