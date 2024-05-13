"use client"
import React, { useState,useEffect, useMemo } from 'react';
import Image from 'next/image';
import Button from './Button';
import axios from 'axios';
import { pusherClient } from "@/app/lib/pusher";




export default function NavBar() {

const [showNotificationContainer,setshowNotificationContainer] = useState<boolean>(false)
const [showNotificationInput,setshowNotificationInput] = useState<boolean>(false)
const [notificationArray,setNotificationArray] = useState<Array<{id:string,content:string}>>([])
const [content,setContent] = useState<string>("")
 
//notification using websocket
useEffect(() => {
  // Subscribe to Pusher channel for the roomId
  const channel = pusherClient.subscribe("notification");

  // Bind to the 'comment-message' event to receive new messages
  const handleNewMessage = (message: string) => {
    let uniqueId = Math.random().toString()
    setNotificationArray(prevArray => [...prevArray, {id:uniqueId,content:message}]);
  };

  channel.bind('new-notification', handleNewMessage);

  return () => {
    channel.unbind('new-notification', handleNewMessage);
    pusherClient.unsubscribe("notification");
  }; 

}, []);



useEffect(()=>{
  async function getAllNotification(){ 
    try {
      const res = await axios.get("https://coding-task.shishirkj08.workers.dev/api/v1/getAllNotification")
      if(res.data.mssg)
        { 
          setNotificationArray(res.data.mssg)
        }
    } catch (error:unknown) {
      console.log(error)
    }
   
  }
  getAllNotification()
 },[])



//publish the notification to everyone and store it in the database
async function handleNotification(){ 

  try {
    const API_BASE_URL =process.env.NEXT_PUBLIC_MODE === "production"? "https://blinkchat-nu.vercel.app": "http://localhost:3000";
  //  ws?.send(content)

if(content.length!=0)
  {
   
    const res = await axios.post(`${API_BASE_URL}/api/sendNotification`,{content:content})

    if(res?.data.mssg)
      { 
        await axios.post("https://coding-task.shishirkj08.workers.dev/api/v1/createNotification",{notification:content})
      }
  }
    
  } catch (error:unknown) {
    console.log(error)
  }
  
finally{
  setContent("")
  setshowNotificationInput(!showNotificationInput)

}


}


  return (
    <div>

      <nav className='bg-[#FFFFFF] w-[1195px] h-[64px]  border-b-[1px] border-gray-200 flex justify-between left-[280.01px] p-[12px]'>
        {/* career */}
        <div className='w-[182px] h-[24px] flex items-center gap-2'>
          {/* target */}
          <div className='flex items-center'>
            <Image width={14.5} height={14.5} className='border-gray-700 ' src={"/discussion.svg"} alt="career"/>
            <span className='ml-2'>Career Discussions</span>
          </div>
        </div>


{!showNotificationInput&&<div  onClick={()=>setshowNotificationInput(!showNotificationInput)} className="cursor-pointer text-[#56c24d] ">Click Here To Send Notification</div>}
{
  showNotificationInput&&(
  <div className='flex items-center'>
    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setContent(e.target.value)} value={content}  className="bg-gray-200 text-black rounded-md h-7"/>
    <Image onClick={()=>setshowNotificationInput(!showNotificationInput)} className='absolute left-[48rem] cursor-pointer ' src={"/cross.svg"} alt='x' width={12} height={12}/>

<Button onClick={handleNotification} className=' bg-[#ff69b4] h-7 rounded-xl  leading-5 pb-[28px] ml-3 text-white '>send Notificaiton</Button>
  </div>
  )
}


        {/* header icons */}
        <div className='w-[360px] h-[32px] gap-4'>
{/* frame */}
<div className='flex '>
<div className='w-[240px] h-[32px] rounded-[0.25rem] pt-1 pr-2 pb-1 pl-2 bg-[#F7F7F8] flex justify-between'>
<p className='w-[40px] h-[24px] text-sm leading-6 size-[12px] text-[#8A8AA3] font-medium '>Search</p>
<div className='w-[16px] h-[16px]'>
    <Image src={"/search.svg"} alt='search' width={13.14} height={13.14} className='top-[1.33px] mt-1.5 left-[1.33px]'/>
</div>
</div>
{/* Bookmark */}
<div className=' flex w-[24px] h-[24px]'>
<Image src={"/rectangle.svg"} alt="bookmark" height={13.5} width={12} className='top-[1.33px]  ml-5 mt-2 left-[1.33px]'/>

<button onClick={()=>setshowNotificationContainer(!showNotificationContainer)}>
<Image src={"/bell.svg"} alt="bookmark" height={14.5} width={14.5} className='top-[1.33px]  ml-5 mt-2 left-[1.33px]'/>
<div className="relative top-[-20px] right-[-28px] flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
            {notificationArray.length}
              </div>
</button>

{
  showNotificationContainer&&<ul 
    className="absolute right-[5px] top-[38px] z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
   {
    notificationArray.length!=0&&notificationArray.map((element)=>( 
      <div key = {element.id}>
<li 
      className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      {element.content}
    </li>
      </div>

    ))
   } 
    
   <Button onClick={()=>setshowNotificationContainer(!showNotificationContainer)} className='w-full bg-[#ff69b4] rounded-lg border-[1px] gap-[8px] leading-5'>Close</Button>
    </ul>
}

  


<Image src={"/help.svg"} alt="bookmark" height={20} width={20} className='top-[1.33px]  ml-10 mt-2 left-[1.33px]'/>
</div>
</div>

        </div>
      </nav>
    </div>
  );
}
