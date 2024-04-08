import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { VideoCameraIcon, UserIcon, PaperAirplaneIcon, PresentationChartBarIcon, UserGroupIcon, ChatBubbleBottomCenterTextIcon, PencilSquareIcon, ArrowUpTrayIcon, ArrowUpOnSquareIcon, PaperClipIcon } from '@heroicons/react/24/solid';

import { useEffect, useState } from 'react';
import axios from "axios"
import Post from '../Components/Post'
import ContentLoader from "react-content-loader";
import SuggestItem from '@/Components/SuggestItem';
import SharePost from '@/Components/SharePost';
export default function Dashboard({ auth, suggests }: PageProps) {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [pers, setPers] = useState(0)
    const [suggestions, setSuggestions] = useState(suggests.data)



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
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("light_mode") == "dark" ?? false);

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






    const items = [
        {
            key: 1,
            title: "profile",
            path: `user/${auth.user.id}`,
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
            path: "/chat",
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
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
        >
            <Head title="Dashboard" />

            <div className="mt-0 relative flex p-1">
                <div className="hidden mt-20 min-h-screen  lg:block bg-inherit m-0  w-1/4 me-6  sm:rounded-lg">
                    <div className='fixed flex flex-col p-2 overflow-hidden '>
                        {items.map((item) => {
                            return <Link href={item.path} key={item.key} className={`text-sm m-2 ${isDarkMode ? "text-white" : "text-black"}  font-bold`}>{<item.icon className='w-6 h-6 inline-block mx-2 text-sky-600' />}{item.title.toLocaleUpperCase()}</Link >

                        })}
                    </div>

                </div>
                <div className="  p-2  flex flex-col items-start min-h-screen md:w-2/3 lg:w-3/6   overflow-hidden sm:rounded-lg ">
                    <h1 className='p-2 mb-2 mt-14 font-bold text-sky-800 text-xl'>Bonjour {auth.user.gender == "male" ? "Mr" : "Mss"} {auth.user.first_name} {auth.user.last_name}</h1 >

                    <SharePost isDarkMode={isDarkMode} user={auth.user!} posts={posts} setPosts={setPosts} />


                    {posts && posts.map(item => <Post isDarkMode={isDarkMode} commentsCount={item.commentsCount} auth={auth} likes={item.likes} dislikes={item.dislikes} reaction={item.reaction} title={item.title} user_id={item.user_id} username={item.user_name} date={item.date} post_id={item.id}
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
                    className=" md:block   hidden bg-sk-600 p-4 md:w-1/3  lg:w-1/4 text-center bg-inherit fixed right-0  top-14 min-h-screen   overflow-hidden  sm:rounded-lg">
                    <fieldset className={`border rounded-xl p-4 items-center w-full  border-2 ${isDarkMode ? "bg-b" : "bg-white"}  `}>
                        <legend><UserGroupIcon className='w-10 text-sky-600 inline-block ' /> <span className='font-bold'>Suggest Friends</span></legend>
                        {suggestions.map((elem: any) => <SuggestItem isDarkMode={isDarkMode} user={elem} />)}

                    </fieldset>

                </div>
            </div >

        </AuthenticatedLayout >
    );
}
