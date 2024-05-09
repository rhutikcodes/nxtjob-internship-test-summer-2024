"use client"
import React, { useEffect } from 'react'
import SideBar from './components/shared/SideBar'
import NavBar from './components/shared/NavBar'
import PostBody from './components/shared/PostBody'
import { Theme } from '@radix-ui/themes'
import {useDispatch, useSelector } from 'react-redux'
import { fetchAsync } from '@/features/userData/userDataSlice'
import { AppDispatch } from './store'
import { RootState } from './store'
import axios from 'axios'
import CreatePost from './components/shared/CreatePost'


export default function Page() {

  
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

// eslint-disable-next-line react-hooks/exhaustive-deps
async function sendUserData(){ 
  const res = await axios.post("https://coding-task.shishirkj08.workers.dev/api/v1/userInfo",{image,firstName,lastName,id,emailAddress})
  console.log(res.data.message);
}

  return (
    <div>
     
<Theme>
      <div className='flex'>
      <SideBar/>
      <div className=' bg-gray-300 flex flex-col'>
      <NavBar/>
     {showcreatePostComponent&&<CreatePost/>}
      <PostBody/>
      </div>
      </div>
      </Theme>

    </div>
  )
}
