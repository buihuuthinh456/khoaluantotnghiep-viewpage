import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchProductsWithName } from "../../api";

const initialState = {
  isLoading: false,
  searchParam: null,
  data: null,
  resultTotal: 0
};

export const searchProductsWithNameAsync = createAsyncThunk(
  "search/searchProductsWithNameAsync",
  async (payload) => {
    try {
      const response = await searchProductsWithName(payload);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getParam: (state, action) => {
      state.searchParam = action.payload;
    },
  },

  extraReducers: (builders) => {
    builders
      .addCase(searchProductsWithNameAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchProductsWithNameAsync.fulfilled, (state, action) => {
        console.log('search fullfiled', action.payload);
        state.isLoading = false;
        state.data = action.payload.data.products;
        state.resultTotal = action.payload.data.result;   
      })
      .addCase(searchProductsWithNameAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const { getParam } = searchSlice.actions;

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
