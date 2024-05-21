"use client";
import React, { useEffect, useState } from 'react';
import { useFetchPostsByChannelQuery } from '@/lib/features/api/apiSlice';
import { useAppDispatch } from '@/lib/hooks';
import { setPosts } from '@/lib/features/posts/postSlice';

const GetPosts = ({ channelId }: { channelId: string }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Set the limit for the number of posts per page
  const { data: posts, isFetching, error } = useFetchPostsByChannelQuery({ channelId, page, limit });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (posts) {
      dispatch(setPosts(posts.data)); 
    }
  }, [posts, dispatch]);

  const handleNextPage = () => {
    if (posts.meta.hasNextPage) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isFetching) return <div></div>;
  if (error) return <div>Failed to load posts</div>;

  return null;
};

export default GetPosts;









// import { fetchPostsByChannel, setPosts } from '@/lib/features/posts/postSlice';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import React, { useEffect } from 'react';

// const GetPosts = ({ channelId }: { channelId: string }) => {
//   const dispatch = useAppDispatch();
//   const postsStatus = useAppSelector(state => state.posts.status);
//   const postsError = useAppSelector(state => state.posts.error);

//   useEffect(() => {
//     dispatch(fetchPostsByChannel(channelId));
//   }, [channelId, dispatch]);
//   if (postsStatus === 'loading') {
//     return <p>Loading posts...</p>;
//   }

//   if (postsError) {
//     return <p>Error fetching posts: {postsError}</p>;
//   }
//   return null; // or your actual component that requires the posts data
// };

// export default GetPosts;