
import React from 'react'
import animationdata from "../../assets/lottiefiles/anim.json"
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loading-icons';
import Lottie from 'react-lottie';
export default function Register() {
    const [first_name, setFirstName] = React.useState<String>("");
    const [last_name, setLastName] = React.useState<String>("");
    const [email, setEmail] = React.useState<String>("");
    const [password, setPassword] = React.useState<String>("");
    const [confirmPsd, setConfirmPsd] = React.useState<String>("");
    const [wait, setWait] = React.useState<Boolean>(false);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const RegisterHandler = async () => {
        try {
            setWait(true);
            const response = await axios.post("/api/auth/register", { first_name, last_name, password, email, confirmPsd })
            if (response.data.status == 200) {
                toast.success(response.data.message)
                setWait(false)
                return
            }
            setWait(false)

            return toast.error(response.data.message)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <main className="md:flex flex-start m-0 min-h-screen  md:items-center w-full mt-6">
            {/* Style the container element that holds the Lottie component */}
            <div className="md:w-1/2 hidden md:flex ml-0  m-4" >
                {/* Render the Lottie component */}
                <Lottie
                    options={defaultOptions}
                />
            </div>
            <div className="md:w-1/2 m-4 ">
                <div className="p-6 shadow-2xl m-6">

                    <div className="text-4xl  font-primary text-center bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold mt-6"><span className="">Register</span></div>
                    <div className="flex flex-col">
                        <TextField onChange={e => setFirstName(e.target.value)} id="standard-basic" label="First Name" variant="standard" />                    </div>
                    <div className="flex flex-col">
                        <TextField onChange={e => setLastName(e.target.value)} id="standard-basic" label="Last Name" variant="standard" />                    </div>
                    <div className="flex flex-col">
                        <TextField onChange={e => setEmail(e.target.value)} id="standard-basic" label="Email" variant="standard" />                    </div>
                    <div className="flex flex-col">
                        <TextField onChange={e => setPassword(e.target.value)} id="standard-basic" type="password" label="Password" variant="standard" />                    </div>

                    <div className="flex flex-col">
                        <TextField id="standard-basic" type="password" onChange={e => setConfirmPsd(e.target.value)} label="Confirm Password" variant="standard" />                    </div>
                    <div className="flex flex-col mt-4">

                        <Button style={{ height: "25px" }} onClick={RegisterHandler} variant="contained" color="success">
                            {wait ? <Bars width={15} height={29} /> : "Register"}
                        </Button>
                        <Link to={"/login"}>I already have an account</Link>
                    </div>

                </div>
            </div>
        </main >

    );
}
