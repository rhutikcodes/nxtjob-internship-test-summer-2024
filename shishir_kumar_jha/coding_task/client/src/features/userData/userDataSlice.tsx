import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {userParamsType} from "coding-project"

const initialState:userParamsType = {
 id:null,
 firstName:null,
 lastName:null,
 image:null,
 emailAddress:null,
}

export const userDetailsSclice = createSlice({
  name: 'userDetails',
  initialState,


    //reducers
    extraReducers: (builder) => {
      builder
        
        .addCase(fetchAsync.fulfilled, (state, action) => {
         
        })
        .addCase(fetchAsync.rejected, (state, action) => {
           new Error(action.error.message)
         
        });
    },
  });
  
// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer