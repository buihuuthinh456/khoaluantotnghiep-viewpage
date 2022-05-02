import React from 'react'

import {
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../pages/Home/Home';
import Details from '../pages/Details/Detail'
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import Cart from '../pages/Cart/Cart';
import Search from '../pages/Search/Search';

function index() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:category' element={<CategoryPage />}></Route>
        <Route path='/detail/:productID' element={<Details />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/search' element={<Search />}></Route>
    </Routes>
  )
}

export default index