import { createSlice } from '@reduxjs/toolkit';

export const fetchBrands = createAsyncThunk('brand/fetchBrands', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/brand');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data || 'Failed to fetch brands');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/brand', payload);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Failed to create brand');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

const initialState = {
  brands: [],
  status: 'idle',
  error: null,
  loading: false,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const brandReducer = brandSlice.reducer;
