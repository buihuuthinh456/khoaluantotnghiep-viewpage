import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/home/homeSlice'
import categoryReducer from '../features/category/categorySlice'
import categoryPageReducer from '../features/categoryPage/categoryPageSlice'
 
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    category: categoryReducer,
    categoryPage: categoryPageReducer,
  },
});
