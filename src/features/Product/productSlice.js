import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

// async action
export const getProductList = createAsyncThunk(
  'product/getProductList',
  async (params, thunkAPI) => {
    // thunkAPI.dispatch(): use to dispatch other action
    const response = await productApi.getAll(params);
    return response;
  }
);

const product = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    list: [],
    filter: {
      _page: 1,
      _limit: 15,
    },
    pagination: {
      _page: 1,
      _limit: 15,
      _totalRows: 15,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    });
  },
});

const { reducer: productReducer } = product;
export default productReducer;
