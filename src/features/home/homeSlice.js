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
                // state.isLoading = false
                // const {allProduct,hotProduct,newProduct,categories} = action.payload.data;

                // state.allProduct = allProduct
                // state.hotProduct = hotProduct
                // state.newProduct = newProduct
                // state.categories = categories

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
