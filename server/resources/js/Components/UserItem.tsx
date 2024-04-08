import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from "framer-motion"
export default function UserItem({ user, isDarkMode, selectedUserId, setSelectedUserId }: any) {
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


    return (
        <button
            className={` flex items-center   justify-between  cursor-pointer m-2 `}

            onClick={e => {
                setSelectedUserId(user.id)
                console.log(selectedUserId)
            }}
        >
            <img className="rounded-full object-cover h-10 w-10" src={image} />
            <div className="ml-2 flex flex-col items-start sm:block hidden">
                <div className={`leading-snug text-xs flex items-start  ${isDarkMode ? "text-white" : "font-bold"}  `}><span>{user.first_name.toUpperCase() + " " + user.last_name.toUpperCase()}</span></div>
                <div className="leading-snug text-xs dark:text-gray-400 ">Web Developer</div>
            </div>
        </button>

    )
}
