import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/features/auth/authSlice";
import postsReducer from "./redux/features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
