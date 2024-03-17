import { useEffect, FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Lottie from 'react-lottie';
import animationdata from "../../../../public/assets/lottiefiles/chat.json"
import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Bars } from "react-loading-icons"
import image from "../../../../public/assets/imgs/smartphone.png"

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        birthday: '',
        gender: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [wait, setWait] = useState(false)

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setWait(true);

        post(route('register'));
        setTimeout(() => {
            setWait(false);
        }, 3000);
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    return (
        <GuestLayout>
            <Head title="Register" />
            <main className="md:flex flex-start m-0 min-h-screen  md:items-center w-full mt-6">
                {/* Style the container element that holds the Lottie component */}
                <div className="md:w-1/2 P-6 hidden md:flex ml-0  m-4" >
                    {/* Render the Lottie component */}
                    {/* <Lottie
                        options={defaultOptions}
                    /> */}
                    <img src={image} alt="" width={400} />
                </div>







                <form onSubmit={submit} className="md:w-1/2 m-4 ">
                    <div className="p-6 shadow-2xl m-6">

                        <div className="text-4xl  font-primary text-center bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold mt-6"><span className="">Register</span></div>
                        <div className="flex flex-col">
                            <TextField value={data.first_name} onChange={e => setData("first_name", e.target.value)} id="standard-basic" name='first_name' label="First Name" variant="standard" />
                            <InputError message={errors.first_name} className="mt-2" />

                        </div>
                        <div className="flex flex-col">
                            <TextField onChange={e => setData("last_name", e.target.value)} value={data.last_name} id="standard-basic" name='last_name' label="Last Name" variant="standard" />
                            <InputError message={errors.last_name} className="mt-2" />

                        </div>
                        <div className="flex flex-col">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    value={data.gender}
                                    onChange={e => setData("gender", e.target.value)}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />

                                </RadioGroup>
                            </FormControl>
                            <InputError message={errors.gender} className="mt-2" />

                        </div>
                        <div className="flex flex-col">
                            <TextField
                                value={data.birthday}
                                onChange={(e) => setData("birthday", e.target.value)}
                                id="standard-basic"
                                label="Birthday"
                                variant="standard"
                                type="date" // Add this line to specify the input type as date
                            />
                            <InputError message={errors.birthday} className="mt-2" />

                        </div>
                        <div className="flex flex-col">
                            <TextField onChange={e => setData("email", e.target.value)} id="standard-basic" name='email' value={data.email} label="Email" variant="standard" />
                            <InputError message={errors.email} className="mt-2" />

                        </div>
                        <div className="flex flex-col">
                            <TextField onChange={e => setData("password", e.target.value)} id="standard-basic" name='password' value={data.password} type="password" label="Password" variant="standard" />
                            <InputError message={errors.password} className="mt-2" />

                        </div>

                        <div className="flex flex-col">
                            <TextField id="standard-basic" type="password" onChange={e => setData("password_confirmation", e.target.value)} value={data.password_confirmation} name='password_confirmation' label="Confirm Password" variant="standard" />
                            <InputError message={errors.password_confirmation} className="mt-2" />

                        </div>
                        <div className="flex flex-col mt-4">

                            <Button style={{ height: "25px" }} type='submit' variant="contained" color="success">
                                {wait ? <Bars width={15} height={29} /> : "Register"}
                            </Button>
                            <Link href={"/login"}>I already have an account <u>Log in</u></Link>
                        </div>

                    </div>
                </form>
            </main>
        </GuestLayout >
    );
}
