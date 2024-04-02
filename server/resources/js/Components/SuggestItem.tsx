import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function SuggestItem({ user }: any) {
    const [followStatus, setFollowStatus] = useState(user.status)


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
        <div className="p-3 flex items-center  justify-between  cursor-pointer ">
            <Link href="" className="flex items-center">
                <img className="rounded-full object-cover h-10 w-10" src={image} />
                <div className="ml-2 flex flex-col items-start">
                    <div className="leading-snug text-sm dark:text-white font-bold">{user.first_name} {user.last_name}</div>
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
        </div>
    )
}
