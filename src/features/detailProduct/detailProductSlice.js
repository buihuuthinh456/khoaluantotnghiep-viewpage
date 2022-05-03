import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getDetailProduct, viewsProduct } from "../../api";

const initialState = {
  isLoading: false,
  data: null,
};

export const fetchDetailProduct = createAsyncThunk(
  "detailProduct/fetchDetailProduct",
  async (id) => {
    try {
      const response = await getDetailProduct(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const viewsProductAsync = createAsyncThunk('detailProduct/viewsProductAsync', async(id) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken')
      const response = await viewsProduct(id, token);
      return response;
    }
  } catch (error) {
    console.log(error.response);
  }
})

export const detailProductSlice = createSlice({
  name: "detailProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const data = action.payload.data;
          state.data = { ...data };
        }
        state.isLoading = false;
      });
    
    builder.addCase(viewsProductAsync.fulfilled, (state,action) => {
      console.log('viewsProductAsync fulfilled', action.payload);
    })
  },
});

export const selectDetailProduct = (state) => state.detailProduct;

export default detailProductSlice.reducer;
