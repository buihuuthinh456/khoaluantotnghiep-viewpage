import axios from "axios";

const URL = "https://khoaluantotnghiep-ecommerce.herokuapp.com";

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
