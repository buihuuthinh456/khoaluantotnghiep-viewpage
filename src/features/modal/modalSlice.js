import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openLogin: false,
  openRegister: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.openLogin = true;
    },
    closeLoginModal: (state) => {
      state.openLogin = false;
    },
    openRegisterModal: (state) => {
      state.openRegister = true;
    },
    closeRegisterModal: (state) => {
      state.openRegister = false;
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
