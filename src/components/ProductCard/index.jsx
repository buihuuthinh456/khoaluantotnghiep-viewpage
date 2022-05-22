import React from "react";
import { Link, useParams, useSearchParams,useNavigate } from "react-router-dom";
import {selectCart,addItemCartAsync} from '../../features/cart/cartSlice'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded'
import styles from "./ProductCard.module.scss";

import CurrencyFormat from "../../functionJS";

import { Fade, Reveal} from 'react-awesome-reveal';


function ProductCard({ id, img, name, price, link = `/detail/${id}` }, imgKey) {

  const handleAddItemIntoCart = (e) => {
    e.stopPropagation();
    const dataSend = {
      _id:id,
      quantity: 1,
      totalMoney: price,
    };
    console.log(dataSend)
  }
  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate(link)
  }

  return (
    <Reveal
        cascade= {true}
        triggerOnce={true}
        duration={500}
    >
      <li key={id} className={styles.productItem}>
        {/* <Link to={link} style={{ textDecoration: "none" }}> */}
          <div className={styles.imageWrapper} onClick={(e)=>handleNavigate(e)}>
            <img key={imgKey} src={img} alt="product" />
            <div className={styles.productController}>
              <div className={styles.productIcon}  onClick={(e)=>handleNavigate(e)} >
                <RemoveRedEyeIcon style={{ fontSize: "2rem", color: "#333" }} />
              </div>
              <div className={styles.productIcon} onClick={(e)=>handleAddItemIntoCart(e)}>
                <AddShoppingCartRoundedIcon
                  style={{ fontSize: "2rem", color: "#333" }}
                />
              </div>
            </div>
          </div>
        {/* </Link> */}

        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{name}</h3>
          <div className={styles.productPrice}>{CurrencyFormat(price)}</div>
        </div>
      </li>
    </Reveal>
  );
}

export default ProductCard;
