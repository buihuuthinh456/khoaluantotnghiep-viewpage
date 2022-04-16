import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSpecificProduct } from "../../api";

const initialState = {
  isLoading: false,
  result: null,
  products:null,
  totalPage:null,
};

export const categoryPageAsync = createAsyncThunk(
  "categoryPage/categoryPageAsync",
  async (category) => {
      const response = await fetchSpecificProduct(category)
      return response
  }
);

export const categoryPageSlice = createSlice({
    name: 'categoryPage',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(categoryPageAsync.pending, (state, action)=>{
                state.isLoading = true
            })
            .addCase(categoryPageAsync.fulfilled, (state, action)=>{
                state = {...action.payload.data,isLoading:false}
                return state
            })
            .addCase(categoryPageAsync.rejected, (state, action)=>{
                state.isLoading = false
            })
    }
})

export const selectCategoryPage = (state) => state.categoryPage

export default categoryPageSlice.reducer
