import React, { useEffect, useState } from "react";
import styles from "./detail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDetailProduct,
  fetchDetailProduct,
  viewsProductAsync,
} from "../../features/detailProduct/detailProductSlice";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Loading from "../../components/Loading/Loading";
import Comments from "../../components/Comments/Comments";
import { addItemCartAsync } from '../../features/cart/cartSlice'

function CategoryPage() {
  const { productID } = useParams();
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const detailProduct = useSelector(selectDetailProduct).data;
  const isLoading = useSelector(selectDetailProduct).isLoading;

  // When add product
  const handleAddProduct = () => {
    const totalMoney = detailProduct.price * amount
    console.log('detail', totalMoney);
    const dataSend = {...detailProduct, quantity: amount, totalMoney: totalMoney};
    dispatch(addItemCartAsync(dataSend))
  };

  // lấy giữ liệu
  useEffect(() => {
    dispatch(fetchDetailProduct(productID));
  }, [productID]);

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // viewProduct
  useEffect(() => {
    dispatch(viewsProductAsync(productID))
  }, [productID]);

  if (isLoading)
    return (
      <div className={styles.loading}>
        <Loading size={100} />
      </div>
    );

  return (
    <>
      <div className={styles.back}>
        <Link to={`/`}>Back</Link>
      </div>
      {detailProduct && (
        <div className={styles.container} key={detailProduct._id}>
          <div className={styles.imageWrapper}>
            <img
              src={detailProduct.images[0].url}
              key={detailProduct.images[0].public_id}
              alt="product"
            />
          </div>
          <div className={styles.productInfo}>
            <h1 className={styles.title}>{detailProduct.name}</h1>
            <div className={styles.price}>
              <span>{`$ ${detailProduct.price}`}</span>
            </div>
            <div className={styles.desc}>
              <h2>Description</h2>
              <span>{detailProduct.description}</span>
            </div>

            <div className={styles.productController}>
              <div className={styles.quantity}>
                <div className={styles.removeButton}>
                  <Button
                    variant="outlined"
                    size="large"
                    disabled={amount === 1 ? true : false}
                    onClick={() => setAmount((state) => state - 1)}
                  >
                    <RemoveIcon />
                  </Button>
                </div>

                <div className={styles.amount}>{amount}</div>

                <div className={styles.addButton}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setAmount((state) => state + 1)}
                  >
                    <AddIcon />
                  </Button>
                </div>
              </div>

              <div className={styles.buttonAdd}>
                <Button variant="contained" onClick={handleAddProduct}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.commentSection}>
        <Comments 
          productID = {productID}
        />
      </div>

    </>
  );
}

export default CategoryPage;
