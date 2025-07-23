import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../req';
import { signUpSchema } from '../validators/auth.validator';

const initialState = {
  user: null,
  isAuth: false,
  status: 'idle',
  error: null,
  loading: false,
};

export const signUp = createAsyncThunk(
  'notifications/signUp',
  async (payload, { rejectWithValue }) => {
    const validatePayload = signUpSchema.safeParse(payload);
    if (!validatePayload.success) {
      return rejectWithValue(validatePayload.error.errors);
    }
    try {
      const { data } = await axios.post(`/auth/sign-up`, validatePayload.data);

      const validateData = signUpResponseSchema.safeParse(data);
      if (!validateData.success) {
        return rejectWithValue(validateData.error.errors);
      }
      return validateData.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Failed to sign up');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const signIn = createAsyncThunk('auth/signIn', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/auth/sign-in`, payload);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data || 'Failed to sign in');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/auth/sign-out`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data || 'Failed to sign out');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuth = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuth = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(signOut.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.isAuth = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
