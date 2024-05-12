import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Assuming your initial state and other imports are set up here

interface BookmarkState {
  bookmarks: string[];
  loading: boolean;
  error: null;
}

const initialState: BookmarkState = {
  bookmarks: [],
  loading: false,
  error: null
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    fetchBookmarksStart(state) {
        state.loading = true;
        state.error = null;
    },
    fetchBookmarksSuccess(state, action) {
        state.bookmarks = action.payload;
        state.loading = false;
    },
    fetchBookmarksFailure(state, action) {
        state.error = action.payload;
        state.loading = false;
    },
    toggleBookmark(state, action: PayloadAction<string>) {
        const index = state.bookmarks.indexOf(action.payload);
        if (index === -1) {
            state.bookmarks.push(action.payload);  // If not found, add to bookmarks
        } else {
            state.bookmarks.splice(index, 1);  // If found, remove from bookmarks
        }
    },
    setBookmarks(state, action: PayloadAction<string[]>) {
        state.bookmarks = action.payload;
    }
  },
});

export const {
    fetchBookmarksFailure,
    fetchBookmarksStart,
    fetchBookmarksSuccess,
    toggleBookmark,
    setBookmarks
  } = bookmarkSlice.actions;
  
  export default bookmarkSlice.reducer;
