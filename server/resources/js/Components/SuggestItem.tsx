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
        <div className='flex items-center justify-between '>
            <Link style={{ fontSize: "0.7rem" }} href={`user/${user.id}`} key={user.id} className=' my-2  font-bold'>{<img src={image} className='w-8 h-8 rounded-full object-cover inline-block  text-sky-600' />}{user.first_name.toLocaleUpperCase()} {user.last_name.toLocaleUpperCase()}</Link >
            {followStatus == "followed" ? <button
                onClick={Unfollowe}
                className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "  >Fllowing</button>
                : <button
                    onClick={following}
                    className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "  >Fllow</button>
            }

        </div>
    )
}
