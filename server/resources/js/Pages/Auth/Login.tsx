import { useEffect, FormEventHandler, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button, TextField } from '@mui/material';
import Lottie from 'react-lottie';
import animationdata from "../../../../public/assets/lottiefiles/chat.json";
import Bars from 'react-loading-icons/dist/esm/components/bars';

import image from "../../../../public/assets/imgs/smatphone2.png"

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [wait, setWait] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };


    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setWait(true);
        post(route('login'));
        setTimeout(() => {
            setWait(false);
        }, 3000);

    };

    return (
        <GuestLayout>
            <Head title="Log in" />



            <main className="md:flex flex-start md:items-center  min-h-screen  ">


                <form className="md:w-1/2 m-4 " onSubmit={submit}>

                    <div className="dark:text-white p-6 shadow-2xl m-6">
                        <div className="text-4xl  font-primary text-center bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold mt-6">
                            <span className="">Login</span>
                        </div>
                        <div className="flex flex-col">
                            <TextField id="standard-basic"
                                value={data.email}
                                onChange={e => setData("email", e.target.value)}
                                label="Email"
                                variant="standard" />
                            <InputError message={errors.email} className="mt-2" />

                        </div>
                        <div className="flex flex-col">
                            <TextField
                                id="standard-basic"
                                type="password"
                                label="Password"
                                variant="standard"
                                onChange={(e) => setData('password', e.target.value)}
                                value={data.password}
                            />{" "}
                            <InputError message={errors.password} className="mt-2" />

                        </div>

                        <div className="flex flex-col mt-4">
                            <Button
                                style={{ height: "25px" }}
                                variant="contained"
                                color="success"
                                type='submit'
                            >
                                {wait ? <Bars width={15} height={29} /> : "Login"}
                            </Button>{" "}

                        </div>
                        <div className="flex flex-col  m-2 mt-4">
                            <Link
                                href={route("register")}
                            >
                                I dont have an account <u>register</u>
                            </Link>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                >
                                    Forgot your password?
                                </Link>
                            )}

                        </div>
                    </div>
                </form>
                <div className="md:w-1/2 hidden md:flex ml-0  mr-0">
                    {/* Render the Lottie component */}
                    {/* <Lottie
                        options={defaultOptions}
                    /> */}
                    <img src={image} alt="" width={650} />
                </div>
            </main>





            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}


        </GuestLayout>
    );
}
