import Authenticated from '@/Layouts/AuthenticatedLayout'
import React, { useEffect, useState } from 'react'
import { Head } from "@inertiajs/react"
import axios from 'axios';
import Nav from '@/Components/Nav';

export default function AccountLayout({ auth, user, isDarkMode, setIsDarkMode, children }) {
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState("")
    const [User, setUser] = useState(user)
    const [followStatus, setFollowStatus] = useState(User.FollowStatus)
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
            }

        }
        getPict();

        if (!localStorage.getItem("light_mode"))
            window.localStorage.setItem("light_mode", "light")


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
        <main className={`${isDarkMode ? "bg-black text-white" : ""} min-h-screen`}>
            <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} filename={auth.user.picture} />

            {/* <div className="relative mt-20 flex h-32 w-full justify-center rounded-xl bg-cover" style={{ backgroundImage: 'url("https://i.ibb.co/FWggPq1/banner.png")' }}>
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
                    <h3 className="text-orange-800 text-md font-bold">{User.posts}</h3>
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

            </div> */}
            {/* <div className="p-16 dark:bg-black dark:text-white">
                <div className="  shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">      <div>
                            <p className="font-bold text-gray-700 text-xl">{Followers}</p>
                            <p className="text-gray-400">Follwers</p>
                        </div>      <div>
                                <p className="font-bold text-gray-700 text-xl">{User.posts}</p>
                                <p className="text-gray-400">Posts</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{Following}</p>
                                <p className="text-gray-400">Following</p>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="w-20 h-20 bg-indigo-100 mx-auto  rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <img src={image} className='w-full h-full rounded-full object-cover' alt="" />

                            </div>
                            <h1 className='text-2xl'>{user.first_name.toUpperCase()} {user.last_name.toUpperCase()}</h1>
                            p
                        </div>
                        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            {auth.user.id != User.id && (
                                followStatus == "followed" ? <button
                                    onClick={Unfollowe}
                                    className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"    >Fllowing</button>
                                    : <button
                                        onClick={following}
                                        className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"    >Fllow</button>
                            )


                            }
                            {auth.user.id != User.id &&

                                < button
                                    className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"  >Message</button>
                            }
                        </div>  </div>

                </div>
            </div> */}

            <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} shadow-md rounded-lg py-16 overflow-hidden`}>
                {/* Header */}
                <div className=" px-4 py-2 text-center">
                    {/* User Avatar */}
                    <img className="w-32 h-32 rounded-full object-cover mx-auto mb-4" src={image} alt="User Avatar" />
                    {/* User Name */}
                    <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
                    {/* Job Title */}
                    <p className="text-sm ">Software Engineer</p>
                </div>
                {/* Body */}
                <div className="p-4 text-center">
                    {/* Description */}
                    <p className=" mb-4">Passionate about building innovative software solutions.</p>
                    {/* Follower Count */}
                    <div className="flex justify-center mb-4">
                        <div className="flex flex-col  justify-center mr-6">
                            <span className="">Followers</span>
                            <span className=" font-semibold">{Followers}</span>
                        </div>
                        <div className="mr-6 flex flex-col  justify-center">
                            <span className="">Following</span>
                            <span className=" font-semibold">{Following}</span>
                        </div>
                        <div className='flex flex-col  justify-center'>
                            <span className="">Posts</span>
                            <span className="font-semibold">{User.posts}</span>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex space-x-4 justify-center">
                        {/* Follow Button */}
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
                </div>
            </div>
            <section className=' flex w-full'>
                <aside className='sticky top-0 w-1/4 mx-2  border-4 rounded-xl'>
                </aside>
                <div className='w-2/3 space-y-10 min-h-screen ms-6'>
                    {children}
                </div>
            </section>
        </main>

    )
}
