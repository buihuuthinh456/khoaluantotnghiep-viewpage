import React, { useEffect, useState } from "react";
import styles from "./search.module.scss";
import {
  selectSearch,
  getParam,
  searchProductsWithNameAsync,
} from "../../features/search/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

function Search() {
  const dispatch = useDispatch();
  let searchInput = ''
  const searchState = useSelector(selectSearch);
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(searchState, "searchstate");

  useEffect(() => {
    if (searchState.searchParam !== null) {
      setSearchParam(searchState.searchParam);
      console.log('searchState searchParam', searchParam.get('name[regex]'));
      dispatch(searchProductsWithNameAsync(searchState.searchParam));
    }
  }, [searchState.searchParam]);

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])

  if (searchState.searchParam !== null) {
    searchInput = searchState.searchParam["name[regex]"];
  }

  if (searchState.isLoading)
    return (
      <div className={styles.loading}>
        <Loading size={100}></Loading>
      </div>
    );

  return (
    <div className={styles.container}>
      {searchState.resultTotal === 0 ? (
        <>
          <Link to='/' className={styles.back}>Back</Link>
          <h2 className={styles.noResult}>
            Không có kết quả tìm kiếm cho '{searchInput ? `${searchInput}`: ''}'
          </h2>
        </>
      ) : (
        <>
          <Link to='/' className={styles.back}>Back</Link>
          <div className={styles.title}>
            <span> Có {`${searchState.resultTotal}`} kết quả</span>
          </div>

          <div className={styles.wrapper}>
            <ul className={styles.productList}>
              {searchState.data &&
                searchState.data.map((item) => (
                  <li key={item._id} className={styles.productItem}>
                    <Link
                      to={`/detail/${item._id}`}
                      style={{ textDecoration: "none" }}
                    >
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
                      <div
                        className={styles.productPrice}
                      >{`$${item.price}`}</div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
