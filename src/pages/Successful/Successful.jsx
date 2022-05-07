import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {Base64} from 'js-base64'

function Sucessful() {

  const [data, setData] = useState({})
  useEffect(() => {
    const searchURL = window.location.search;
    const params = new URLSearchParams(searchURL);
    let paramObj = {};
    for (var value of params.keys()) {
      paramObj[value] = params.get(value);
    }
    const extraData = JSON.parse(Base64.decode(paramObj.extraData))
    
    setData({...paramObj, extraData})
  }, []);

  console.log('success', data);
  return (
    <div>
      Sucessful
      <Link to="/">Về trang chủ</Link>
    </div>
  );
}

export default Sucessful;
