import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
                console.log(response.data)
            }

        }
        getPict();

    }, [])

    return (
        <div className='flex items-center justify-between '>
            <Link href={`account/${user.id}/show`} key={user.id} className='text-sm m-2 font-bold'>{<img src={image} className='w-10 h-10 rounded-full object-cover inline-block mx-2 text-sky-600' />}{user.first_name.toLocaleUpperCase()} {user.last_name.toLocaleUpperCase()}</Link >
            <UserPlusIcon className='w-6 h-6 mx-2' />
        </div>
    )
}
