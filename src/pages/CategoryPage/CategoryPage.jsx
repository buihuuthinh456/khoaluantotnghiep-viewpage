import React, { useEffect } from 'react'
import styles from './categoryPage.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryPage, categoryPageAsync } from "../../features/categoryPage/categoryPageSlice";
import { Link, useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading';
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

function CategoryPage() {

  const dispatch = useDispatch()
  const categoryPageState = useSelector(selectCategoryPage)

  const {category} = useParams()
  useEffect(()=>{
    dispatch(categoryPageAsync(category))
    console.log(categoryPageState);
  }, [category])

  if (categoryPageState.isLoading) 
  return (
      <div className={styles.loading}>
          <Loading size = {100}/>
      </div>
  )
  return (
    <div className={styles.container}>
        <div className={styles.title}>
          <h3>{category}</h3>
        </div>
        <ul className={styles.productList}>
          {categoryPageState.products &&
            categoryPageState.products.map((item) => (
              <li key={item._id} className={styles.productItem}>
                <Link to="/" style={{ textDecoration: "none" }}>
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
  )
}

export default CategoryPage