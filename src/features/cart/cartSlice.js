import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItemCart, getUserInfo, deleteItemCart,newCart, getDetailProduct } from '../../api'
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  cartItem: [],
  cartTotalItem: 0,
  cartTotalMoney: 0,
};

export const getCartAsync = createAsyncThunk('cart/getCartAsync', async()=>{
  try {
    const response = await(getUserInfo())
    return response.data;
  } catch (error) {
    localStorage.removeItem("accessToken")
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
            pending: "Hệ thống đang xử lý",
            success: "Thêm vào giỏ hàng thành công👌",
            error: "Đã xảy ra lỗi🤯",
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

export const addOneItemCartAsync = createAsyncThunk('cart/addOneItemCartAsync', async(payload)=>{
  try {
    if (localStorage.getItem('accessToken')) {
        const token = localStorage.getItem('accessToken')
        console.log(payload)
        const product = await toast.promise(
          getDetailProduct(payload._id),
          {pending:"Vui lòng đợi trong giây lát"},
          {
            style: { fontSize: "1.6rem" },
          }
        )
        const item = {
          ...product.data,...payload
        }
        if(product.status===200){
          const response = await toast.promise(
            addItemCart(item, token),
            {
              pending: "Hệ thống đang xử lý",
              success: "Thêm sản phẩm thành công 👌",
              error: "Đã xảy ra lỗi, vui lòng thử lại 🤯",
            },
            {
              style: { fontSize: "1.6rem" },
            }
          );
          return response
        }
        return product
    }
    else{
      toast.error("Vui lòng đăng nhập để mua hàng", {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
  } catch (error) {
    console.log(error.response)
    toast.error(error.response.data.msg, {
      position: toast.POSITION.TOP_RIGHT,
      style: { fontSize: "1.6rem" },
    });
  }
})

export const newCartAsync = createAsyncThunk('cart/newCartAsync', async(payload)=>{
  try {
    if (localStorage.getItem('accessToken')) {
        const token = localStorage.getItem('accessToken')
        const response = await toast.promise(
          newCart(payload, token),
          {
            pending: "Hệ thống đang xử lý",
            success: "Giỏ hàng cập nhật thành công👌",
            error: "Đã xảy ra lỗi, vui lòng kiểm tra lại 🤯",
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
            success: "Đã xóa khỏi giỏ hàng",
            error: "Xóa thất bại",  
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
    setEmptyCart: (state, action) => {
      return initialState
    },
    increaseQuantity: (state, action) => {
      const index = state.cartItem.findIndex(item=>item._id === action.payload._id)
      state.cartItem[index].quantity +=1
      state.cartItem[index].totalMoney= state.cartItem[index].price * state.cartItem[index].quantity
    },

    decreaseQuantity: (state, action) => {
      const index = state.cartItem.findIndex(item=>item._id === action.payload._id)
      state.cartItem[index].quantity -=1
      state.cartItem[index].totalMoney= state.cartItem[index].price * state.cartItem[index].quantity
    },

    productTotalMoney: (state) => {
      state.cartTotalMoney = state.cartItem.reduce((acc, cur)=>{
        return acc + cur.totalMoney
      }, 0)
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

    builder.addCase(addOneItemCartAsync.fulfilled, (state,action)=>{
      console.log('addOneItemCartAsync', action.payload);
      const {cart} = action.payload.data
      state.cartItem = cart
      state.cartTotalItem = cart.length
    })

    builder.addCase(newCartAsync.fulfilled, (state,action)=>{
      console.log('newCartAsync', action.payload);
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

export const {increaseQuantity, decreaseQuantity, productTotalMoney,setEmptyCart} = cartSlice.actions

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
