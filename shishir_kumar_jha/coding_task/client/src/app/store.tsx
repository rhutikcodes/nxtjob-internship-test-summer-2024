import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from "../features/userData/userDataSlice"

export const store = configureStore({
  reducer: {
    userInfo:userInfoReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch