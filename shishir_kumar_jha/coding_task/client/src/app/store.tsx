import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from "../features/userData/userDataSlice"
import postInfoReducer from '@/features/postData/postDataSlice'
export const store = configureStore({
  reducer: {
    userInfo:userInfoReducer,
    postInfo:postInfoReducer
    
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch