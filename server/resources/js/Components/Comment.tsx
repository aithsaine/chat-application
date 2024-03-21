import {useEffect, useState} from "react";
import {XCircleIcon} from "@heroicons/react/24/solid";
import axios from "axios";

export  default  function Comment({post_id,isLoad,setLoad})
{
    const [post,setPost] = useState()
    const  [comments,setComments] = useState();
    useEffect(() => {
        const getPost = async ()=>{
        const resp = await axios.get(`posts/${post_id}/show`)
            if (resp.data.status=="success")
            {
                setPost(resp.data.post);
                setComments(resp.data.comments);
                console.log(resp)
            }
        }
        getPost()
    }, []);
    return (
            <div  className="fixed z-10 inset-0 overflow-y-auto">
                <div  className="flex items-center justify-center min-h-screen overflow-scroll">
                    <div className="fixed inset-0 transition-opacity" >
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div  className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                        <button onClick={e=>setLoad(false)}><XCircleIcon className={"w-6"}/></button>
                           <div style={{minHeight:"300px"}} className={"flex w-full items-center justify-center overflow-y-scroll"}>

                            {
                                post&&(
                                    <img style={{height:"300px",width:"90%"}} className={` w-1/2 m-3 object-cover `} src={`http://localhost:8000/post/assets/${post.files[0]}`}/>

                                )
                            }
                           </div>



                    </div>
                </div>
            </div>


)

}
