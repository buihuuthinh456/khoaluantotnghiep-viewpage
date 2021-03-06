import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHome, imgSlider, postDataAnalysis } from "../../api";

const initialState = {
  isLoading: false,
  allProduct: null,
  hotProduct: null,
  newProduct: null,
  categories: null,
  imgSlider: null,
};

export const getHomeAsync = createAsyncThunk("home/getHomeAsync", async () => {
  const response = await fetchHome();
  return response;
});

export const getTopicImgAsync = createAsyncThunk(
  "home/getTopicImgAsync",
  async (userId) => {
    try {
        const token = localStorage.getItem("accessToken")||"";
        const response = await Promise.all([imgSlider(token), postDataAnalysis(userId)])
        // const response = await imgSlider(token)
        console.log("response",response)
        return response[0];
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getHomeAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getHomeAsync.fulfilled, (state, action) => {
        state = { ...action.payload.data, isLoading: false };
        return state;
      })
      .addCase(getHomeAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });

    builder
      .addCase(getTopicImgAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTopicImgAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("getTopicImgAsync fulfilled", action.payload);
        state.imgSlider = action.payload.data
      })
      .addCase(getTopicImgAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const selectHome = (state) => state.home;

export default homeSlice.reducer;
