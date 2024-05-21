import { BACKEND_URL } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/v1` }),
  endpoints: (builder) => ({
    fetchPostsByChannel: builder.query({
      query: ({ channelId, page = 1, limit = 10 }) => ({
        url: `posts/${channelId}`,
        params: { page, limit },
      }),
    }),
  }),
});

export const { useFetchPostsByChannelQuery } = apiSlice;
