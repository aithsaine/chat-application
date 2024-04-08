import UserItem from '@/Components/UserItem';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import InputEmoji from "react-input-emoji";


export default function chat({ user, friends }) {
    const [selectedUserId, setSelectedUserId] = useState("")
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("light_mode") == "dark" ?? false);
    const [friend, setFriends] = useState(friends.data)
    const [newMsg, setNewMsg] = useState("")
    return (
        <Authenticated
            user={user.data}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode} >
            <Head title="let's Chat" />
            <section className='p-4 flex space-x-4  h-[575px]  '>
                <div className={`sm:w-1/4  rounded-xl overflow-y-auto ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}`}>
                    {friend.map((item: any) => {
                        return <div className={`p-1 ${selectedUserId == item.id ? "bg-sky-100" : ""}`}>
                            <UserItem selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} user={item} isDarkMode={isDarkMode} />
                            <hr className={`opacity-20 ${isDarkMode ? 'text-white' : "divide-neutral-950"}`} />
                        </div>
                    })}
                </div>
                <div className={`sm:w-3/4 w-full relative rounded-xl overflow-y-auto ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}`}>
                    <div className="flex   absolute bottom-0 p-6 w-full " >
                        <InputEmoji
                            inputClass={`${isDarkMode ? "bg-black rounded-2xl text-gray-100" : ""}`}
                            cleanOnEnter
                            value={newMsg}
                            borderColor="black"
                            onChange={setNewMsg}
                            placeholder="Type a Comment"
                        />
                        <PaperAirplaneIcon className="w-6 cursor-pointer " title="Save comment" />
                    </div >
                </div>
            </section>

        </Authenticated>
    )
}
