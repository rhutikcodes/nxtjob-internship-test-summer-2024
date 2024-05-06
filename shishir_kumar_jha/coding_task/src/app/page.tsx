
import React from 'react'
import SideBar from './components/shared/SideBar'
import NavBar from './components/shared/NavBar'
import PostBody from './components/shared/PostBody'
import CreatePost from './components/shared/CreatePost'
import { Theme } from '@radix-ui/themes'


export default function Page() {

 
  return (
    <div>
<Theme>
      <div className='flex'>
      <SideBar/>
      <div className=' bg-gray-300 flex flex-col'>
      <NavBar/>
      {/* <CreatePost/> */}
      <PostBody/>
      </div>
      </div>
      </Theme>
    </div>
  )
}
