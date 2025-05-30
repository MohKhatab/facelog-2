import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../../backendUrl";

const initialState = {
  token: null,
  isLoggedIn: false,
  userCreated: false,
  loading: false,
  error: null,
  authChecked: false,
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (loginCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        backendUrl + `/auth/login`,
        loginCredentials
      );
      const token = response.data.token;
      const arrayToken = token.split(".");
      const tokenPayload = JSON.parse(atob(arrayToken[1]));

      console.log(tokenPayload);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", tokenPayload.sub);
      localStorage.setItem("firstName", tokenPayload.firstName);
      localStorage.setItem("lastName", tokenPayload.lastName);
      return response.data.token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "createUser",
  async (userData, thunkAPI) => {
    try {
      const user = await axios.post(backendUrl + "/users", userData);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      localStorage.removeItem("userId");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
    resetUserCreated: (state) => {
      state.userCreated = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    markAuthAsChecked: (state) => {
      state.authChecked = true;
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
      state.authChecked = true;
      state.loading = false;
    });

    builder.addCase(tokenIsValid.rejected, (state, action) => {
      state.authChecked = true;
      console.log("AUTH ERROR");
      console.error(action.payload);
      state.loading = false;
    });

    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = false;
      state.userCreated = true;
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      console.log("fired");
      console.log("CREATE USER ERROR");
      console.log(action.payload);
      state.error = action.payload;
    });
  },
});

export const { logout, resetUserCreated, clearAuthError, markAuthAsChecked } =
  authSlice.actions;

export default authSlice.reducer;
