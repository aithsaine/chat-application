import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { VideoCameraIcon, UserIcon, PaperAirplaneIcon, PresentationChartBarIcon, UserGroupIcon, ChatBubbleBottomCenterTextIcon, PencilSquareIcon, ArrowUpTrayIcon, ArrowUpOnSquareIcon, PaperClipIcon } from '@heroicons/react/24/solid';
import { Button } from '@mui/material';
import { useState } from 'react';
export default function Dashboard({ auth }: PageProps) {

    const { data, setData, post } = useForm({
        file: null,
        description: ""
    })


    const items = [
        {
            key: 1,
            title: "profile",
            path: "/",
            icon: UserIcon

        },
        {
            key: 2,
            title: "Videos",
            path: "/",
            icon: VideoCameraIcon
        },
        {
            key: 3,
            title: "Analytics",
            path: "/",
            icon: PresentationChartBarIcon
        }
        ,
        {
            key: 4,
            title: "Friends",
            path: "/",
            icon: UserGroupIcon
        },
        {
            key: 5,
            title: "Chat",
            path: "/",
            icon: ChatBubbleBottomCenterTextIcon
        },
        {
            key: 6,
            title: "Edit Info",
            path: "/profile",
            icon: PencilSquareIcon
        }

    ]
    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Dashboard" />

            <div className="mt-0 relative flex p-1">
                <div style={{ maxWidth: "15%" }} className="hidden    lg:block bg-white m-0  w-1/4    sm:rounded-lg">
                    <div className='fixed flex flex-col p-2 overflow-hidden '>
                        {items.map((item) => {
                            return <Link href={item.path} key={item.key} className='text-md m-2 font-bold'>{<item.icon className='w-6 h-6 inline-block mx-2 text-sky-600' />}{item.title.toLocaleUpperCase()}</Link >

                        })}
                    </div>

                </div>
                <form className="  p-4  flex flex-col items-start min-h-screen w-full lg:w-3/4  overflow-hidden sm:rounded-lg ">
                    <h1 className='p-2 mb-6 font-bold text-sky-800 text-xl'>Bonjour {auth.user.gender == "male" ? "Mr" : "Mss"} {auth.user.first_name} {auth.user.last_name}</h1 >

                    <div className=' w-full flex shadow-2xl flex-col items-center rounded-full bg-white sm:w-3/4'>


                        <textarea name="" id="mytextarea" placeholder={`What's on your mind, ${auth.user.first_name.toUpperCase()}?`} className='md:mx-4 mt-4 rounded-full bg-gray-200  text-md w-10/12 border-none  resize-none' id="" rows="1"></textarea>
                        <div className=' flex-col flex  items-start'>
                            <input type="file" onChange={e => setData("file", e.target.files[0]!)} name="photo" className='hidden' id="post-file" />
                            <div className='flex w-full items-center justify-around'>

                                <button type='button' onClick={e => {
                                    document.getElementById("post-file").click()
                                    console.log(data.file)
                                }} className='text-md  font-bold  text-sky-600 p-4'>File <PaperClipIcon className='w-6 h-6 inline-block mx-1 ' />
                                </button >
                                <Link href='/' className='text-md  font-bold  text-sky-600 p-4'>Send<PaperAirplaneIcon className='w-6 h-6 inline-block mx-1 text-sky-600' /></Link>
                            </div>
                        </div>
                    </div>









                </form>
                <div className=" sm:block bg-sk-600 p-4 md:w-1/4 text-center fixed right-0  min-h-screen hidden   overflow-hidden shadow-sm sm:rounded-lg">
                    You're logged in!

                </div>
            </div >

        </AuthenticatedLayout >
    );
}
