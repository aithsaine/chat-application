import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CommentItem({ filename, user_name, date, content }) {

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
        <div className="flex items-start mb-4">
            <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4 object-cover" />
            <div>
                <div className="flex items-center mb-1">
                    <span className="font-semibold mr-2">{user_name}</span>
                    <span className="text-gray-500 text-sm">{date}</span>
                </div>
                <p className="text-gray-800">{content}</p>
            </div>
        </div>)
}
