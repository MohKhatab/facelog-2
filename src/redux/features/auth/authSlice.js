import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../../backendUrl";

const initialState = {
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (loginCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        backendUrl + `/auth/login`,
        loginCredentials
      );

      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const tokenIsValid = createAsyncThunk(
  "tokenIsValid",
  async (token, thunkAPI) => {
    try {
      const response = await axios.post(backendUrl + "/auth/validate", {
        token,
      });

      response.data.isValid
        ? localStorage.setItem("token", token)
        : localStorage.clear("token");
      return { isValid: response.data.isValid, token };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      state.loading = false;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.error = null;
      state.loading = true;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("AUTH ERROR");
      console.error(action.payload);
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(tokenIsValid.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(tokenIsValid.fulfilled, (state, action) => {
      if (action.payload.isValid) {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      } else {
        state.isLoggedIn = false;
        state.token = null;
        state.token = null;
      }

      state.loading = false;
    });

    builder.addCase(tokenIsValid.rejected, (state, action) => {
      console.log("AUTH ERROR");
      console.error(action.payload);
      state.loading = false;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
