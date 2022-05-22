import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openLogin: false,
  openRegister: false,
  value:null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state,action) => {
      state.value=action.payload
      state.openLogin = true;
    },
    closeLoginModal: (state) => {
      state.openLogin = false;
      state.value = null
    },
    openRegisterModal: (state,action) => {
      console.log(action.payload)
      if(action.payload){
        state.value=action.payload
      }
      state.openRegister = true;
    },
    closeRegisterModal: (state) => {
      state.openRegister = false;
      state.value = null
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openRegisterModal,
  closeRegisterModal,
} = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
