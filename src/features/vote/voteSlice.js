import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { voting } from "../../api";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  msg: null,
};

// voting

export const voteAsync = createAsyncThunk(
  "vote/voteAsync",
  async (payload) => {
    try {
        if (localStorage.getItem('accessToken')) {
            const token = localStorage.getItem('accessToken')
            const {productID, ...data} = payload
            const response = await voting(token, productID, data);
            return response
        }
    } catch (error) {
      console.log(error.response);
    }
  }
);

// slice

export const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(voteAsync.fulfilled, (state, action) => {
        state.msg = action.payload.data.msg
      })
      .addCase(voteAsync.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const selectVoting = (state) => state.vote

export default voteSlice.reducer
