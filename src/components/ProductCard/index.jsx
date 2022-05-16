import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import styles from "./ProductCard.module.scss";

import CurrencyFormat from "../../functionJS";

function ProductCard({ id, img, name, price, link = `/detail/${id}` }, imgKey) {
  return (
    <li key={id} className={styles.productItem}>
      <Link to={link} style={{ textDecoration: "none" }}>
        <div className={styles.imageWrapper}>
          <img key={imgKey} src={img} alt="product" />
          <div className={styles.productController}>
            <div className={styles.productIcon}>
              <ManageAccountsIcon style={{ fontSize: "2rem", color: "#333" }} />
            </div>
            <div className={styles.productIcon}>
              <AddShoppingCartRoundedIcon
                style={{ fontSize: "2rem", color: "#333" }}
              />
            </div>
          </div>
        </div>
      </Link>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <div className={styles.productPrice}>{CurrencyFormat(price)}</div>
      </div>
    </li>
  );
}

export default ProductCard;
