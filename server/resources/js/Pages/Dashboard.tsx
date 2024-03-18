import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { VideoCameraIcon, UserIcon, PaperAirplaneIcon, PresentationChartBarIcon, UserGroupIcon, ChatBubbleBottomCenterIcon, ChatBubbleBottomCenterTextIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { Button } from '@mui/material';
export default function Dashboard({ auth }: PageProps) {

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
                <div style={{ maxWidth: "15%" }} className="hidden  overflow-scroll  lg:block min-h-screen m-0  w-1/4 bg-white overflow-hidden  sm:rounded-lg">
                    <div className='fixed flex flex-col p-2 overflow-scroll '>
                        {items.map((item) => {
                            return <Link href={item.path} key={item.key} className='text-md m-2 font-bold'>{<item.icon className='w-6 h-6 inline-block mx-2 text-sky-600' />}{item.title.toLocaleUpperCase()}</Link >

                        })}
                    </div>

                </div>
                <form className=" shadow-2xl  flex flex-col items-start min-h-screen w-full lg:w-3/4 bg-white overflow-hidden sm:rounded-lg ">
                    <h1 className='p-2 mb-6 font-bold text-sky-800 text-xl'>Bonjour {auth.user.gender == "male" ? "Mr" : "Mss"} {auth.user.first_name} {auth.user.last_name}</h1 >



                    <textarea name="" id="mytextarea" placeholder='Post any think here' className='md:mr-4 text-xl rounded-xl border w-full border-2 resize-none sm:w-3/4' id="" rows="4"></textarea>

                    <Link href='/' className='text-md m-2 font-bold inline-block text-sky-600'>Send<PaperAirplaneIcon className='w-6 h-6 inline-block mx-1 text-sky-600' /></Link>








                </form>
                <div className=" sm:block bg-sk-600 fixed right-0 p-4 flex min-h-screen hidden shadow-md  w-1/4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    You're logged in!

                </div>
            </div>

        </AuthenticatedLayout >
    );
}
