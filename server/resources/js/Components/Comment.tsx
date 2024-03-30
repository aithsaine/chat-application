import { useEffect, useState } from "react";
import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import CommentItem from "./CommentItem";
export default function Comment({ user_id, post_id, isLoad, setLoad }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        const getComments = async () => {
            const response = await axios.get(`comments/${post_id}/`)
            if (response.data.status == "success") {
                setComments(response.data.comments)
            }

        }
        getComments()

        console.log(comments)

    }, [])

    const saveComment = async () => {
        const resp = await axios.post("comment/store", {
            post_id, user_id, content: newComment
        })
        if (resp.data.status === "success") {
            setComments([resp.data.comment, ...comments])
            setNewComment("")
        }
    }
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen overflow-scroll">
                <div className="fixed inset-0 transition-opacity" >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                    <button onClick={e => setLoad(false)}><XCircleIcon className={"w-6"} /></button>
                    <div style={{ minHeight: "300px", maxHeight: "300px" }} className={"flex w-full   overflow-scroll"}>
                        <div className="w-full ">
                            <div className="flex px-4" >

                                <InputEmoji
                                    cleanOnEnter
                                    value={newComment}
                                    borderColor="black"
                                    onChange={setNewComment}
                                    placeholder="Type a Comment"
                                />
                                <PaperAirplaneIcon onClick={saveComment} className="w-6 cursor-pointer " title="Save comment" />
                            </div >
                            <div className="flex flex-col p-2">
                                {comments.map(comment => <CommentItem filename={comment.picture} user_name={comment.user_name} user_id={comment.user_id} date={comment.date} content={comment.content} />)}
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>


    )

}
