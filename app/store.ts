import { configureStore } from '@reduxjs/toolkit'
import authReducer from './context/auth/authSlice'
import themeReducer  from './context/theme/themeSlice'
import languageReducer from "./context/language/languageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    language: languageReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch