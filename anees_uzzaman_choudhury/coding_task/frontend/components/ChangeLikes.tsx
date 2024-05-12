"use client";
import LoginModal from '@/framer/LoginModal';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

const ChangeLikes = ({ post }: { post: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    if (!userId) {
      console.error('No user ID found, user must be logged in to like posts');
      setIsOpen(true);
      toast.error("Login to like a post")
      return;
    }

    setIsLoading(true);
    const expectedLikes = liked ? likes - 1 : likes + 1; // Optimistically calculate the expected likes count
    setLikes(expectedLikes);
    setLiked(!liked);

    try {
      const response = await axios.post(`https://backend.anees-azc.workers.dev/api/v1/posts/${post.postId}/like`, { userId });

      // Verify the server response
      if (response.data.message !== (liked ? 'Unliked' : 'Liked')) {
        // Rollback if not successful
        setLikes(likes);
        setLiked(liked);
      } else {
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // Rollback in case of error
      setLikes(likes);
      setLiked(liked);
    }
    setIsLoading(false);
  };

  return (
    <button onClick={toggleLike} disabled={isLoading} className="flex items-center text-xs sm:text-sm text-gray-500" aria-pressed={liked}>
      {(likes || liked) ? <IoIosHeart className='text-red-500 w-4 h-4 sm:w-5 sm:h-5'/>: <IoIosHeartEmpty className='text-gray-400 w-4 h-4 sm:w-5 sm:h-5' />} <span className='m-1 sm:text-lg text-gray-400'>{likes}</span>
    </button>
  );
};

export default ChangeLikes;


