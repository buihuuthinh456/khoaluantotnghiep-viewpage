import axios from "axios";

const URL = "https://khoaluantotnghiep-ecommerce.herokuapp.com";
// const URL = "http://localhost:5000"


// Post Data Analysis
export const postDataAnalysis = (payload)=> 
  axios({
    method:"post",
    url:`${URL}`,
    data:{
      userId:payload
    }
  })

export const handleLoginUser = (payload) =>
  axios({
    method: "post",
    url: `${URL}/user/login`,
    data: payload,
  });

export const getDetailProduct = (id) =>
  axios({
    method: "get",
    url: `${URL}/api/product/${id}`,
  });

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

export const fetchSpecificProduct = (category) =>{
  return axios({
    method: "get",
    url: `${URL}/page/${category}`,
  });
}
  

export const searchProductsWithName = (query) => {
  const searchParam = new URLSearchParams(query).toString()

  let queryString='';
  for(let key in query ) {
    console.log(key);
    queryString = queryString + '&' + key + '=' + query[key]
  }

  queryString = queryString.slice(1)
  // console.log('search param api', searchParam);
  return axios({
    method: "get",
    url: `${URL}/api/product`,
    params: query
  });
}

export const sortPrice = (query) => {
  const searchParam = new URLSearchParams(query).toString()
  return axios({
    method: "get",
    url: `${URL}/api/product?${searchParam}`,
  });
}

export const getComment = (productID) => {
  const token = localStorage.getItem('accessToken')
  return axios({
    method: "get",
    url: `${URL}/api/product/${productID}/comment`,
    headers: { Authorization: token }
  })
}

export const postComment = (productID, token, payload) => {
  return axios({
      method: 'post',
      url: `${URL}/api/product/${productID}/comment`,
      headers: { Authorization: token },
      data: payload
  })
}

export const getUserInfo = () => {
  const token = localStorage.getItem('accessToken')
  return axios({
      method: 'get',
      url: `${URL}/user/infor`,
      headers: { "Content-Type": "multipart/form-data", Authorization:token },
  })
}

export const addItemCart = (payload, token) => {
  return axios({
    method: 'put',  
    url: `${URL}/user/cart`,
    headers: { Authorization:token },
    data: payload,
  })
}

export const newCart = (payload, token) => {
  return axios({
    method: 'post',  
    url: `${URL}/user/cart`,
    headers: { Authorization:token },
    data: payload,
  })
}

export const deleteItemCart = (payload, token) => {
  return axios({
    method: 'delete',  
    url: `${URL}/user/cart`,
    headers: { Authorization:token },
    data: payload,
  })
}

export const pagination = (query) => {
  const searchParam = new URLSearchParams(query).toString()
  return axios({
    method: "get",
    url: `${URL}/api/product?${searchParam}`,
  });
}

export const viewsProduct = (productID, token) => {
  return axios({
    method: "put",
    url: `${URL}/api/product/${productID}/views`,
    headers: { Authorization:token },
  })
}

// payment 
export const payment = (type, token, payload) => {
  return axios({
    method: 'post',
    url: `${URL}/api/payment/${type}`,
    headers: { Authorization:token },
    data: payload
  })
}

// voting
export const voting = (token, productID, payload) => {
  console.log('voting api', payload)
  return axios({
    method:'put',
    url: `${URL}/api/product/${productID}/votes`,
    headers: { Authorization:token },
    data: {
      score: payload
    }
  })
}

// ImgSlider

export const imgSlider = (token) => {
  return axios({
    method: 'get',
    url:`${URL}/api/topic-img`,
    headers: { Authorization:token }
  })
}

// Change password

export const changePasswordApi = (token,payload) => {
  return axios({
    method:'put',
    url:`${URL}/user/password`,
    headers:{Authorization:token},
    data:payload
  })
}
// Request Reset Password
export const requestResetPasswordApi = (token,payload) => {
  return axios({
    method:"post",
    url:`${URL}/user/password`,
    headers:{Authorization:token},
    data:payload
  })
}

// Confirm Change password

export const confirmChangePasswordApi = (token,payload,query) => {
  return axios({
    method:"post",
    url:`${URL}/user/resetPassword?${query}`,
    headers:{Authorization:token},
    data:payload
  })
}

