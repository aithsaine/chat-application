import animationdata from "../../assets/lottiefiles/land.json"
import Button from '@mui/material/Button';
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

export default function Home() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
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
                        <Link to={"/register"}>
                            <Button variant="contained" color="secondary">
                                Join As
                            </Button>
                        </Link></span>
                </p>
            </div>
        </main >

    );
}
