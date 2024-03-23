import React, { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";

function FileUpload({auth}) {
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



    return (
        <Authenticated user={auth.user} header={<></>}>

        <div className={"flex items-center min-h-screen justify-center"}>
            <input type="file" onChange={handleFileChange} />
            <img id="previewImage " src="" alt="Preview" className={"object-cover bg-gray-200 w-60 h-60 rounded-full"}  />
        </div>
        </Authenticated>

    );
}

export default FileUpload;
