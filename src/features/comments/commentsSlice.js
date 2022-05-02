import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getComment, postComment } from "../../api";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  comments: [],
};

// redux for get Comments

export const getCommentsAsync = createAsyncThunk(
  "comments/getCommentsAsync",
  async (productID) => {
    try {
      const response = await getComment(productID);
      return response.data
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const postCommentAsync = createAsyncThunk(
    "comments/postCommentAsync",
    async (payload) => {
      try {
        if (localStorage.getItem('accessToken')) {
            const token = localStorage.getItem('accessToken')
            const { productId,...rest } = payload
            const response = await toast.promise(
              postComment(productId, token, rest),
              {
                pending: "Comments is handling",
                success: "Comments successfull 👌",
                error: "Comments error 🤯",
              },
              {
                style: { fontSize: "1.6rem" },
              }
            );
            return response;
        }
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          style: { fontSize: "1.6rem" },
        });
      }
    }
  );

// slice

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.comments = action.payload
      })
      .addCase(getCommentsAsync.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder.addCase(postCommentAsync.fulfilled, (state,action)=>{
      state.comments = [...state.comments, action.payload.data]
    })
  },
});

export const selectComments = (state) => state.comments

export default commentsSlice.reducer
