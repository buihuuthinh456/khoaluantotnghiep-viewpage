import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearch,
  getParam,
  searchProductsWithNameAsync,
} from "../../features/search/searchSlice";
import { selectLogin } from "../../features/login/loginSlice";
import {
  selectCart,
  deleteItemCartAsync,
  getCartAsync,
} from "../../features/cart/cartSlice";

// Voice Recognition
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import SearchInput from "../SearchInput/SearchInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Button from "@mui/material/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NavbarMobileMenu from "../NavbarMobileMenu/NavbarMobileMenu";
import Badge from "@mui/material/Badge";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Voice from "../Voice";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

import CurrencyFormat from "../../functionJS";
function Navbar() {
  // redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const userPersonalCart = useSelector(selectLogin).cart;
  const searchState = useSelector(selectSearch);
  const userCart = useSelector(selectCart);
  const accessToken = localStorage.getItem("accessToken");

  const [searchParam, setSearchParam] = useSearchParams();

  // 
  const [cartAmount, setCartAmount] = useState(0);
  const [cartItem, setCartItem] = useState();
  const [searchInput, setSearchInput] = useState();
  const [voiceSearch, setVoiceSearch] = useState(false);

  // Voice recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if(accessToken){
      dispatch(getCartAsync());
    }
  }, [accessToken]);

  useEffect(() => {
    setCartAmount(userCart.cartTotalItem);
    setCartItem(userCart.cartItem);
  }, [userCart.cartTotalItem, userCart.cartItem]);

  const handleDelete = (e, item) => {
    e.stopPropagation();
    dispatch(deleteItemCartAsync(item._id));
  };

  const handleListen = () => {
    SpeechRecognition.startListening({language:'vi-VN'});
  };

  useEffect(()=>{
    if (!transcript) {
      setSearchParam()
    } else {
      dispatch(
        getParam({
          "name[regex]": transcript,
        })
      );
      navigate("/search");
    }
  }, [transcript])

  const handleSearch = (e) => {
    dispatch(
      getParam({
        "name[regex]": searchInput,
      })
    );
    navigate("/search");
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          TSHOP
        </Link>
      </div>
      <div className={styles.navbarMobileMenu}>
        <NavbarMobileMenu />
      </div>
      <div className={styles.center}>
        <SearchInput
          width={"100%"}
          height={"40px"}
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="contained" size="small" onClick={handleSearch}>
          <SearchOutlinedIcon />
        </Button>
        <Button variant="contained" size="small" onClick={handleListen}>
          <KeyboardVoiceIcon />
        </Button>
      </div>
      <div className={styles.right}>
        <div className={styles.cart} onClick={() =>{ 
            if (loginState.isLogin) {
              navigate("/cart")
            } else {
              toast.error("Vui lòng đăng nhập để xem giỏ hàng", {
                position: toast.POSITION.TOP_RIGHT,
                style: { fontSize: "1.6rem" },
              });
            }
          }}>
          <Badge badgeContent={cartAmount} color="primary">
            <ShoppingCartRoundedIcon fontSize="3rem" />
          </Badge>
          <div className={styles.cartInfo}>
            {cartAmount === 0 ? (
              <div className={styles.noCart}>
                <h1>Không có sản phẩm</h1>
              </div>
            ) : (
              <div>
                <div className={styles.cartTitle}>
                  <h2>Thông tin sản phẩm</h2>
                </div>

                <ul className={styles.cartProductMenu}>
                  {console.log("cartItem",cartItem)}
                  {cartItem.map((item) => (
                    <li className={styles.cartProductItem} key={item._id}>
                      <div className={styles.imgWrapper}>
                        <img src={item.images[0].url} alt="product" />
                      </div>

                      <div className={styles.cartProductInfo}>
                        <div className={styles.row}>
                          <h3 className={styles.productName}>{item.name}</h3>
                          <div className={styles.cartWrapper}>
                            <div className={styles.productPrize}>
                              {CurrencyFormat(item.price)}
                            </div>
                            <span className={styles.multiply}>x</span>
                            <span className={styles.quantity}>
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className={styles.row}>
                          <div
                            className={styles.productDelete}
                            onClick={(e) => handleDelete(e, item)}
                          >
                            <span>Xóa</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className={styles.cartFooter}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/cart")}
                  >
                    Xem tất cả
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Voice
        transcript={transcript}
        isSupport={browserSupportsSpeechRecognition}
        listening={listening}
      />
    </div>
  );
}

export default Navbar;
