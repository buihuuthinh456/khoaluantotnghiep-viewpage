import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getDetailProduct,
  viewsProduct,
  voting,
} from "../../api";

const initialState = {
  isLoading: false,
  data: null,
  voteMsg: null,
  voting: null
};

// get single products INFO
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

// Increase views of products
export const viewsProductAsync = createAsyncThunk(
  "detailProduct/viewsProductAsync",
  async (id) => {
    try {
      if (localStorage.getItem("accessToken")) {
        const token = localStorage.getItem("accessToken");
        const response = await viewsProduct(id, token);
        return response;
      }
    } catch (error) {
      console.log(error.response);
    }
  }
);

// voting products
export const voteAsync = createAsyncThunk(
  "detailProduct/voteAsync",
  async (payload) => {
    try {
        if (localStorage.getItem('accessToken')) {
            const token = localStorage.getItem('accessToken')
            const {productID, score} = payload
            const response = await voting(token, productID, score);
            return response.data
        }
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const detailProductSlice = createSlice({
  name: "detailProduct",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // get single products INFO
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
        state.voting = action.payload.data.votes
      });

    // Increase views of products
    builder.addCase(viewsProductAsync.fulfilled, (state, action) => {
      console.log("viewsProductAsync fulfilled", action.payload);
    });

    // Vote 
    builder.addCase(voteAsync.fulfilled, (state,action)=>{
      console.log('votingdetail Fulfilled', action.payload.data);
      state.voteMsg = action.payload.msg
      state.data = action.payload.data
    })
  },
});

export const selectDetailProduct = (state) => state.detailProduct;

export default detailProductSlice.reducer;
