import LeftSideBoxChat from '@/Components/LeftSideBoxChat';
import RightSideBoxChat from '@/Components/RightSideBoxChat';
import UserItem from '@/Components/UserItem';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputEmoji from "react-input-emoji";

import { echo } from "../echo"
import { element } from 'prop-types';
import { useLocation } from '@inertiajs/inertia-react';


export default function chat({ auth, msgs, user, friends }) {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("light_mode") == "dark" ?? false);
    const [friend, setFriends] = useState(friends.data)
    const [newMsg, setNewMsg] = useState("")
    const [messages, setMessages] = useState(msgs.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const [selectedUserId, setSelectedUserId] = useState(urlParams.get("userid") ?? null)
    useEffect(() => {
        const markSeen = async () => {
            const resp = await axios.post(`chat/${auth.user.id}/${selectedUserId}/markseen`)
            if (resp.data.success) {
                setFriends(friend.map(elem => {
                    if (elem.id === selectedUserId) {
                        return { ...elem, msgs_not_seen: 0 }
                    }
                    return elem
                }))
            }
        }
        selectedUserId && markSeen()
    }, [selectedUserId])


    // useEffect(() => {
    //     const getMsgs = async () => {
    //         const resp = await axios.get(`chat/messages`);
    //         setMessages(resp.data.messages.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    //         );
    //     }
    //     getMsgs()


    // }, [])
    echo.channel("messageWith." + auth.user.id).listen("SendMessage", function (e) {
        setMessages([...messages, e.message])

        setFriends(friend.map((elem: any) => {
            if (elem.id === e.message.sender_id && elem.id != selectedUserId) {

                return { ...elem, msgs_not_seen: elem.msgs_not_seen + 1 }
            }
            return elem
        }))
        const markSeen = async () => {
            const resp = await axios.post(`chat/${auth.user.id}/${selectedUserId}/markseen`)
        }
        selectedUserId ?? markSeen()

    })
    friend.map((element: any) => {

        echo.channel("UserStatus." + element.id).listen("UpdateUserStatus", function (e: any) {
            setFriends(friend.map((item: any) => {
                if (item.id == e.user.id) {
                    return { ...item, status: e.user.status }
                }
                return item
            }))
        });
    })

    const chatHandler = () => {
        const resp = axios.post("chat", {
            receiver_id: selectedUserId,
            message: newMsg
        }).then(resp => {

            if (resp.status == 200) {
                console.log("resp.data.message")
                setMessages([...messages, resp.data])
                setNewMsg("")
            }
        }).catch(err => console.log(first))
    }
    return (
        <Authenticated
            user={auth.user}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode} >
            <Head title="let's Chat" />
            <section className='p-4 flex space-x-4 fixed w-full   h-[575px]  '>
                <div className={`md:w-1/3  rounded-xl overflow-y-auto ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}`}>
                    {friend.map((item: any) => {
                        return <div className={`p-1 ${selectedUserId == item.id ? "bg-sky-100" : ""}`}>
                            <UserItem msgs_not_seen={item.msgs_not_seen} status={item.status} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} user={item} isDarkMode={isDarkMode} />
                            <hr className={`opacity-20 ${isDarkMode ? 'text-white' : "divide-neutral-950"}`} />
                        </div>
                    })}
                </div>
                {selectedUserId && <div className={`md:w-2/3 w-full relative rounded-xl overflow-y-auto ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}`}>
                    <div className="flex flex-col   absolute bottom-0 p-6 w-full " >
                        {messages && messages.filter(elem => elem.receiver_id == selectedUserId || elem.sender_id == selectedUserId).map(
                            (item: any) => {
                                if (item.receiver_id == selectedUserId) {
                                    return <RightSideBoxChat isDarkMode={isDarkMode} message={item} />
                                }
                                return <LeftSideBoxChat isDarkMode={isDarkMode} message={item} />
                            }
                        )}
                        <div className='flex'>

                            <InputEmoji
                                inputClass={`${isDarkMode ? "bg-black rounded-2xl text-gray-100" : ""}`}
                                cleanOnEnter
                                value={newMsg}
                                borderColor="black"
                                onChange={setNewMsg}
                                placeholder="Type a Comment"
                            />
                            <PaperAirplaneIcon onClick={chatHandler} className="w-6 cursor-pointer " title="send" />
                        </div>
                    </div >
                </div>}
            </section>

        </Authenticated>
    )
}
