import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "../../api";

const initialState = {
  isLoading: false,
  categories: null,
};

export const getCategoriesAsync = createAsyncThunk(
  "category/getCategoriesAsync",
  async () => {
      const response = await fetchCategories()
      return response
  }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesAsync.pending, (state, action)=>{
                state.isLoading = true
            })
            .addCase(getCategoriesAsync.fulfilled, (state, action)=>{
                state.isLoading = false
                state.categories = action.payload.data
                // const {allProduct,hotProduct,newProduct,categories} = action.payload.data;

                // state.allProduct = allProduct
                // state.hotProduct = hotProduct
                // state.newProduct = newProduct
                // state.categories = categories
            })
            .addCase(getCategoriesAsync.rejected, (state, action)=>{
                state.isLoading = false
                console.log(action.payload);
            })
    }
})

export const selectCategory = (state) => state.category

export default categorySlice.reducer
