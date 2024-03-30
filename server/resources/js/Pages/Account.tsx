import Authenticated from '@/Layouts/AuthenticatedLayout'
import React, { useEffect, useState } from 'react'
import { Head } from "@inertiajs/react"
import axios from 'axios';

export default function Account({ auth, user }) {
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState("")
    const [User, setUser] = useState(user.data)
    const [followStatus, setFollowStatus] = useState(User.status)
    const [Following, setFollowing] = useState(User.following)
    const [Followers, setFollowers] = useState(User.followers)

    useEffect(() => {
        const getPict = async () => {
            const response = await axios.get(`/storage/picture/${User.picture}`, {
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
    const following = async () => {
        const response = await axios.post("/follow/store", { user_id: User.id })
        if (response.data.status == "success") {
            setFollowStatus("followed")
            setFollowers(Followers + 1)
        }
    }
    const Unfollowe = async () => {
        const response = await axios.delete(`/follow/${User.id}/delete`)
        if (response.data.status == "success") {
            setFollowStatus("")
            setFollowers(Followers - 1)
        }
    }
    return (
        <Authenticated user={User} header={<></>}>
            <Head title={`${User.first_name} ${User.last_name}`} />

            <div className="dark:!bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative  flex h-full w-full  flex-col items-center bg-white bg-cover bg-clip-border p-[16px]  dark:shadow-none">
                <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover" style={{ backgroundImage: 'url("https://i.ibb.co/FWggPq1/banner.png")' }}>
                    <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                        <img className="h-full w-full rounded-full object-cover" src={image} alt="" />
                    </div>
                </div>
                <div className="mt-16 flex flex-col items-center">
                    <h4 className="text-black text-xl font-bold">{User.first_name} {User.last_name}</h4>
                    <p className="text-black text-base font-normal">Product Manager</p>
                </div>
                <div className="mt-2 mb-3 flex gap-4 md:!gap-14">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-orange-800 text-md font-bold">17</h3>
                        <p className="text-gray-800 text-sm font-normal">Posts</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-orange-800 text-md font-bold">{Followers}</h3>
                        <p className="text-gray-800 text-sm font-normal">Followers</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-orange-800 text-md font-bold">{Following}</h3>
                        <p className="text-gray-800 text-sm font-normal">Following</p>
                    </div>
                </div>
                {/* {
                    auth.User.id != User.id &&

                    < div className="mt-2 mb-3 flex gap-4 md:!gap-14">
                        <button
                            className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center " >Fllow me</button>
                        <button
                            className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center " >Message</button>

                    </div>
                } */}
                <div className='space-x-6'>

                    {auth.user.id != User.id && (
                        followStatus == "followed" ? <button
                            onClick={Unfollowe}
                            className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "  >Fllowing</button>
                            : <button
                                onClick={following}
                                className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "  >Fllow</button>
                    )


                    }
                    {auth.user.id != User.id &&

                        < button
                            className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "   >Message</button>
                    }

                </div>

            </div>        </Authenticated >

    )
}
