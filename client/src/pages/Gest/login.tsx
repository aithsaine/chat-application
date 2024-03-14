import React, { useState } from 'react'
import animationdata from "../../assets/lottiefiles/land.json"
import Lottie from 'react-lottie';
import { Button, TextField } from '@mui/material';
import Bars from 'react-loading-icons/dist/esm/components/bars';
import { Link } from 'react-router-dom';
export default function Login() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const [wait, setWait] = useState(false);

    return (
        <main className="md:flex flex-start md:items-center  min-h-screen  ">
            {/* Style the container element that holds the Lottie component */}
            <div className="md:w-1/2 hidden md:flex ml-0  mr-4" >
                {/* Render the Lottie component */}
                <Lottie
                    options={defaultOptions}
                />
            </div>
            <div className="md:w-1/2 m-4 ">
                <div className="p-6 shadow-2xl m-6">


                    <div className="text-4xl  font-primary text-center bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold mt-6"><span className="">Login</span></div>
                    <div className="flex flex-col">
                        <TextField id="standard-basic" label="Email" variant="standard" />                    </div>
                    <div className="flex flex-col">
                        <TextField id="standard-basic" type="password" label="Password" variant="standard" />                    </div>


                    <div className="flex flex-col mt-4">

                        <Button style={{ height: "25px" }} variant="contained" color="success">
                            {wait ? <Bars width={15} height={29} /> : "Login"}
                        </Button>                        <Link className="font-primary  bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold" to={"/register"}>I dont have an account!!</Link>
                    </div>

                </div>
            </div>
        </main >

    );
}