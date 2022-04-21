import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/home/homeSlice'
import categoryReducer from '../features/category/categorySlice'
import categoryPageReducer from '../features/categoryPage/categoryPageSlice'
import loginReducer from '../features/login/loginSlice'
import modalReducer from '../features/modal/modalSlice';
import detailProductReducer from '../features/detailProduct/detailProductSlice';

 
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    category: categoryReducer,
    categoryPage: categoryPageReducer,
    login: loginReducer,
    modal: modalReducer,
    detailProduct: detailProductReducer,
  },
});
