import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pagination } from "../../api";
 
const initialState = {
  isLoading: false,
  searchParam: null,
  data: null,
};

export const paginationAsync = createAsyncThunk(
  "sort/sortPriceAsync",
  async (payload) => {
    try {
      const response = await pagination(payload);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {

  },

  extraReducers: (builders) => {
    builders
      .addCase(paginationAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(paginationAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.data.products
      })
      .addCase(paginationAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const selectPagination = (state) => state.pagination;

export default paginationSlice.reducer;
