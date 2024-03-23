import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { VideoCameraIcon, UserIcon, PaperAirplaneIcon, PresentationChartBarIcon, UserGroupIcon, ChatBubbleBottomCenterTextIcon, PencilSquareIcon, ArrowUpTrayIcon, ArrowUpOnSquareIcon, PaperClipIcon } from '@heroicons/react/24/solid';

import { useEffect, useState } from 'react';
import axios from "axios"
import Post from '../Components/Post'
import Skelton, { SkeletonTheme } from "react-loading-skeleton"
import Skeleton from "react-loading-skeleton";
import ContentLoader from "react-content-loader";
import toast from 'react-hot-toast';
import { object } from 'prop-types';
export default function Dashboard({ auth }: PageProps) {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [pers, setPers] = useState(0)
    const [postFile, setPostFile] = useState(null)
    const [title, setTitle] = useState("")
    const [user_id, setUserId] = useState(auth.user.id)


    const getPosts = async () => {
        const response = await axios.get(`posts/index?page=${page}`)
        if (response.data.status == "success") {
            if (posts.length < response.data.length) {
                setPosts([...posts, ...response.data.posts])
                setPers(0)
                setPage(page + 1)
            }

        }
    }
    useEffect(() => {
        getPosts()
    }, []);

    window.addEventListener("scroll", (item) => {

        var h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        let pers = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        if (pers >= 90) {
            setPers(pers)
        }
    })
    useEffect(() => {
        if (pers > 95)
            getPosts()
    }, [pers]);
    const submit = async (e) => {
        e.preventDefault();
        const resp = await axios.post("post/store", { postFile, title, user_id }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        );
        if (resp.data.status == "success") {
            setTitle("")
            toast.success(resp.data.message);
            setPosts([resp.data.post, ...posts])
        }
    }





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
                <div className="hidden  min-h-screen  lg:block bg-inherit m-0  w-1/4    sm:rounded-lg">
                    <div className='fixed flex flex-col p-2 overflow-hidden '>
                        {items.map((item) => {
                            return <Link href={item.path} key={item.key} className='text-sm m-2 font-bold'>{<item.icon className='w-6 h-6 inline-block mx-2 text-sky-600' />}{item.title.toLocaleUpperCase()}</Link >

                        })}
                    </div>

                </div>
                <div className="  p-2  flex flex-col items-start min-h-screen lg:w-1/2 sm:w-3/4   overflow-hidden sm:rounded-lg ">
                    <h1 className='p-2 mb-2 font-bold text-sky-800 text-xl'>Bonjour {auth.user.gender == "male" ? "Mr" : "Mss"} {auth.user.first_name} {auth.user.last_name}</h1 >

                    <div className=' w-full px-4 flex shadow-2xl flex-col items-center rounded-xl bg-white lg:w-3/4'>
                        <textarea name="" id="mytextarea" value={title} onChange={e => setTitle(e.target.value)} placeholder={`What's on your mind, ${auth.user.first_name.toUpperCase()}?`} className='w-full mt-2 rounded-xl bg-gray-100  text-md border-none  resize-none' rows="2"></textarea>
                        <form onSubmit={submit} encType="multipart/form-data" className="w-full space-y-2">
                            <input type="file" onChange={e => setPostFile(e.target.files[0]!)} name="Postfile" className='hidden' id="post-file" />
                            <div className='flex w-full  items-center justify-between'>
                                <button type='button' onClick={e => {
                                    document.getElementById("post-file").click()
                                }} className='text-md  font-bold  text-sky-600 p-4'>File <PaperClipIcon className='w-6 h-6 inline-block mx-1 ' />
                                </button >
                                <button type={"submit"} className='text-md  font-bold  text-sky-600 p-4'>Send<PaperAirplaneIcon className='w-6 h-6 inline-block mx-1 text-sky-600' /></button>
                            </div>
                        </form>

                    </div>
                    <div>


                    </div>

                    {posts && posts.map(item => <Post likes={item.likes} dislikes={item.dislikes} reaction={item.reaction} title={item.title} user_id={auth.user.id} username={item.user_name} date={item.date} post_id={item.id}
                        filename={item.user_picture} files={item.files} />)}
                    <ContentLoader
                        speed={4}
                        className={" w-3/4"}
                        viewBox="0 0 400 160"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="48" y="8" rx="18" ry="10" width="88" height="15" />
                        <rect x="48" y="26" rx="3" ry="3" width="52" height="10" />
                        <rect x="0" y="56" rx="3" ry="3" width="410" height="15" />
                        <rect x="0" y="72" rx="3" ry="3" width="380" height="15" />
                        <rect x="0" y="88" rx="3" ry="3" width="178" height="15" />
                        <circle cx="20" cy="20" r="20" />
                    </ContentLoader>
                    <ContentLoader
                        speed={2}
                        className={" w-3/4"}
                        viewBox="0 0 400 160"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="48" y="8" rx="18" ry="10" width="88" height="30" />
                        <rect x="48" y="26" rx="3" ry="3" width="52" height="10" />
                        <rect x="0" y="56" rx="3" ry="3" width="410" height="15" />
                        <rect x="0" y="72" rx="3" ry="3" width="380" height="15" />
                        <rect x="0" y="88" rx="3" ry="3" width="178" height="15" />
                    </ContentLoader>

                </div>
                <div
                    className=" md:block  hidden bg-sk-600 p-4 md:w-1/6  text-center bg-inherit fixed right-0  min-h-screen   overflow-hidden  sm:rounded-lg">
                    You're logged in!

                </div>
            </div >

        </AuthenticatedLayout >
    );
}
