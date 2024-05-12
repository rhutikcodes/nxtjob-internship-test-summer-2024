"use client"
import axios from "axios";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const SideBar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [channelCounts, setChannelCounts] = useState({
    introduction: 0,
    announcements: 0,
    success: 0,
    career: 0,
  });

  const handleLogout = () => {

    if (localStorage.getItem('userId')) {
      localStorage.removeItem('userId'); // Remove userId from localStorage
      toast.success("Logged out successfully!")
    }
  };

  useEffect(() => {
    // Function to fetch the latest counts
    const fetchChannelCounts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('No user ID found, user must be logged in to fetch channel counts');
          return;
        }
        const response = await axios.get('https://backend.anees-azc.workers.dev/api/v1/counts', {
          params: {
            userId: userId
          }
        });
        setChannelCounts(response.data);
      } catch (error) {
        console.error('Failed to fetch channel counts:', error);
      }
    };

    // Fetch counts initially and set up polling
    fetchChannelCounts();
    const intervalId = setInterval(fetchChannelCounts, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); 
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <button onClick={toggleSidebar} aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside ref={sidebarRef} id="default-sidebar" className={`fixed top-16 left-0 z-40 w-[243px] h-screen transition-transform bg-white ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="introduction" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-400 link ${pathname === '/introduction' ? 'bg-lightPurple text-primaryPurple' : ''}`}>
                Introduction <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{channelCounts.introduction > 0 && channelCounts.introduction}</span>
              </Link>
            </li>
            <li>

              <Link href="/announcements" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-400 link ${pathname === '/announcements' ? 'bg-lightPurple text-primaryPurple' : ''}`}>

                Announcements <span className="count"></span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{channelCounts.announcements > 0 && channelCounts.announcements}</span>
              </Link>
            </li>
            <li>
              <Link href="/success" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-400 link ${pathname === '/success' ? 'bg-lightPurple text-primaryPurple' : ''}`}>

                <span className="count">Success Stories</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{channelCounts.success > 0 && channelCounts.success}</span>
              </Link>
            </li>
            <li>
              <Link href="/career" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-400 link ${pathname === '/career' ? 'bg-lightPurple text-primaryPurple' : ''}`}>

                <span className="count">Career Discussions</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{channelCounts.career > 0 && channelCounts.success}</span>

              </Link>
            </li>
            <li>
              <button className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-400 link `}
               onClick={handleLogout}
              >

                <span className="count pr-20">Log out</span>

              </button>
            </li>

          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
