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
  increaseQuantity,
  decreaseQuantity,
} from "../../features/login/loginSlice";
import { selectCart, deleteItemCartAsync, getCartAsync } from "../../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  // const userCart = useSelector(selectLogin);
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

  if (amount === 0)
    return (
      <div className={styles.container}>
        <h1>Không có sản phẩm</h1>
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
                <h3 className={styles.productPrice}>{`$${item.price}`}</h3>
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
          <Button variant="outlined" size="large">
            Continue
          </Button>
        </div>

        <div className={styles.payment}>
          <Button variant="contained" size="large">
            Payment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
