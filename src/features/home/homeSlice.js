import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHome } from "../../api";

const initialState = {
  isLoading: false,
  allProduct: null,
  hotProduct: null,
  newProduct: null,
  categories: null,
};

export const getHomeAsync = createAsyncThunk(
  "home/getHomeAsync",
  async () => {
      const response = await fetchHome()
      return response
  }
);

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getHomeAsync.pending, (state, action)=>{
                state.isLoading = true
            })
            .addCase(getHomeAsync.fulfilled, (state, action)=>{
                state = {...action.payload.data,isLoading:false}
                return state
            })
            .addCase(getHomeAsync.rejected, (state, action)=>{
                state.isLoading = false
                console.log(action.payload);
            })
    }
})

export const selectHome = (state) => state.home

export default homeSlice.reducer
