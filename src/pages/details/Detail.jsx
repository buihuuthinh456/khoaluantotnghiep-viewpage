import React, { useEffect, useState } from "react";
import styles from "./detail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDetailProduct,
  fetchDetailProduct,
} from "../../features/detailProduct/detailProductSlice";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function CategoryPage() {
  const { productID } = useParams();
  console.log(productID);

  const [amount, setAmount] = useState(1)

  const dispatch = useDispatch();

  const detailProduct = useSelector(selectDetailProduct).data;
  const isLoading = useSelector(selectDetailProduct).isLoading;

  useEffect(() => {
    dispatch(fetchDetailProduct(productID));
  }, [productID]);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className={styles.container} key={detailProduct._id}>
            <div className={styles.imageWrapper}>
              <img src={detailProduct.images[0].url} key={detailProduct.images[0].public_id} alt="product" />
            </div>
            <div className={styles.productInfo}>
              <h1 className={styles.title}>{detailProduct.name}</h1>
              <div className={styles.price}>
                <span>{`$ ${detailProduct.price}`}</span>
              </div>
              <div className={styles.desc}>
                <h2>Description</h2>
                <span>
                  {detailProduct.description}
                </span>
              </div>

              <div className={styles.productController}>
                <div className={styles.quantity}>
                  <div className={styles.removeButton}>
                    <Button variant="outlined" size="large" onClick={()=>setAmount(state => state - 1)}>
                      <RemoveIcon />
                    </Button>
                  </div>

                  <div className={styles.amount}>{amount}</div>

                  <div className={styles.addButton}>
                    <Button variant="outlined" size="large" onClick={()=>setAmount(state => state + 1)}>
                      <AddIcon />
                    </Button>
                  </div>
                </div>

                <div className={styles.buttonAdd}>
                  <Button variant="contained">Add to cart</Button>
                </div>
              </div>
            </div>
          </div>
  );
}

export default CategoryPage;
