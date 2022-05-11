import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/home/homeSlice'
import categoryReducer from '../features/category/categorySlice'
import categoryPageReducer from '../features/categoryPage/categoryPageSlice'
import loginReducer from '../features/login/loginSlice'
import modalReducer from '../features/modal/modalSlice';
import detailProductReducer from '../features/detailProduct/detailProductSlice';
import cartReducer from '../features/cart/cartSlice'
import searchReducer from '../features/search/searchSlice'
import commentsReducer from '../features/comments/commentsSlice'
import paymentReducer from '../features/payment/paymentSlice'
import voteReducer from '../features/vote/voteSlice'

 
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    category: categoryReducer,
    categoryPage: categoryPageReducer,
    login: loginReducer,
    modal: modalReducer,
    detailProduct: detailProductReducer,
    cart: cartReducer,
    search: searchReducer,
    comments: commentsReducer,
    payment: paymentReducer,
    vote: voteReducer,
  },
});
