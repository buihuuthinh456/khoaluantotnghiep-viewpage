import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sortPrice } from "../../api";

const initialState = {
  isLoading: false,
  searchParam: null,
  data: null,
};

export const sortPriceAsync = createAsyncThunk(
  "sort/sortPriceAsync",
  async (payload) => {
    try {
      const response = await sortPrice(payload);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    defaultData: (state, action) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builders) => {
    builders
      .addCase(sortPriceAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sortPriceAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.products
      })
      .addCase(sortPriceAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const { defaultData } = sortSlice.actions;

export const selectSort = (state) => state.sort;

export default sortSlice.reducer;
