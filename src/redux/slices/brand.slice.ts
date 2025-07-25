import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Brand, brandPayload } from '../../interfaces/brand.interface';
import api from '../api';
import {
  createBrandResponseSchema,
  createBrandSchema,
  getBrandsResponseSchema,
  getOneBrandResponseSchema,
  updateBrandResponseSchema,
  updateBrandSchema,
} from '../validators/brand.validator';

interface BrandState {
  brands: Brand[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  fullBrand: Brand | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loading: boolean;
}

export const getBrands = createAsyncThunk('brand/getBrands', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/brand');

    const parsed = getBrandsResponseSchema.safeParse(data);

    if (!parsed.success) {
      return rejectWithValue(parsed.error.flatten());
    }

    return parsed.data;
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
  async (payload: brandPayload, { rejectWithValue }) => {
    const validated = createBrandSchema.safeParse(payload);

    if (!validated.success) {
      return rejectWithValue(validated.error.flatten());
    }

    try {
      const { data } = await api.post('/brand', validated.data);

      const parsedData = createBrandResponseSchema.safeParse(data);

      if (!parsedData.success) {
        return rejectWithValue(parsedData.error.flatten());
      }

      return parsedData.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Failed to create brand');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async (payload: { id: string; brand: brandPayload }, { rejectWithValue }) => {
    const validated = updateBrandSchema.safeParse(payload.brand);

    if (!validated.success) {
      return rejectWithValue(validated.error.flatten());
    }

    try {
      const { data } = await api.patch(`/brand/${payload.id}`, validated.data);

      const parsedData = updateBrandResponseSchema.safeParse(data);

      if (!parsedData.success) {
        return rejectWithValue(parsedData.error.flatten());
      }

      return parsedData.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Failed to update brand');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const deleteBrand = createAsyncThunk(
  'brand/deleteBrand',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await api.delete(`/brand/${id}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Failed to delete brand');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const getOneBrand = createAsyncThunk(
  'brand/getOneBrand',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/brand/${id}`);
      const parsed = getOneBrandResponseSchema.safeParse(data);

      if (!parsed.success) {
        return rejectWithValue(parsed.error.flatten());
      }

      return parsed.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Failed to fetch brand');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

const initialState: BrandState = {
  brands: [],
  pagination: null,
  fullBrand: null,
  status: 'idle',
  error: null,
  loading: false,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.brands = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(createBrand.pending, (state) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBrand.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.brands.push(action.payload.brand);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createBrand.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(updateBrand.pending, (state) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const updatedBrand = action.payload;
      const brandIndex = state.brands.findIndex((brand) => brand._id === updatedBrand.brand._id);
      if (brandIndex !== -1) {
        state.brands[brandIndex] = updatedBrand.brand;
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateBrand.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(deleteBrand.pending, (state) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(getOneBrand.pending, (state) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOneBrand.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.fullBrand = action.payload.brand;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOneBrand.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export const brandReducer = brandSlice.reducer;
