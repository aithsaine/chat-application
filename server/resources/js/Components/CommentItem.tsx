import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "@inertiajs/react"

export default function CommentItem({ filename, user_name, user_id, date, content }) {

    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        const getPict = async () => {

            const response = await axios.get(`/storage/picture/${filename}`, {
                responseType: 'blob',
            })
            if (response.status == 200) {

                const blobUrl = URL.createObjectURL(response.data);
                setAvatar(blobUrl)
            }

        }
        getPict();

    }, [])
    return (
        <div className="flex items-center mb-4">
            <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
            <div className=''>
                <Link href={`account/${user_id}/show`} className="flex items-center ">
                    <span className="font-semibold text-black text-sm mr-1">{user_name}</span>
                    <span className="text-gray-500 text-sm">{date}</span>
                </Link>
                <p className="text-gray-800 text-sm">{content}</p>
            </div>
        </div>)
}
