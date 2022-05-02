import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItemCart, getUserInfo, deleteItemCart } from '../../api'
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  cartItem: [],
  cartTotalItem: 0,
};

export const getCartAsync = createAsyncThunk('cart/getCartAsync', async()=>{
  try {
    const response = await(getUserInfo())
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg, {
      position: toast.POSITION.TOP_RIGHT,
      style: { fontSize: "1.6rem" },
    });
  }
})

export const addItemCartAsync = createAsyncThunk('cart/addItemCartAsync', async(payload)=>{
  try {
    if (localStorage.getItem('accessToken')) {
        const token = localStorage.getItem('accessToken')
        const response = await toast.promise(
          addItemCart(payload, token),
          {
            pending: "addItem is handling",
            success: "addItem successfull 👌",
            error: "addItem error 🤯",
          },
          {
            style: { fontSize: "1.6rem" },
          }
        );
        return response
    }
  } catch (error) {
    console.log(error.response)
    toast.error(error.response.data.msg, {
      position: toast.POSITION.TOP_RIGHT,
      style: { fontSize: "1.6rem" },
    });
  }
})

export const deleteItemCartAsync = createAsyncThunk('cart/deleteItemCartAsync', async(payload)=>{
  try {
    if (localStorage.getItem('accessToken')) {
        const token = localStorage.getItem('accessToken')
        const dataPost = {
          "productId": payload
        }
        const response = await toast.promise(
          deleteItemCart(dataPost, token),
          {
            pending: "delete is handling",
            success: "delete successfull 👌",
            error: "delete error 🤯",
          },
          {
            style: { fontSize: "1.6rem" },
          }
        );
        return response
    }
  } catch (error) {
    console.log(error.response)
    toast.error(error.response.data.msg, {
      position: toast.POSITION.TOP_RIGHT,
      style: { fontSize: "1.6rem" },
    });
  }
})

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    increaseQuantity: (state, action) => {
      const index = state.cartItem.findIndex(item=>item._id === action.payload._id)
      state.cartItem[index].quantity +=1
    },

    decreaseQuantity: (state, action) => {
      const index = state.cartItem.findIndex(item=>item._id === action.payload._id)
      state.cartItem[index].quantity -=1
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getCartAsync.pending, (state,action)=>{
      state.isLoading = true
    }).addCase(getCartAsync.fulfilled, (state,action)=>{
      state.isLoading = false
      state.cartItem = action.payload.cart
      state.cartTotalItem = action.payload.cart.length
    })

    builder.addCase(addItemCartAsync.fulfilled, (state,action)=>{
      console.log('addItemCartAsync', action.payload);
      const {cart} = action.payload.data
      state.cartItem = cart
      state.cartTotalItem = cart.length
    })

    builder.addCase(deleteItemCartAsync.fulfilled, (state,action)=>{
      const {cart} = action.payload.data
      state.cartItem = cart
      state.cartTotalItem = cart.length
    })
  }
});

export const {increaseQuantity, decreaseQuantity} = cartSlice.actions

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
