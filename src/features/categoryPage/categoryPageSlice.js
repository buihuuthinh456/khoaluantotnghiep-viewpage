import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSpecificProduct, pagination, sortPrice } from "../../api";

const initialState = {
  isLoading: false,
  result: null,
  products: null,
  totalPage: null,
};

// fetch data
export const categoryPageAsync = createAsyncThunk(
  "categoryPage/categoryPageAsync",
  async (category) => {
    const response = await fetchSpecificProduct(category);
    return response;
  }
);

// pagination
export const paginationAsync = createAsyncThunk(
  "categoryPage/paginationAsync",
  async (payload) => {
    try {
      const response = await pagination(payload);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const sortPriceAsync = createAsyncThunk(
  "categoryPage/sortPriceAsync",
  async (payload) => {
    try {
      const response = await sortPrice(payload);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const categoryPageSlice = createSlice({
  name: "categoryPage",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    // get category product
    builder
      .addCase(categoryPageAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(categoryPageAsync.fulfilled, (state, action) => {
        console.log("categoryPageAsync fullfilled", action.payload);
        state = { ...action.payload.data, isLoading: false };
        return state;
      })
      .addCase(categoryPageAsync.rejected, (state, action) => {
        state.isLoading = false;
      });

    // pagination
    builder
      .addCase(paginationAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(paginationAsync.fulfilled, (state, action) => {
        console.log("pagination fulfilled", action.payload);
        state.isLoading = false;
        state.result = action.payload.result;
        state.products = action.payload.products;
      })
      .addCase(paginationAsync.rejected, (state, action) => {
        state.isLoading = false;
      });

    // sort
    builder
      .addCase(sortPriceAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sortPriceAsync.fulfilled, (state, action) => {
        console.log("sort fulfilled", action.payload);
        state.isLoading = false;
        state.result = action.payload.result;
        state.products = action.payload.products;
      })
      .addCase(sortPriceAsync.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const selectCategoryPage = (state) => state.categoryPage;

export default categoryPageSlice.reducer;
