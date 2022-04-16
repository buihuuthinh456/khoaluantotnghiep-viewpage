import React from 'react'

import {
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../pages/Home/Home';
import Details from '../pages/details/Detail'


function index() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:category' element={<Details />}></Route>
    </Routes>
  )
}

export default index