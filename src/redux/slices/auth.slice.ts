import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import z from 'zod';
import { SignInPayload, SignUpPayload } from '../../interfaces/auth.interface';
import { User } from '../../interfaces/user.interface';
import api from '../api';
import {
  signInResponseSchema,
  signInSchema,
  signUpResponseSchema,
  signUpSchema,
} from '../validators/auth.validator';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  status: 'idle',
  error: null,
  loading: false,
};

export const signUp = createAsyncThunk(
  'notifications/signUp',

  async (payload: SignUpPayload, { rejectWithValue }) => {
    const validated = signUpSchema.safeParse(payload);

    if (!validated.success) {
      const treeified = z.treeifyError(validated.error);
      return rejectWithValue(treeified.errors);
    }

    try {
      const { data } = await api.post(`/auth/sign-up`, validated.data);

      const parsed = signUpResponseSchema.safeParse(data);

      if (!parsed.success) {
        const treeified = z.treeifyError(parsed.error);
        return rejectWithValue(treeified.errors);
      }

      return parsed.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Failed to sign up');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',

  async (payload: SignInPayload, { rejectWithValue }) => {
    const validated = signInSchema.safeParse(payload);

    if (!validated.success) {
      const treeified = z.treeifyError(validated.error);
      return rejectWithValue(treeified.errors);
    }

    try {
      const { data } = await api.post(`/auth/sign-in`, validated.data);

      const parsed = signInResponseSchema.safeParse(data);

      if (!parsed.success) {
        const treeified = z.treeifyError(parsed.error);
        return rejectWithValue(treeified.errors);
      }

      return parsed.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Failed to sign in');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/auth/sign-out`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data || 'Failed to sign out');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/auth/me`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data || 'Failed to get me');
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
      .addCase(getMe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuth = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const authReducer = authSlice.reducer;
