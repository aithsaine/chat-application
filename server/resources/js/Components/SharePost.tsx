import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function SharePost({ user, posts, setPosts }) {
    const [postFile, setPostFile] = useState(null)
    const [title, setTitle] = useState("")
    const [user_id, setUserId] = useState(user.id)
    const [uploadProgress, setUploadProgress] = useState(0);
    const submit = async (e) => {
        e.preventDefault();
        const resp = await axios.post("post/store", { postFile, title, user_id }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadProgress(progress);
            }
        }

        );
        if (resp.data.status == "success") {
            setTitle("")
            toast.success(resp.data.message);
            setPosts([resp.data.post, ...posts])
            setUploadProgress(0)
        }
    }
    return (
        <div className=' w-full px-4 flex shadow-2xl flex-col items-center rounded-xl bg-white lg:w-3/4'>
            {uploadProgress > 0 && (
                <div className="relative w-full pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                Uploading...
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-green-600">
                                {uploadProgress}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                        <div
                            style={{ width: `${uploadProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        ></div>
                    </div>
                </div>
            )}
            <textarea name="" id="mytextarea" value={title} onChange={e => setTitle(e.target.value)} placeholder={`What's on your mind, ${user.first_name.toUpperCase()}?`} className='w-full mt-2 rounded-xl bg-gray-100  text-md border-none  resize-none' rows="2"></textarea>
            <form onSubmit={submit} encType="multipart/form-data" className="w-full space-y-2">
                <input type="file" onChange={e => setPostFile(e.target.files[0]!)} name="Postfile" className='hidden' id="post-file" />
                <div className='flex w-full  items-center justify-between'>
                    <button type='button' onClick={e => {
                        document.getElementById("post-file").click()
                    }} className='text-md  font-bold  text-sky-600 p-4'>File <PaperClipIcon className='w-6 h-6 inline-block mx-1 ' />
                    </button >
                    <button type={"submit"} className='text-md  font-bold  text-sky-600 p-4'>Send<PaperAirplaneIcon className='w-6 h-6 inline-block mx-1 text-sky-600' /></button>
                </div>
            </form>

        </div>)
}
