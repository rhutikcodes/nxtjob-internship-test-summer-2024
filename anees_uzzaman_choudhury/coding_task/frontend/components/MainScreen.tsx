"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useSpring, useScroll, motion } from "framer-motion"
import { commentAdded, selectTag } from "@/lib/features/posts/postSlice";
import Loader from "./Loader";

const PostsDisplay = lazy(() => import('./PostsDisplay'));

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
      <Suspense fallback={<Loader />}>
        <PostsDisplay
          visiblePosts={visiblePosts}
          activePostId={activePostId}
          setActivePostId={setActivePostId}
          showCommentInput={showCommentInput}
          setShowCommentInput={setShowCommentInput}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      </Suspense>
    </div>
  );
};


export default MainScreen;