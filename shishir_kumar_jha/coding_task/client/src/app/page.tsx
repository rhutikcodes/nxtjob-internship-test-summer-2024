"use client"
import React, { useEffect, useMemo } from 'react'
import SideBar from './components/shared/SideBar'
import NavBar from './components/shared/NavBar'
import PostBody from './components/shared/PostBody'
import { Theme } from '@radix-ui/themes'
import {useDispatch, useSelector } from 'react-redux'
import { fetchAsync } from '@/features/userData/userDataSlice'
import { AppDispatch,RootState } from './store'
import axios from 'axios'
import CreatePost from './components/shared/CreatePost'
import { pusherClient } from './lib/pusher'
import { useState } from 'react'
import { PostComponentToStore } from '@/features/postData/postDataSlice'





export default function Page() {

  //content sending to createPost component
  const [postInfo,setPostInfo] = useState<string>("")  



  const dispatch = useDispatch<AppDispatch>();

  const image = useSelector((state:RootState)=>state.userInfo.image)
  const id = useSelector((state:RootState)=>state.userInfo.id)
  const firstName = useSelector((state:RootState)=>state.userInfo.firstName)
  const lastName = useSelector((state:RootState)=>state.userInfo.lastName)
  const emailAddress = useSelector((state:RootState)=>state.userInfo.emailAddress)
 const status = useSelector((state:RootState)=>state.userInfo.status)
 let showcreatePostComponent = useSelector((state:RootState)=>state.userInfo.showcreatePostComponent)
 



useEffect(()=>{
dispatch(fetchAsync())
},[dispatch])


useEffect(() => {
  // Send user data when userInfo changes
  if (status === 'idle') {
    sendUserData(); 
  }
}, [status,sendUserData]);



//post creation content
useEffect(() => {
  // Subscribe to Pusher channel for the roomId
  const channel = pusherClient.subscribe("my-room");

  // Bind to the 'incoming-message' event to receive new messages
  const handleNewMessage = (message: string) => {
dispatch(PostComponentToStore(message))
  };

  channel.bind('incoming-message', handleNewMessage);

  return () => {
    channel.unbind('incoming-message', handleNewMessage);
    pusherClient.unsubscribe("my-room");
  };


// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dispatch]);








// eslint-disable-next-line react-hooks/exhaustive-deps
async function sendUserData(){ 

  
  const res = await axios.post("https://coding-task.shishirkj08.workers.dev/api/v1/userInfo",{image,firstName,lastName,id,emailAddress})
 
      // Initiate the first call to connect to SSE API
   
      console.log(res.data.message);
      // console.log(res.data.dsdsa);
      // console.log(res.data.d);
    

}


// tesiting websockets using redis
async function handleSock(){ 
  
  // sub();
  const eventSource = new EventSource('wss://127.0.0.1:8787/ws')
 
  console.log("not yet inside listener",eventSource)
  eventSource.addEventListener('message', (event) => {
    // Parse the data received from the stream into JSON
    // Add it the list of messages seen on the page
   
    const tmp = JSON.parse(event.data)
    console.log(event.data);
    eventSource.close()
    // Do something with the obtained message
  })
  // As the component unmounts, close listener to SSE API
  return () => {
    eventSource.close()
  }
}







//notifications

  

  return (
    <div>
     
<Theme>
      <div className='flex'>
      <SideBar/>
    
      
      <div className=' bg-gray-300 flex flex-col'>
      <NavBar/>
     {showcreatePostComponent&&<CreatePost/>}
     <div>

      <PostBody  />
     </div>
      </div>
      
      </div>
      </Theme>

    </div>
  )
}
