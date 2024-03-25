import React, { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@mui/material";

function FileUpload({ auth }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update the image preview
                document.getElementById('previewImage').src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadFile = () => {
        if (selectedFile) {
            // You can perform additional actions here, such as sending the file to the backend
            console.log("Uploading file:", selectedFile.name);
            console.log("File type:", selectedFile.type);
            console.log("File size:", selectedFile.size);
            console.log("File content:", selectedFile);
        } else {
            console.log("No file selected");
        }
    };

    return (
        <Authenticated user={auth.user} header={<></>}>

            <div className='bg-sky-600 min-h-screen flex flex-col items-center'>
                <div onClick={e => document.getElementById("fileInput").click()} className='h-1/2'>
                    <input type={"file"} id={"fileInput"} className={"hidden"} onChange={handleFileChange} />
                    <img id={"previewImage"} className="bg-sky-200 w-64 h-64 rounded-full absolute object-cover"
                        src=""
                        alt="" />
                    <div
                        className="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                        <img className="hidden group-hover:block w-12"
                            src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
                    </div>
                </div>



                <Button variant="contained">Save</Button>
            </div>


        </Authenticated>

    );
}

export default FileUpload;
