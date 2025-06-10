import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backendUrl from "../../backendUrl";
import axios from "axios";

export const fetchComments = createAsyncThunk(
  "fetchComments",
  async (postId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${backendUrl}/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "addComment",
  async ({ postId, content }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/posts/${postId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    loading: false,
    comments: null,
    commentSaved: false,
  },
  reducers: {
    resetCommentSaved: (state) => {
      state.commentSaved = false;
    },
  },
  extraReducers: (builder) => {
    //#region Fetch Comments
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      console.log("fetch comments");
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      console.log("FETCH COMMENTS ERROR");
      console.log(action.payload);
    });
    //#endregion

    //#region Create Comment
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.loading = false;
      console.log("fetch comments");
    });

    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      console.log("CREATE COMMENT ERROR");
      console.log(action.payload);
    });
    //#endregion

    //#region Edit Comment
    //#endregion

    //#region Delete Comment
    //#endregion
  },
});

export const { resetCommentSaved } = commentsSlice.actions;

export default commentsSlice.reducer;
