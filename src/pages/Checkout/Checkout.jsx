import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import Badge from "@mui/material/Badge";

import { Link, useNavigate } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { selectCart, productTotalMoney } from "../../features/cart/cartSlice";
import {
  paymentAsync,
  selectPayment,
} from "../../features/payment/paymentSlice";


import { toast } from "react-toastify";
import CurrencyFormat from "../../functionJS";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCart = useSelector(selectCart).cartItem;
  const payURL = useSelector(selectPayment);
  const [selector, setSelector] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  
  useEffect(()=>{
    dispatch(productTotalMoney());
  },[])
  
  // const totalMoney = useSelector(selectCart).cartTotalMoney;
  const totalMoney = userCart.reduce((acc, cur)=>{
    return acc + cur.totalMoney
  }, 0)


  const handleChange = (e) => {
    setSelector(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = () => {
    let type = "";
    switch (selector) {
      case "momo":
        type = "create-payment";
        break;
      case "cash":
        type = "cash";
        break;
      default:
        console.log("select type");
    }
    if (address&&phone) {
      const addressSend = `${phone}, ${address}`;
      const dataPost = {
        type: type,
        amount: totalMoney,
        cart: [...userCart],
        address: addressSend,
      };
      dispatch(paymentAsync(dataPost));
    }
    else if(!address&&!phone){
      toast.error("Vui Lo??ng nh????p ????? th??ng tin", {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    } 
    else if(!address) {
      toast.error("Vui Lo??ng nh????p ??i??a chi??", {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }else{
      toast.error("Vui Lo??ng nh????p s??? ??i???n tho???i c???a b???n", {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }

  };

  if (payURL.payURL) {
    window.location.href = payURL.payURL
  }

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to="../cart">Back</Link>
      </div>

      <div className={styles.mainBody}>
        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>Th??ng tin gio?? ha??ng</h3>

          <ul className={styles.productList}>
            {userCart &&
              userCart.map((item) => {
                return (
                  <li className={styles.productItem}>
                    <div className={styles.productImg}>
                      <Badge badgeContent={item.quantity} color="primary">
                        <img src={item.images[0].url} alt="product" />
                      </Badge>
                    </div>

                    <div className={styles.productItemInfo}>
                      <span className={styles.productName}>{item.name}</span>
                      <div className={styles.productMoney}>
                        {CurrencyFormat(item.totalMoney)}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>

          <div className={styles.finalCheck}>
            <p>Total money</p>
            <span>{CurrencyFormat(totalMoney)}</span>
          </div>
        </div>

        <div className={styles.productPayment}>
          <h3 className={styles.paymentTitle}>Cho??n hi??nh th????c thanh toa??n</h3>

          <div className={styles.selector}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="payment-selector"
                name="row-radio-buttons-group"
                value={selector}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Ti????n m????t"
                  sz={{
                    fontSize: "1.6rem",
                  }}
                />
                <FormControlLabel
                  value="momo"
                  control={<Radio />}
                  label="Momo"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {selector && (
            <div className={styles.address}>
              <TextField
                id="cash-address"
                label="Nh???p ?????a ch??? c???a b???n"
                variant="outlined"
                required
                fullWidth
                value={address}
                onChange={handleAddress}
                sx={{marginBottom:"1.2rem"}}
              />

              <TextField
                id="cash-phone"
                label="S??? ??i???n tho???i c???a b???n"
                variant="outlined"
                required
                fullWidth
                value={phone}
                onChange={handlePhone}
              />
            </div>
          )}

          {selector && (
            <div className={styles.buy}>
              <Link to="/" className={styles.link}>
                Quay v???? trang chu??
              </Link>
              <Button variant="contained" onClick={handleSubmit}>
                Mua ha??ng
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
