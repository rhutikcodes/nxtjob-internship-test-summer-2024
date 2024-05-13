import {userParamsType} from "coding-project"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserDetails } from './userDataApi'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface reduxUserParamsTypes extends userParamsType{ 
  status:string,
  error:any,
  showcreatePostComponent:boolean,
  showcreateCommentComponent:string|number
  id: string | null;
    firstName: string | null;
    lastName: string | null;
    emailAddress: string | null;
    image?: string | null | undefined;
} 




const initialState:reduxUserParamsTypes = {
 id:null,
 firstName:null,
 lastName:null,
 image:null,
 emailAddress:null,
 showcreatePostComponent:false,
 status:'',
 error:'',
 showcreateCommentComponent:0,
}



//fetches the userInfo from api
export const fetchAsync = createAsyncThunk(
  'user/userInfo',
 async()=>{ 
  const res = await  fetchUserDetails();
  return res.data.mssg;
 }
);


export const userInfoSclice = createSlice({
  name: 'userInfo',
  initialState,
reducers:{
  // toggling createPost component
    PostComponent: (state) => {
      state.showcreatePostComponent = !state.showcreatePostComponent;
    },
     // toggling createComment component
    CommentComponent: (state,action: PayloadAction<string|number>) => {
     if(typeof action.payload==='string')
      {
            const parsedPayload = parseInt(action.payload)
           
            state.showcreateCommentComponent = parsedPayload;
      }
      else
      {
            const stringifyPayload = action.payload.toString()
            state.showcreateCommentComponent = stringifyPayload
      }
    }
},
    //reducers
    extraReducers: (builder) => {
      builder
            .addCase(fetchAsync.pending, (state) => {
              state.status = 'loading';
            })
        .addCase(fetchAsync.fulfilled, (state, action) => {
          state.status = 'idle';
         
          state.id = action.payload.id
          state.firstName = action.payload.firstName
          state.lastName = action.payload.lastName
          state.emailAddress = action.payload.emailAddresses[0].emailAddress
          state.image = action.payload.imageUrl
         
        })
        .addCase(fetchAsync.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.error.message
         
        });
    },
  });
  

  export const { PostComponent,CommentComponent} = userInfoSclice.actions;
export default userInfoSclice.reducer