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

import ProductCard from "../../components/ProductCard";

function Search() {
  const dispatch = useDispatch();
  let searchInput = "";
  const searchState = useSelector(selectSearch);
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(searchState, "searchstate");

  useEffect(() => {
    if (searchState.searchParam !== null) {
      setSearchParam(searchState.searchParam);
      dispatch(searchProductsWithNameAsync(searchState.searchParam));
    }
  }, [searchState.searchParam]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <Link to="/" className={styles.back}>
            Back
          </Link>
          <h2 className={styles.noResult}>
            Không có kết quả tìm kiếm cho '{searchInput ? `${searchInput}` : ""}
            '
          </h2>
        </>
      ) : (
        <>
          <Link to="/" className={styles.back}>
            Back
          </Link>
          <div className={styles.title}>
            <span> Có {`${searchState.resultTotal}`} kết quả</span>
          </div>

          <div className={styles.wrapper}>
            <ul className={styles.productList}>
              {searchState.data &&
                searchState.data.map((item) => (
                  <ProductCard
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
        </>
      )}
    </div>
  );
}

export default Search;
