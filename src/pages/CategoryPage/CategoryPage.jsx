import React, { useEffect, useState } from "react";
import styles from "./categoryPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoryPage,
  categoryPageAsync,
  paginationAsync,
  sortPriceAsync
} from "../../features/categoryPage/categoryPageSlice";

import { Link, useParams, useSearchParams } from "react-router-dom";

import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading/Loading";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import CurrencyFormat from "../../functionJS";

function CategoryPage() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryPageState = useSelector(selectCategoryPage);

  const [searchParam, setSearchParam] = useSearchParams();
  const [filter, setFilter] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({
    sort: null,
    page: page,
    "category[regex]": category
  });
  
 
  useEffect(() => {
    window.scrollTo(0, 200);
    setSearchParam(query);
  }, []);

  useEffect(() => {
      dispatch(categoryPageAsync(category));
  }, [category]);


  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
    setQuery(state => {
      const param = {...state,"category[regex]": category, sort: event.target.value}
      setSearchParam(param)
      dispatch(sortPriceAsync(param))
      return param
    })
    window.scrollTo(0, 200);

  };

  const handleChangePage = (event, value) => {
    setPage(value)
    setQuery(state => {
      const param = {...state, page: value, "category[regex]": category}
      setSearchParam(param)
      dispatch(paginationAsync(param))
      return param
    })
    window.scrollTo(0, 200);

  };

  if (categoryPageState.isLoading)
    return (
      <div className={styles.loading}>
        <Loading size={100} />
      </div>
    );

  return (
    <>
      <div className={styles.filter} >
        <FormControl>
          <InputLabel id="filter-data">Sắp xếp</InputLabel>
          <Select
            labelId="filter-data"
            id="demo-simple-select"
            value={filter}
            label="Filter"
            onChange={handleChangeFilter}
          >
            <MenuItem value={"createdAt"}>Theo ngày đăng</MenuItem>
            <MenuItem value={"price"}>Giá tăng dần</MenuItem>
            <MenuItem value={"-price"}>Giá giảm dần</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>{category!=="all"?category:"Toàn bộ sản phẩm"}</h3>
        </div>
        <ul className={styles.productList}>
          {categoryPageState.products &&
            categoryPageState.products.map((item) => (
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

        <div className={styles.pagination}>
          <Pagination
            count={categoryPageState.totalPage}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
