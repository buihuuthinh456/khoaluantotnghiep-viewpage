import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLoginUser, getUserInfo } from "../../api";

import { toast } from "react-toastify";

const initialState = {
  accessToken: "",
  isLogin: false,
  info: {},
  cart: [],
  cartTotalItem: 0,
};

// redux thunk for login
export const handleLoginAsync = createAsyncThunk(
  "login/handleLoginAsync",
  async (payload) => {
    try {
      const response = await toast.promise(
        handleLoginUser(payload),
        {
          pending: "Login is handling",
          success: "Login successfull 👌",
          error: "Login error 🤯",
        },
        {
          style: { fontSize: "1.6rem" },
        }
      );

      return response;
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
  }
);

// redux thunk for user information

export const getUserInfoAsync = createAsyncThunk(
  "login/getUserInfo",
  async () => {
    try {
      const response = await getUserInfo();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("accessToken");
      return (state = initialState);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(handleLoginAsync.fulfilled, (state, action) => {
      const { accessToken, ...info } = action.payload.data;
      localStorage.setItem("accessToken", accessToken);
      state.accessToken = accessToken;
      state.isLogin = true;
      state.info = { ...info };
    });

    builder.addCase(getUserInfoAsync.fulfilled, (state, action) => {
      if (action.payload.data?.errorExpiredAt) {
        localStorage.removeItem("accessToken");
        return (state = initialState);
      } else {
        const { accessToken, isAdmin, ...info } = action.payload;
        state.accessToken = localStorage.getItem("accessToken");
        state.isLogin = true;
        state.info = { ...info };
        state.cart = state.info.cart;
        state.isAdmin = isAdmin;
      }
    });
  },
});

export const {
  logOut,
  addToCart,
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
} = loginSlice.actions;

export const { getCart } = loginSlice.actions

export const selectLogin = (state) => state.login;

export default loginSlice.reducer;
