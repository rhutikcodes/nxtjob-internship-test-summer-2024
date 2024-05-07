"use client"
import React, { useEffect } from 'react'
import SideBar from './components/shared/SideBar'
import NavBar from './components/shared/NavBar'
import PostBody from './components/shared/PostBody'
import { Theme } from '@radix-ui/themes'
import { store } from './store'
import { Provider } from 'react-redux'




export default function Page() {





  return (
    <div>
        <Provider store={store}>
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
      </Provider>
    </div>
  )
}
