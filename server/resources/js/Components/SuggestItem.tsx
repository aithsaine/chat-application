import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from "framer-motion"
export default function SuggestItem({ user, isDarkMode }: any) {
    const [followStatus, setFollowStatus] = useState(user.FollowStatus)


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
    const following = async () => {
        const response = await axios.post("follow/store", { user_id: user.id })
        if (response.data.status == "success") {
            setFollowStatus("followed")
        }
    }
    const Unfollowe = async () => {
        const response = await axios.delete(`follow/${user.id}/delete`)
        if (response.data.status == "success") {
            setFollowStatus("")
        }
    }

    return (
        <motion.div variants={
            { hidden: { opacity: 0 }, show: { opacity: 1 } }

        }
            hidden="hidden"
            animate="show"
            className="py-2 flex items-center  justify-between  cursor-pointer ">
            <Link href={`user/${user.id}`} className="flex items-start">
                <img className="rounded-full object-cover h-10 w-10" src={image} />
                <div className="ml-2 flex flex-col items-start">
                    <div className={`leading-snug text-xs flex items-start flex-col ${isDarkMode ? "text-white" : "font-bold"}  `}><span>{user.first_name.toUpperCase()}</span> <span>{user.last_name.toUpperCase()}</span></div>
                    <div className="leading-snug text-xs dark:text-gray-400 ">Web Developer</div>
                </div>
            </Link>
            {followStatus == "followed" ? <button
                onClick={Unfollowe}
                className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"            >Fllowing</button>
                : <button
                    onClick={following}
                    className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"                >Fllow</button>
            }
        </motion.div>
    )
}
