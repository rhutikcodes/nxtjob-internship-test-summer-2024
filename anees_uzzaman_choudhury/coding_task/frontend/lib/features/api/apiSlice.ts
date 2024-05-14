// src/api/apiSlice.js
import { BACKEND_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', // Unique key for the reducer
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/v1` }),
    endpoints: (builder) => ({
      fetchPostsByChannel: builder.query({
        query: (channelId) => `posts/${channelId}`,
      }),
    }),
  });
  
  export const { useFetchPostsByChannelQuery } = apiSlice;
