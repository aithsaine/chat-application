import React, { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@mui/material";
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';

function FileUpload({ auth }) {



    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        first_name: auth.user.first_name,
        last_name: auth.user.last_name,
        email: auth.user.email,
        picture: null,
        "_method": "patch"
    });







    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("picture", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update the image preview
                document.getElementById('previewImage').src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadFile = async (e: any) => {
        e.preventDefault();
        post(route('profile.updatePicture',), {
            forceFormData: true,
        })
    };

    const skipUpload = () => {
        // Implement skipping the upload
        console.log("Skipping file upload");
    };

    return (
        <Authenticated user={auth.user} header={<></>}>

            <div className="min-h-screen flex justify-center items-center bg-gray-100">

                <div className=" p-8 rounded-md ">
                    <div className="flex justify-center mb-8">
                        <div className="relative rounded-full w-32 h-32">
                            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                            <img id="previewImage" className="w-full h-full rounded-full object-cover" src="" alt="" />
                            <div onClick={() => document.getElementById("fileInput").click()} className="absolute inset-0 flex justify-center rounded-full items-center border border-black bg-opacity-50 hover:bg-opacity-60 cursor-pointer">
                                <img className="w-10 opacity-30" src="https://www.svgrepo.com/show/33565/upload.svg" alt="Upload" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around mt-10 ">
                        <Button variant="contained" color="primary" className='' onClick={uploadFile}>Continue</Button>
                        <Link href='/feed'> <Button variant="outlined" color="primary" onClick={skipUpload} className="ml-6">Skip</Button></Link>
                    </div>
                </div>
            </div>

        </Authenticated>
    );
}

export default FileUpload;