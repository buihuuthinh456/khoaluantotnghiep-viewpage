import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLoginUser } from "../../api";

import { toast } from "react-toastify";

const initialState = {
  accessToken: "",
  isLogin: false,
  info: {},
};

export const handleLoginAsync = createAsyncThunk(
  "login/handleLoginAsync",
  async (payload) => {
    try {
        const response = await toast.promise(handleLoginUser(payload),{
            pending: 'Login is handling',
             success: 'Login successfull 👌',
             error: 'Login error 🤯'
           },{
             style:{fontSize:"1.6rem"}
       });

       return response
    } catch (error) {
        toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            style:{fontSize:"1.6rem"}
        });
    }
  }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      logOut: (state) => {
        return state = initialState
      }
    },

    extraReducers: (builder) => {
        builder.addCase(handleLoginAsync.fulfilled, (state,action) => {
            const {accessToken, ...info} = action.payload.data
            state.accessToken = accessToken
            state.isLogin = true
            state.info = {...info}
        })
    } 
})

export const {logOut} = loginSlice.actions 

export const selectLogin = (state) => state.login;

export default loginSlice.reducer;
