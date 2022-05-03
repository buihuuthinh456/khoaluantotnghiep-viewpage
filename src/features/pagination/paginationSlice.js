import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pagination } from "../../api";
 
const initialState = {
  isLoading: false,
  searchParam: null,
  data: null,
  dataSort: null,
};

export const paginationAsync = createAsyncThunk(
  "pagination/paginationAsync",
  async (payload) => {
    try {
      const response = await pagination(payload);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

// export const sortAsync = createAsyncThunk("pagination/sortAsync", async(payload) => {

// })

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    sort: (state,action) => {
      state.isLoading = true
      const sortParam = action.payload
      if (sortParam === "price") {
        state.dataSort = state.data.slice().sort((a, b) => a.price - b.price);
      } else if (sortParam === "-price") {
        state.dataSort = state.data.slice().sort((a, b) => b.price - a.price);
      } else {
        state.dataSort = state.data
      }
      state.isLoading = false
    }
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

export const {sort} = paginationSlice.actions

export const selectPagination = (state) => state.pagination;

export default paginationSlice.reducer;
