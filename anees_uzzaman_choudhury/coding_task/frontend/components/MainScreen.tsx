"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons'
import ChangeLikes from "./ChangeLikes";
import { useSpring, useScroll, motion } from "framer-motion"
import { commentAdded, selectTag } from "@/lib/features/posts/postSlice";
import CommentsCard from "./CommentsCard";
import axios from "axios";
import LoginModal from "@/framer/LoginModal";
import BookmarkButton from "@/Hooks/AddBookmarks";
import toast from "react-hot-toast";
export const dynamic = 'force-dynamic'

const MainScreen = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.filteredPosts);
  const selectedTag = useAppSelector(state => state.posts.selectedTag);
  const searchTerm = useAppSelector(state => state.search.searchTerm);

  // Combining filters for selected tag and search term
  const visiblePosts = posts.filter(post => {
    const matchesSearchTerm = post.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tagId.includes(selectedTag) : true; 

    return matchesSearchTerm && matchesTag;
  });

  const [activePostId, setActivePostId] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleComments = (postId: any) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setIsOpen(true);
      toast.error("Login to start commenting!")
      return;
    }
    setActivePostId(activePostId === postId ? null : postId);
    setShowCommentInput(false); 
  };

  const handleAddComment = async (postId: any) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('You must be logged in to add comments.');
      return;
    }
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('https://backend.anees-azc.workers.dev/api/v1/comments', {
        postId,
        userId,
        content: newComment,
      });
      if (response.status === 201) {
        dispatch(commentAdded({
          postId: postId, 
          comment: {
              commentId: response.data.commentId,
              content: response.data.content,
              fromUserId: response.data.fromUserId,
              createdAt: response.data.createdAt,
              User: {
                  username: response.data.User.username
              }
          }
        }));
        setNewComment('');
        setShowCommentInput(false);
        toast.success('Comment added successfully');
      } else {
        toast.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Error adding comment');
    }
  };

  const options = [
    { id: 'product', label: 'Product' },
    { id: 'webinar', label: 'Webinar' },
    { id: 'technology', label: 'Technology' },
    { id: 'productivity', label: 'Productivity' }
  ];

  const { scrollYProgress } = useScroll();
  const [initialLoad, setInitialLoad] = useState(true);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (scrollYProgress.get() > 0) {
        setInitialLoad(false);
      }
    };


    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);  

  return (
    <div>
      <motion.div
        className="progress-bar fixed top-0 left-0 right-0 h-[6px] bg-red-500 transform origin-left"
        style={{ scaleX, display: initialLoad ? 'none' : 'block' }}
      />
      <div className="flex py-3 items-center content-center gap-custom self-stretch flex-wrap bg-white">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => dispatch(selectTag(option.id))} // Dispatching selectTag action on click
          className={`flex justify-center items-center rounded-lg px-2 sm:px-3 sm:py-2 gap-1
              ${selectedTag === option.id ? 'bg-primaryPink text-white' : 'bg-lightPurple text-primaryPurple'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.3333 5.99999C10.3333 6.18409 10.1841 6.33332 9.99996 6.33332C9.81586 6.33332 9.66663 6.18409 9.66663 5.99999C9.66663 5.81589 9.81586 5.66666 9.99996 5.66666C10.1841 5.66666 10.3333 5.81589 10.3333 5.99999Z" stroke="#7047EB" />
            <path d="M8.00002 3.16666H12.8334V7.99999L8.36904 12.4472C7.83632 12.9779 6.9704 12.9633 6.45582 12.415L3.52664 9.294C3.02696 8.76159 3.04846 7.9263 3.57487 7.4203L8.00002 3.16666Z" stroke="#7047EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {option.label}
        </button>
      ))}
      <button onClick={() => dispatch(selectTag(''))} className="bg-gray-100 text-gray-900 p-2 rounded">Clear Filter</button>
      </div>
      <hr className="h-px my-1 sm:my-2 bg-gray-200 border-0"></hr>
      <main className="flex-grow py-1 sm:py-2">
      {visiblePosts.map((post) => (
        <div key={`${post.userId}-${post.postId}`} className="p-3 sm:p-4 bg-white border shadow rounded-lg mb-3 sm:mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className='bg-primaryOrange w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm'>
                {post.username.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lg sm:text-xl font-medium ml-2">{post.username}</h2>
            </div>
            <span className="text-xs sm:text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}</span>
          </div>
          <p className="text-base sm:text-lg">{post.content}</p>
          <div className="flex justify-between items-center mt-0 ml-1">
            <div className="flex items-center space-x-4">
              <ChangeLikes post={post} />
              <div className="flex items-center cursor-pointer" onClick={() => toggleComments(post.postId)}>
                <FaRegCommentDots className="mr-1 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="sm:text-lg text-gray-400">{post.Comments.length}</span>
              </div>
            </div>
            <BookmarkButton postId={post.postId} />
          </div>
          {/* Conditionally render the comments for the active post */}
          {activePostId === post.postId && (
            <>
              <div className="mt-2">
                {post.Comments.map((comment: any) => (
                  <CommentsCard key={comment.commentId} comment={comment} />
                ))}
                {showCommentInput && (
                  <div>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-2 border rounded"
                    />
                    <button onClick={() => handleAddComment(post.postId)} className="py-1 px-3 bg-primaryPink text-white rounded-lg mt-2">
                      Submit
                    </button>
                  </div>
                )}
                <CiCirclePlus className="w-6 h-6 cursor-pointer ml-1" onClick={() => setShowCommentInput(!showCommentInput)} />
              </div>
            </>
          )}
        </div>
      ))}
    </main>
    </div>
  );
};

export default MainScreen;