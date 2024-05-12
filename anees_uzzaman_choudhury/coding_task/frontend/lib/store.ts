import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postSlice';
import bookmarksReducer from './features/bookmarks/bookmarksSlice'
import searchReducer from './searchReducer';
import { apiSlice } from './features/api/apiSlice';


// Function to create a new store instance
export const makeStore = () => {
    return configureStore({
        reducer: {
            posts: postsReducer,
            bookmarks: bookmarksReducer,
            search: searchReducer,
            [apiSlice.reducerPath]: apiSlice.reducer

        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware)
    });
};

// For use with your Redux hooks in components
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Create a specific instance for static usage if necessary
export const store = makeStore();

