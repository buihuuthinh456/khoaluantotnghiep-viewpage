import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payment } from "../../api";

import { toast } from "react-toastify";

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

        const response = await toast.promise(
          payment(type, token, data),
          {
            pending: "Tiến hành gửi thông tin",
            success: "Gửi thành công",
            error: "Có Lỗi 🤯",
          },
          {
            style: { fontSize: "1.6rem" },
          }
        );
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
        console.log('paymentSlice fullfiled', action.payload)
        state.isLoading = false;
        state.payURL = action.payload.data.payUrl || action.payload.data.payment_Url
      })
      .addCase(paymentAsync.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const selectPayment = (state) => state.payment;

export default paymentSlice.reducer;
