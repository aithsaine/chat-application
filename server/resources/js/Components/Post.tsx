
import { UserCircleIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid"
import axios from "axios";
import { useEffect, useState } from "react";
import { EllipsisHorizontalIcon, ChatBubbleBottomCenterTextIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Comment from "@/Components/Comment";
import { Link } from '@inertiajs/react';
import VideoPlayer from "./VideoPlayer";

export default function Post({ username, title, files, date, filename, post_id, user_id, likes, dislikes, reaction, commentsCount, auth }) {
    const [lks, setLikes] = useState(likes)
    const [dsl, setDislikes] = useState(dislikes)
    const [reactType, setReactType] = useState(reaction)
    const [commentsCnt, setCommentsCnt] = useState(commentsCount)
    const submitHandler = async (e, type) => {
        e.preventDefault()
        const resp = await axios.post("reaction/store", { type, user_id: auth.user.id, post_id })
        if (resp.data.status == "success") {
            setLikes(resp.data.post.likes)
            setDislikes(resp.data.post.dislikes)
            setReactType(resp.data.post.reaction)
        }

    }
    const [load, setLoad] = useState(false)




    const [image, setImage] = useState("")
    useEffect(() => {
        const getPict = async () => {

            const response = await axios.get(`/storage/picture/${filename}`, {
                responseType: 'blob',
            })
            if (response.status == 200) {

                const blobUrl = URL.createObjectURL(response.data);
                setImage(blobUrl)
            }

        }
        filename && getPict();

    }, [])

    const videoExtensions = ["mp4", "mkv"]
    const imageExtensions = ["jpg", "png", "webp"]
    const fileExt = files[0] && files[0].split(".").slice(-1)

    return (
        <>

            <div style={{ minHeight: "20px" }}
                className={`w-full my-4 relative flex shadow-xl flex-col items-start mt-4 rounded-xl dark:bg-black dark:text-white lg:w-3/4`}>
                <Link href={`user/${user_id}`} className="flex items-center">
                    <img className="rounded-full object-cover h-10 w-10" src={image} />
                    <div className="ml-2 flex flex-col items-start">
                        <div className="leading-snug text-sm dark:text-white font-bold">{username.toUpperCase()}</div>
                        <div className="leading-snug text-xs dark:text-gray-400 ">{date}</div>
                    </div>
                </Link>

                <button className={"right-0 absolute "}><EllipsisHorizontalIcon className={"w-10 h-6 font-bold   inline-block cursor-pointer"} /></button>
                <p className={"m-4"}>{title}</p>
                {
                    fileExt && videoExtensions.includes(fileExt[0]) ?

                        < VideoPlayer file={`http://localhost:8000/post/assets/${files[0]}`} /> :
                        fileExt && imageExtensions.includes(fileExt[0]) ?
                            < img className={` w-full border border-2 `} src={`http://localhost:8000/post/assets/${files[0]}`} /> : <></>}



                <div className={"m-4 flex items-center justify-between w-full"}>
                    <div>

                        <span className={"text-sm"}>{lks}</span>
                        <label title={"like"} onClick={e => submitHandler(e, "like")} htmlFor={"like"}><HandThumbUpIcon
                            className={`w-10 h-6 inline-block cursor-pointer transform transition duration-300 hover:scale-125 ${reactType == 'like' ? "text-green-800" : "text-green-100"}`} /></label>
                        <label title={"dislike"} onClick={e => submitHandler(e, "dislike")} htmlFor={"dislike"} ><HandThumbDownIcon
                            className={`w-10 h-6 inline-block cursor-pointer transform transition duration-300 hover:scale-125 ${reactType == "dislike" ? 'text-red-800' : "text-red-100"}`} /></label>
                        <span className={"text-sm"}>{dsl}</span>
                    </div>

                    <div className={"me-6 t text-sky-600"}>
                        <button className="flex space-x-2" onClick={e => setLoad(true)} title={"comments"}><span className="text-black dark:text-white">{commentsCnt}</span><ChatBubbleBottomCenterTextIcon className={"bg-sk w-6"} /></button>  {/*"comments button"*/}
                        {load && (

                            <Comment setLoad={setLoad} commentsCnt={commentsCnt} setCommentsCnt={setCommentsCnt} user_id={auth.user.id} post_id={post_id} />
                        )}
                    </div>

                </div>

            </div>
        </>
    )
}
