import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../../backendUrl";

export const fetchPosts = createAsyncThunk(
  "fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(backendUrl + "/posts");
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "createPost",
  async ({ formData, token }, thunkAPI) => {
    try {
      const response = await axios.post(backendUrl + "/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    posts: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      // TODO: append new post to old posts
      state.loading = false;
    });

    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      console.log("CREATE POST ERROR");
      console.log(action.payload);
    });
  },
});

// export {} postsSlice.actions
export default postsSlice.reducer;
