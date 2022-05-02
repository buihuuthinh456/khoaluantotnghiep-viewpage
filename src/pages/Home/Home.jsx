import React, { useEffect } from "react";
import styles from "./home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { selectHome, getHomeAsync } from "../../features/home/homeSlice";
import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

function Home() {
  const dispatch = useDispatch();
  const homeState = useSelector(selectHome);
  useEffect(() => {
    dispatch(getHomeAsync());
    console.log(homeState);
  }, []);

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])
  if (homeState.isLoading)
    return (
      <div className={styles.loading}>
        <Loading
          size = {100}
        ></Loading>
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
              <li key={item._id} className={styles.productItem}>
                <Link to={`/detail/${item._id}`} style={{ textDecoration: "none" }}>
                  <div className={styles.imageWrapper}>
                    <img
                      key={item.images[0].public_id}
                      src={item.images[0].url}
                      alt="product"
                    />
                    <div className={styles.productController}>
                      <div className={styles.productIcon}>
                        <ManageAccountsIcon
                          style={{ fontSize: "2rem", color: "#333" }}
                        />
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
                  <h3 className={styles.productName}>{item.name}</h3>
                  <div className={styles.productPrice}>{`$${item.price}`}</div>
                </div>
              </li>
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
              <li key={item._id} className={styles.productItem}>
                <Link to={`/detail/${item._id}`} style={{ textDecoration: "none" }}>
                  <div className={styles.imageWrapper}>
                    <img
                      key={item.images[0].public_id}
                      src={item.images[0].url}
                      alt="product"
                    />
                    <div className={styles.productController}>
                      <div className={styles.productIcon}>
                        <ManageAccountsIcon
                          style={{ fontSize: "2rem", color: "#333" }}
                        />
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
                  <h3 className={styles.productName}>{item.name}</h3>
                  <div className={styles.productPrice}>{`$${item.price}`}</div>
                </div>
              </li>
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
              <li key={item._id} className={styles.productItem}>
                <Link to={`/detail/${item._id}`} style={{ textDecoration: "none" }}>
                  <div className={styles.imageWrapper}>
                    <img
                      key={item.images[0].public_id}
                      src={item.images[0].url}
                      alt="product"
                    />
                    <div className={styles.productController}>
                      <div className={styles.productIcon}>
                        <ManageAccountsIcon
                          style={{ fontSize: "2rem", color: "#333" }}
                        />
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
                  <h3 className={styles.productName}>{item.name}</h3>
                  <div className={styles.productPrice}>{`$${item.price}`}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
