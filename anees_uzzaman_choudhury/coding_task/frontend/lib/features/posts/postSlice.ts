// features/posts/postSlice.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Comment {
  commentId: string;
  content: string;
  fromUserId: string;
  createdAt: string;
  User: {
    username: string;
  };
}

interface Post {
  postId: string;
  content: string;
  userId: string;
  channelId: string;
  tagId: string[];
  username: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  Comments: Comment[]; // Assuming Comment is another interface you have defined
}

interface PostState {
  posts: Post[];
  filteredPosts: Post[];
  selectedTag: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any
}

const initialState: PostState = {
  posts: [],
  filteredPosts: [],
  selectedTag: '',
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<any>) {
      // Correct immutable update
      state.posts = [action.payload, ...state.posts];
      state.filteredPosts = [action.payload, ...state.filteredPosts];
    },
    setPosts(state, action) {
      state.posts = action.payload;
      state.filteredPosts = action.payload;  // Initially no filter applied
    },
    selectTag(state, action) {
      state.selectedTag = action.payload;
      state.filteredPosts = state.posts.filter(post => 
        action.payload === '' || post.tagId.includes(action.payload));
    },
    commentAdded(state, action: PayloadAction<{ postId: string; comment: Comment }>) {
      const { postId, comment } = action.payload;
      // Helper function to add comment to a post in an array
      const addCommentToPosts = (postsArray: Post[]) => {
        const existingPost = postsArray.find(post => post.postId === postId);
        if (existingPost) {
            if (!existingPost.Comments) {
                existingPost.Comments = [];
            }
            existingPost.Comments.push(comment);
        }
      };
    
      // Update both posts and filteredPosts arrays
      addCommentToPosts(state.posts);
      addCommentToPosts(state.filteredPosts);
    },
  

  }
});

// Export actions
export const { setPosts, postAdded, selectTag, commentAdded } = postsSlice.actions;

export default postsSlice.reducer;
