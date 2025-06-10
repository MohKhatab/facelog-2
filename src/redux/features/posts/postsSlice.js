import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../../backendUrl";

export const fetchPosts = createAsyncThunk(
  "fetchPosts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(backendUrl + "/posts", {
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

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ formData, token, postId }, thunkAPI) => {
    try {
      const response = await axios.patch(
        backendUrl + `/posts/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchSinglePost = createAsyncThunk(
  "fetchSinglePost",
  async (postId, thunkAPI) => {
    try {
      console.log("fetching single post");
      const response = await axios.get(backendUrl + `/posts/${postId}`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (postId, thunkAPI) => {
    try {
      await axios.delete(backendUrl + "/posts/" + postId);
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addInteraction = createAsyncThunk(
  "addInteraction",
  async ({ postId, token }, thunkAPI) => {
    try {
      await axios.post(
        backendUrl + `/posts/${postId}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeInteraction = createAsyncThunk(
  "removeInteraction",
  async ({ postId, token }, thunkAPI) => {
    try {
      await axios.delete(backendUrl + `/posts/${postId}/dislike`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    posts: null,
    singlePost: null,
    postSaved: false,
  },

  reducers: {
    resetPostSaved: (state) => {
      state.postSaved = false;
    },
  },
  extraReducers: (builder) => {
    //#region Fetch Posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    //#endregion

    //#region Create Post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createPost.fulfilled, (state) => {
      // TODO: append new post to old posts
      state.loading = false;
      state.postSaved = true;
    });

    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      console.log("CREATE POST ERROR");
      console.log(action.payload);
    });
    //#endregion

    //#region Update Post
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updatePost.fulfilled, (state) => {
      state.loading = false;
      state.postSaved = true;
    });

    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      console.log("UPDATE POST ERROR");
      console.log(action.payload);
    });
    //#endregion

    //#region Fetch Single Post
    builder.addCase(fetchSinglePost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.singlePost = action.payload;
    });

    builder.addCase(fetchSinglePost.rejected, (state, action) => {
      state.loading = false;
      console.log("FETCH SINGLE POST ERROR");
      console.log(action.payload);
    });
    //#endregion

    //#region Delete Post
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      console.log("DELETE POST ERROR");
      console.log(action.payload);
    });
    //#endregion

    //#region Interactions
    builder.addCase(addInteraction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeInteraction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addInteraction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(removeInteraction.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(addInteraction.rejected, (state, action) => {
      console.log("ADD INTERACTION ERROR");
      console.log(action.payload);
      state.loading = false;
    });
    builder.addCase(removeInteraction.rejected, (state, action) => {
      console.log("REMOVE INTERACTION ERROR");
      console.log(action.payload);
      state.loading = false;
    });
    //#endregion
  },
});

export const { resetPostSaved } = postsSlice.actions;

export default postsSlice.reducer;
