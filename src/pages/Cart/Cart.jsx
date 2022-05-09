import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./cart.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLogin,
  deleteProduct,
} from "../../features/login/loginSlice";
import { selectCart, deleteItemCartAsync, getCartAsync, increaseQuantity, decreaseQuantity, productTotalMoney } from "../../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import BuyProducts from "../../components/BuyProducts/BuyProducts";
import CurrencyFormat from "../../functionJS";

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const userCart = useSelector(selectCart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    dispatch(getCartAsync())
  }, [])

  useEffect(() => {
    setAmount(userCart.cartTotalItem);
    setCartItem(userCart.cartItem);
  }, [userCart.cartTotalItem, userCart.cartItem]);

  const handleBuy = async() => {
    await dispatch(productTotalMoney())
    navigate('/checkout')
  }

  if (userCart.isLoading)
    return (
      <div className={styles.loading}>
        <Loading size={100} />
      </div>
    );

  if (amount === 0)
    return (
      <div className={styles.container}>
        <h1>Không có sản phẩm</h1>

        <div className={styles.back}>
          <Link to='/'>
            Về trang chủ
          </Link>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Thông tin giỏ hàng</h1>
      </div>

      <ul className={styles.productList}>
        {cartItem.map((item) => (
          <li className={styles.productItem} key={item._id}>
            <div className={styles.imgWrapper}>
              <img src={item.images[0].url} alt="product" />
            </div>

            <div className={styles.productInfo}>
              <div className={styles.row}>
                <h3 className={styles.productName}>{item.name}</h3>
                <h3 className={styles.productPrice}>{CurrencyFormat(item.totalMoney)}</h3>
              </div>

              <div className={styles.row}>
                <div className={styles.quantity}>
                  <div className={styles.removeButton}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => dispatch(decreaseQuantity(item))}
                      disabled={item.quantity === 1 ? true : false}
                    >
                      <RemoveIcon />
                    </Button>
                  </div>

                  <div className={styles.amount}>{item.quantity}</div>

                  <div className={styles.addButton}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => dispatch(increaseQuantity(item))}
                    >
                      <AddIcon />
                    </Button>
                  </div>
                </div>

                <div
                  className={styles.productDelete}
                  onClick={() => dispatch(deleteItemCartAsync(item._id))}
                >
                  <CloseIcon />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.buy}>
        <div className={styles.continue}>
          <Button variant="outlined" size="large" onClick={()=>navigate('/')}>
            Tiếp Tục Mua
          </Button>
        </div>

        <div className={styles.payment}>
          <Button variant="contained" size="large" onClick={handleBuy}>
            Mua hàng
          </Button>
        </div>
      </div>

      {/* <div className={styles.modalBuy}>
          <BuyProducts />
      </div> */}
    </div>
  );
}

export default Cart;
