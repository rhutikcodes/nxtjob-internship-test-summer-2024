"use client";
import React, { useEffect } from 'react';
import { useFetchPostsByChannelQuery } from '@/lib/features/api/apiSlice';
import { useAppDispatch } from '@/lib/hooks';
import { setPosts } from '@/lib/features/posts/postSlice';

const GetPosts = ({ channelId }: { channelId: string }) => {
  const { data: posts, isFetching, error } = useFetchPostsByChannelQuery(channelId);
  const dispatch = useAppDispatch();

  // Effect to handle the dispatch whenever posts data changes
  useEffect(() => {
    if (posts) {
      dispatch(setPosts(posts));
    }
  }, [posts, dispatch]);

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