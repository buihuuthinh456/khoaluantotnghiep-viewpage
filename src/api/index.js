import axios from "axios";

const URL = "https://khoaluantotnghiep-ecommerce.herokuapp.com";

export const handleLoginUser = (payload) =>
  axios({
    method: "post",
    url: `${URL}/user/login`,
    data: payload,
  });

  export const getDetailProduct = (id) => axios({
    method: 'get',
    url: `${URL}/api/product/${id}`,
}) 

export const handleRegisterUser = (payload) =>
  axios({
    method: "post",
    url: `${URL}/user/register`,
    data: payload,
  });

export const fetchHome = () =>
  axios({
    method: "get",
    url: `${URL}/`,
  });

export const fetchCategories = () =>
  axios({
    method: "get",
    url: `${URL}/api/category`,
  });

export const fetchSpecificProduct = (category) =>
  axios({
    method: "get",
    url: `${URL}/page/${category}`,
  });
