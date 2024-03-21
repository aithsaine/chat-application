
import {UserCircleIcon,HandThumbUpIcon,HandThumbDownIcon} from "@heroicons/react/24/solid"
import axios from "axios";
import {useEffect, useState} from "react";
import { EllipsisHorizontalIcon,ChatBubbleBottomCenterTextIcon,XCircleIcon } from '@heroicons/react/24/solid';
import Comment from "@/Components/Comment";

export  default  function Post({username,title,files,date,filename,post_id,user_id,likes,dislikes,reaction})
{
    const [lks,setLikes] = useState(likes)
    const [dsl,setDislikes] = useState(dislikes)
    const [reactType,setReactType] = useState(reaction)
    const submitHandler = async (e,type)=> {
        e.preventDefault()
        const resp = await axios.post("reaction/store", {type, user_id, post_id})
        if (resp.data.status == "success") {
            setLikes(resp.data.post.likes)
            setDislikes(resp.data.post.dislikes)
            setReactType(resp.data.post.reaction)

        }

    }
    const [load,setLoad] = useState(false)





    const [image,setImage] = useState("")
    useEffect(() => {
        const getPict = async () => {

            const response = await axios.get(`/storage/picture/${filename}`, {
                responseType: 'blob',
            })
            if (response.status == 200) {

                const blobUrl = URL.createObjectURL(response.data);
                setImage(blobUrl)
                console.log(response.data)
            }

        }
        getPict();

    }, [])

    return(
        <>

        <div  style={{minHeight: "20px"}}
             className=' w-full my-4 relative flex shadow-xl flex-col items-start mt-4 rounded-xl bg-white lg:w-3/4'>
            <span className={"mt-4"}>
                <img src={image} className={'w-10 h-10 rounded-full inline-block mx-2 overflow-hidden object-cover'}/>

                <span
                className={"font-bold"}>{username.toUpperCase()}</span> <button className={"right-0 absolute "}><EllipsisHorizontalIcon className={"w-10 h-6 font-bold   inline-block cursor-pointer"}/></button></span>
            <span className={"text-sm  text-gray-500 ml-10"}>{(date)} ago</span>
            <p className={"m-4"}>{title}</p>
            {files[0]&&<img className={` w-full border border-2 `} src={`http://localhost:8000/post/assets/${files[0]}`}/>}

            <div className={"m-4 flex items-center justify-between w-full"}>
<div>

                    <span className={"text-sm"}>{lks}</span>
                    <label title={"like"} onClick={e=>submitHandler(e,"like")} htmlFor={"like"}><HandThumbUpIcon
                        className={`w-10 h-6 inline-block cursor-pointer ${reactType=='like'?"text-green-800":"text-green-100"}`}/></label>
                    <label title={"dislike"} onClick={e=>submitHandler(e,"dislike")} htmlFor={"dislike"} ><HandThumbDownIcon
                        className={`w-10 h-6 inline-block cursor-pointer ${reactType=="dislike"?'text-red-800':"text-red-100"}`}/></label>
                    <span className={"text-sm"}>{dsl}</span>
</div>

                <div className={"me-6 t text-sky-600"}>
                <button onClick={e=>setLoad(true)} title={"comments"}><ChatBubbleBottomCenterTextIcon className={"bg-sk w-6"} /></button>  {/*"comments button"*/}
                    {    load && (

                    <Comment isLoad={load} setLoad={setLoad} post_id={post_id}/>
                    )}
                </div>

            </div>

        </div>
        </>
    )
}
