import {postContentParamType} from "coding-project"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'



interface commentAndPostType extends postContentParamType{ 
  postContent: string | null;
  comment:{roomId:string,commentLength:number}
}



const initialState:commentAndPostType = { 
  postContent:"",
  comment:{roomId:"",commentLength:0}
}





export const postInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers:{

    PostComponentToStore: (state:postContentParamType, action: PayloadAction<string>) => {
      console.log("action.payload:",action.payload)
      state.postContent =action.payload

    },
    CommentsLengthComponentToStore: (state:commentAndPostType, action: PayloadAction<{roomId:string,commentLength:number}>) => {
 
     state.comment.commentLength= action.payload.commentLength
     state.comment.roomId=action.payload.roomId

    }
  },

  });
  

  export const { PostComponentToStore,CommentsLengthComponentToStore} = postInfoSlice.actions;
export default postInfoSlice.reducer