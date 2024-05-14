"use client"
import { useState,useMemo, useEffect} from "react"
import {useDispatch, useSelector } from 'react-redux'
import { AppDispatch,RootState } from "../../store"
import { CommentComponent } from "@/features/userData/userDataSlice";
import { pusherClient } from "@/app/lib/pusher";
import axios from "axios";
import { CommentsLengthComponentToStore } from "@/features/postData/postDataSlice";
import Loading from "./Loading";
export default function Comment({roomId}:{roomId:string}) {


 const [comment,setComment] = useState<string>("") 
 const [commentArray,setCommentArray] = useState<Array<string>>([])
    const dispatch = useDispatch<AppDispatch>();

let p


  //comment creation thru websocket
    useEffect(() => {
      // Subscribe to Pusher channel for the roomId
      const channel = pusherClient.subscribe(roomId);
    
      // Bind to the 'comment-message' event to receive new messages
      const handleNewMessage = (message: string) => {
        setCommentArray(prevArray => {
          const newArray = [...prevArray, message];
          const commentLength = newArray.length; 
          dispatch(CommentsLengthComponentToStore({roomId, commentLength}));
          return newArray; 
        });

      };
    
      channel.bind('comment-message', handleNewMessage);
    
      return () => {
        channel.unbind('comment-message', handleNewMessage);
        pusherClient.unsubscribe(roomId);
      }; 
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId]);
    


async function sendComment(roomId:string,comment:string){


  const API_BASE_URL =process.env.NEXT_PUBLIC_MODE === "production"? "https://blinkchat-nu.vercel.app": "http://localhost:3000";
  //  ws?.send(content)

if(comment.length!=0)
  {
    console.log(roomId)
    const res = await axios.post(`${API_BASE_URL}/api/sendComment`,{roomId:roomId,comment:comment})
    if(res?.data?.mssg)
      { 
        try {
          const {roomId,comment} =  res.data.mssg
       await axios.put(" https://coding-task.shishirkj08.workers.dev/api/v1/addComment",{index:roomId,comment:comment})
     
        } catch (error:unknown) {
          console.log(error)
        }
        finally
        { 
          setComment("")
        }
         
      }
       
  }

  else{ 
    return
  }

} 
//get comments of particular post
useEffect(()=>{ 
  async function getComments(){ 
      try {
      const res = await axios.get(`https://coding-task.shishirkj08.workers.dev/api/v1/getComment/${roomId}`)
        const content= res?.data?.mssg
        setCommentArray(content)
  } 
  catch (error:any) {
    console.log(error)
  }
  }
  getComments()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])




function handleChange(e:React.ChangeEvent<HTMLInputElement>){ 

setComment(e.target.value)

}


    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input value = {comment} onChange={handleChange}
                className="flex-1 bg-gray-100 border-none rounded-l-lg py-2 px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Write a comment..."
                type="text"
              />
              <button onClick={()=>sendComment(roomId,comment)} className="bg-pink-500 text-white font-medium py-2 px-4 rounded-r-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">
                Comment
              </button>
            </div>
            <button    className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <XIcon  onClick={()=>dispatch(CommentComponent(roomId))}  className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="h-64 overflow-y-auto">
            <div className="space-y-4">

             {(commentArray.length!=0)?commentArray.map((comment,index)=>( 
                <div key={index}>
                  <div className="flex items-start">      
               <div className="bg-gray-100 rounded-lg p-4 flex-1">
                 <p className="text-gray-700">{comment}</p>
               </div>
             </div>
                        </div>
             )):<Loading/>}
              
        
            </div>
            
          </div>
         
        </div>
      </div>
    )
  }
  

  
  function XIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }