import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../services/userService";

// Async Thunks

/**
 * Thunk to log in a user.
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await userService.login(email, password);
      return data.access_token;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to register a new user.
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ firstName, lastName, mail, passkey }, { rejectWithValue }) => {
    try {
      await userService.register({ firstName, lastName, mail, passkey });
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to fetch the current user's profile.
 */
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await userService.getCurrentUser(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to change the user's password.
 */
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await userService.changePassword(token, {
        oldPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  passwordChangeStatus: "idle", // idle, loading, succeeded, failed
  passwordChangeError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.passwordChangeStatus = "idle";
      state.passwordChangeError = null;
    },
    resetPasswordChangeStatus: (state) => {
      state.passwordChangeStatus = "idle";
      state.passwordChangeError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.passwordChangeStatus = "loading";
        state.passwordChangeError = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordChangeStatus = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordChangeStatus = "failed";
        state.passwordChangeError = action.payload;
      });
  },
});

export const { logout, resetPasswordChangeStatus } = authSlice.actions;

export default authSlice.reducer;
