import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function SuggestItem({ user }: any) {


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
            toast.success("follow request was sent")
        }
        toast.error("follow request failed")
    }

    return (
        <div className='flex items-center justify-between '>
            <Link href={`account/${user.id}/show`} key={user.id} className='text-xs my-2  font-bold'>{<img src={image} className='w-8 h-8 rounded-full object-cover inline-block mx-2 text-sky-600' />}{user.first_name.toLocaleUpperCase()} {user.last_name.toLocaleUpperCase()}</Link >
            <button
                onClick={following}
                className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "  >Fllow me</button>
            {/* 
            <button
                onClick={following}
                className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "  >request sent</button> */}


        </div>
    )
}
