import { createSlice } from '@reduxjs/toolkit'
import {userParamsType} from "coding-project"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserDetails } from './userDataApi'

interface reduxUserParamsTypes extends userParamsType{ 
  status:string,
  error:any,
  showcreatePostComponent:boolean
} 




const initialState:reduxUserParamsTypes = {
 id:null,
 firstName:null,
 lastName:null,
 image:null,
 emailAddress:null,
 showcreatePostComponent:false,
 status:'',
 error:''
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
    PostComponent: (state) => {
      state.showcreatePostComponent = !state.showcreatePostComponent;
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
  

  export const { PostComponent } = userInfoSclice.actions;
export default userInfoSclice.reducer