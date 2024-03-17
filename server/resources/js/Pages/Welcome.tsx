import {
    Link, Head
} from '@inertiajs/react';
import { PageProps } from '@/types';
import animationdata from "../../../public/assets/lottiefiles/land.json"
import { Button } from "@mui/material"
import Lottie from 'react-lottie';
export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const user = auth.user
    return (
        <>
            < Head title='Welcome to Home page' />



            <main className="md:flex min-h-screen flex-start m-0 md:items-center  w-full mt-6">
                {/* Style the container element that holds the Lottie component */}
                <div className="md:w-1/2 ml-0  m-4" >
                    {/* Render the Lottie component */}
                    {/* <Lottie
                        options={defaultOptions}
                    /> */}
                </div>
                <div className="md:w-1/2 m-4">
                    <div className="text-5xl  font-primary text-center bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold mt-6"><span className="">Share</span> & Chat</div>
                    <p className="text-2xl mt-6 mx-4 tracking-wide font-primary leading-loose">
                        Hello welcom to Chat Plateform Here You Can Share Your Idia, day, Experience, Fun ... .<br />with Your Friends
                        <span style={{ marginLeft: '10px' }}>
                            <Link href={"/register"}>
                                <Button variant="contained" color="secondary">
                                    {user ? "Dashboard" : "Join As"}
                                </Button>
                            </Link></span>
                    </p>
                </div>
            </main >


        </>
    );
}
