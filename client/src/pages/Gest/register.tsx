import React from "react";
import animationdata from "../../assets/lottiefiles/anim.json";

import toast from "react-hot-toast";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loading-icons";
import Lottie from "react-lottie";
import { api } from "../../tools/axios";
export default function Register() {
    const [first_name, setFirstName] = React.useState<String>("");
    const [last_name, setLastName] = React.useState<String>("");
    const [email, setEmail] = React.useState<String>("");
    const [password, setPassword] = React.useState<String>("");
    const [birthday, setBirthday] = React.useState(new Date().toISOString().substr(0, 10))
    const [gender, setGender] = React.useState<String>("male");
    const [confirmPsd, setConfirmPsd] = React.useState<String>("");
    const [wait, setWait] = React.useState<Boolean>(false);
    const navigate = useNavigate()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const RegisterHandler = async () => {
        try {
            setWait(true);
            const response = await api.post("api/register", {
                first_name,
                last_name,
                password,
                email,
                gender,
                birthday,
                confirmPsd,
            });
            setWait(false);
            toast.success(response.data.message);
            navigate("/login");

        } catch (error: any) {
            setWait(false);
            for (let item in error.response.data)
                toast.error(error.response.data[item][0]);
        }
    };

    return (
        <main className="md:flex flex-start m-0 min-h-screen  md:items-center w-full mt-6">
            {/* Style the container element that holds the Lottie component */}
            <div className="md:w-1/2 hidden md:flex ml-0  m-4">
                {/* Render the Lottie component */}
                <Lottie options={defaultOptions} />
            </div>
            <div className="md:w-1/2 m-4 ">
                <div className="p-6 shadow-2xl m-6">
                    <div className="text-4xl  font-primary text-center bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold mt-6">
                        <span className="">Register</span>
                    </div>
                    <div className="flex flex-col">
                        <TextField
                            onChange={(e) => setFirstName(e.target.value)}
                            id="standard-basic"
                            label="First Name"
                            variant="standard"
                        />{" "}
                    </div>
                    <div className="flex flex-col">
                        <TextField
                            onChange={(e) => setLastName(e.target.value)}
                            id="standard-basic"
                            label="Last Name"
                            variant="standard"
                        />{" "}
                    </div>
                    <div className="flex flex-col">
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                        />{" "}
                    </div>
                    <div className="flex flex-col">
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                            <Select
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Gender"
                            >

                                <MenuItem value={"male"}>male</MenuItem>
                                <MenuItem value={"female"}>female</MenuItem>
                            </Select>
                        </FormControl>

                    </div>
                    <div className="flex flex-col">
                        <TextField
                            onChange={(e) => setBirthday(e.target.value)}
                            id="standard-basic"
                            label="Birthday"
                            variant="standard"
                            defaultValue={new Date().toISOString().substr(0, 10)} // Set default value to today's date
                            type="date" // Add this line to specify the input type as date
                        />
                    </div>
                    <div className="flex flex-col">
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            id="standard-basic"
                            type="password"
                            label="Password"
                            variant="standard"
                        />{" "}
                    </div>

                    <div className="flex flex-col">
                        <TextField
                            id="standard-basic"
                            type="password"
                            onChange={(e) => setConfirmPsd(e.target.value)}
                            label="Confirm Password"
                            variant="standard"
                        />{" "}
                    </div>
                    <div className="flex flex-col mt-4">
                        <Button
                            style={{ height: "25px" }}
                            onClick={RegisterHandler}
                            variant="contained"
                            color="success"
                        >
                            {wait ? <Bars width={15} height={29} /> : "Register"}
                        </Button>
                        <Link to={"/login"}>I already have an account</Link>
                    </div>
                </div>
            </div>
        </main >
    );
}
