import React, { useEffect } from "react";
import styles from "./home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { selectHome, getHomeAsync } from "../../features/home/homeSlice";
import ProductCard from "../../components/ProductCard";

function Home() {
  const dispatch = useDispatch();
  const homeState = useSelector(selectHome);
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
      <div className={styles.allProduct}>
        <div className={styles.title}>
          <h3>All Products</h3>
        </div>
        <ul className={styles.productList}>
          {homeState.allProduct &&
            homeState.allProduct.map((item) => (
              <ProductCard
                id={item._id}
                img={item.images[0].url}
                name={item.name}
                price={item.price}
                link={`/detail/${item._id}`}
                imgKey = {item.images[0].public_id}
              />
            ))}
        </ul>
      </div>

      <div className={styles.hotProducts}>
        <div className={styles.title}>
          <h3>Hot Products</h3>
        </div>
        <ul className={styles.productList}>
          {homeState.hotProduct &&
            homeState.hotProduct.map((item) => (
              <ProductCard
                id={item._id}
                img={item.images[0].url}
                name={item.name}
                price={item.price}
                link={`/detail/${item._id}`}
                imgKey = {item.images[0].public_id}
              />
            ))}
        </ul>
      </div>

      <div className={styles.newProducts}>
        <div className={styles.title}>
          <h3>New Products</h3>
        </div>
        <ul className={styles.productList}>
          {homeState.newProduct &&
            homeState.newProduct.map((item) => (
              <ProductCard
                id={item._id}
                img={item.images[0].url}
                name={item.name}
                price={item.price}
                link={`/detail/${item._id}`}
                imgKey = {item.images[0].public_id}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
