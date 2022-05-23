import styles from "./detail.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectDetailProduct,
  fetchDetailProduct,
  viewsProductAsync,
  voteAsync,
} from "../../features/detailProduct/detailProductSlice";
import { addItemCartAsync } from "../../features/cart/cartSlice";
// import { selectVoting, voteAsync } from '../../features/vote/voteSlice'

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Loading from "../../components/Loading/Loading";
import Comments from "../../components/Comments/Comments";
import CurrencyFormat from "../../functionJS";
import ReactStars from "react-rating-stars-component";
import { selectLogin } from "../../features/login/loginSlice";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

function Detail() {
  const { productID } = useParams();
  const [amount, setAmount] = useState(1);
  const [rating, setRating] = useState();
  const [table, setTable] = useState(null);
  const [productRate, setProductRate] = useState(0);

  const dispatch = useDispatch();

  const isLogin = useSelector(selectLogin).isLogin;
  const detailProduct = useSelector(selectDetailProduct).data;
  const isLoading = useSelector(selectDetailProduct).isLoading;
  const voteList = useSelector(selectDetailProduct).voting;
  // const msg = useSelector(selectVoting).msg

  // When add product
  const handleAddProduct = () => {
    const totalMoney = detailProduct.price * amount;
    console.log("detail", totalMoney);
    const dataSend = {
      ...detailProduct,
      quantity: amount,
      totalMoney: totalMoney,
    };
    dispatch(addItemCartAsync(dataSend));
  };

  // lấy giữ liệu
  useEffect(() => {
    dispatch(fetchDetailProduct(productID));
  }, [productID]);

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (voteList) {
      const totalScore = voteList.reduce((acc, cur) => {
        return acc + cur.score;
      }, 0);
      console.log("totalScore", totalScore);
      setProductRate(totalScore / voteList.length);
    } else {
      setProductRate(0);
    }
  }, [voteList]);

  // viewProduct

  // extract html tags from description
  // useEffect(()=>{
  //   if (!isLoading) {
  //     const htmlIndex = detailProduct.description.indexOf("<")
  //     console.log('<specifications> point', htmlIndex);
  //     if (htmlIndex !== -1) {
  //       const tableString = detailProduct.description.slice(htmlIndex)
  //       console.log('tableString', tableString);
  //       setTable(tableString)
  //     } else {
  //       console.log('fail');
  //     }
  //   }
  // }, [detailProduct])

  // vote sản phẩm
  const ratingChanged = (newRating) => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập trước đánh giá", {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    } else {
      setRating(newRating);
      const dataPost = {
        score: Number(newRating),
        productID: productID,
      };
      dispatch(voteAsync(dataPost));
    }
  };

  if (isLoading)
    return (
      <div className={styles.loading}>
        <Loading size={100} />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{detailProduct?detailProduct.name:"Detail Product Page"}</title>
        <meta name="description" content={detailProduct?detailProduct.name:"Detail Product Page"} />
      </Helmet>
      <div className={styles.back}>
        <Link to={`/`}>Back</Link>
      </div>
      {detailProduct && (
        <div className={styles.container} key={detailProduct._id}>
          <div className={styles.imageWrapper}>
            <img
              src={detailProduct.images[0].url}
              key={detailProduct.images[0].public_id}
              alt="product"
            />
          </div>
          <div className={styles.productInfo}>
            <h1 className={styles.title}>{detailProduct.name}</h1>
            <div className={styles.price}>
              <span>{CurrencyFormat(detailProduct.price)}</span>
            </div>
            <div className={styles.productRate}>
              {console.log('totalRate', productRate)}
              {!isNaN(productRate) && <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
                value={isNaN(productRate) ? 0 : Number(productRate)}
                edit = {false}
              />}
              {!isNaN(productRate) && <span className={styles.productRateText}>{productRate ? productRate : 0} / 5.0</span>}
            </div>
            <div className={styles.desc}>
              <h2>Mô tả sản phẩm</h2>
              <span>{detailProduct.description}</span>
            </div>
            <div className={styles.productController}>
              <div className={styles.quantity}>
                <div className={styles.removeButton}>
                  <Button
                    variant="outlined"
                    size="large"
                    disabled={amount === 1 ? true : false}
                    onClick={() => setAmount((state) => state - 1)}
                  >
                    <RemoveIcon />
                  </Button>
                </div>

                <div className={styles.amount}>{amount}</div>

                <div className={styles.addButton}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setAmount((state) => state + 1)}
                  >
                    <AddIcon />
                  </Button>
                </div>
              </div>

              <div className={styles.buttonAdd}>
                <Button variant="contained" onClick={handleAddProduct}>
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {table && table} */}

      <div className={styles.rating}>
        <h2>Đánh giá sản phẩm</h2>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={38}
          activeColor="#ffd700"
        />
        {rating && <span>Cảm ơn đã vote</span>}
      </div>

      <div className={styles.commentSection}>
        <Comments productID={productID} />
      </div>
    </>
  );
}

export default Detail;
