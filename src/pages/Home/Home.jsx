import React, { useEffect } from "react";
import styles from "./home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { selectHome, getHomeAsync } from "../../features/home/homeSlice";
import ProductCard from "../../components/ProductCard";
import { Helmet } from "react-helmet";

import { useNavigate } from "react-router-dom";


import Button from '@mui/material/Button';

function Home() {
  const dispatch = useDispatch();
  const homeState = useSelector(selectHome);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getHomeAsync());
    console.log(homeState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (homeState.isLoading)
    return (
      <div className={styles.loading}>
        <Loading size={100}></Loading>
      </div>
    );
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Home Page TShop IC</title>
        <meta name="description" content="home page Tshop IC" />
      </Helmet>
      <div className={styles.allProduct}>
        <div className={styles.title}>
          <h3>Tất cả sản phẩm</h3>
        </div>
        <ul className={styles.productList}>
          {homeState.allProduct &&
            homeState.allProduct.map((item, index) => (
              <ProductCard
                key={item._id}
                id={item._id}
                img={item.images[0].url}
                name={item.name}
                price={item.price}
                link={`/detail/${item._id}`}
                imgKey={item.images[0].public_id}
              />
            ))}
        </ul>
        <div className={styles.viewMore}>
          <Button
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2, fontSize:"1.3rem" }}
                onClick={()=>navigate("/category/all")}
          >
                Xem tất cả
          </Button>
        </div>
      </div>
      <div className={styles.hotProducts}>
        <div className={styles.title}>
          <h3>Sản phẩm bán chạy</h3>
        </div>
        <ul className={styles.productList}>
          {homeState.hotProduct &&
            homeState.hotProduct.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                img={item.images[0].url}
                name={item.name}
                price={item.price}
                link={`/detail/${item._id}`}
                imgKey={item.images[0].public_id}
              />
            ))}
        </ul>
      </div>
      <div className={styles.newProducts}>
        <div className={styles.title}>
          <h3>Sản phẩm mới</h3>
        </div>
        <ul className={styles.productList}>
          {homeState.newProduct &&
            homeState.newProduct.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                img={item.images[0].url}
                name={item.name}
                price={item.price}
                link={`/detail/${item._id}`}
                imgKey={item.images[0].public_id}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
