"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';

const BookmarkButton = ({ postId }: { postId: string }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchBookmarks = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.log('User not logged in');
          return;  // User not logged in
        }
  
        try {
          const response = await axios.get(`https://backend.anees-azc.workers.dev/api/v1/users/${userId}/showBookmarkIds`);
          if (response.data && response.data.bookmarkIds) {
            setIsBookmarked(response.data.bookmarkIds.includes(postId));
          }
        //   console.log('Bookmarks fetched:', response.data);
        } catch (error) {
          console.error('Error fetching bookmarks:', error);
        }
      };
  
      fetchBookmarks();
    }, [postId]);
  
    const toggleBookmark = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('You must be logged in to bookmark posts.');
        return;
      }
  
      setIsLoading(true);
  
      try {
        const url = `https://backend.anees-azc.workers.dev/api/v1/users/${userId}/bookmark/${postId}`;

        await axios.post(url);
        setIsBookmarked(!isBookmarked); 
        console.log('Bookmark toggled:', !isBookmarked);
      } catch (error) {
        console.error('Failed to toggle bookmark:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <button onClick={toggleBookmark} disabled={isLoading}>
        {isBookmarked ? 
          <BookmarkFilledIcon className="text-primaryPurple w-4 h-4 sm:w-5 sm:h-5" /> : 
          <BookmarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      </button>
    );
  };

export default BookmarkButton;
