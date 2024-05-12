// src/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', // Unique key for the reducer
    baseQuery: fetchBaseQuery({ baseUrl: 'https://backend.anees-azc.workers.dev/api/v1' }),
    endpoints: (builder) => ({
      fetchPostsByChannel: builder.query({
        query: (channelId) => `posts/${channelId}`,
      }),
    }),
  });
  
  export const { useFetchPostsByChannelQuery } = apiSlice;
