import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payment } from "../../api";

const initialState = {
  isLoading: false,
  payURL: null,
};

export const paymentAsync = createAsyncThunk(
  "checkout/paymentAsync",
  async (payload) => {
    try {
      if (localStorage.getItem("accessToken")) {
        const {type, ...data} = payload
        const token = localStorage.getItem("accessToken");
        const response = await payment(type, token, data);
        return response;
      }
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(paymentAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(paymentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payURL = action.payload.data.payUrl
      })
      .addCase(paymentAsync.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const selectPayment = (state) => state.payment;

export default paymentSlice.reducer;
