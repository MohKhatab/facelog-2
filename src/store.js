import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/features/auth/authSlice";
import postsReducer from "./redux/features/posts/postsSlice";
import commentsSlice from "./redux/features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsSlice,
  },
});
