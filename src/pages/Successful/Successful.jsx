import React, { useEffect, useState } from "react";
import styles from "./Successful.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Base64 } from "js-base64";
import CheckIcon from "../../components/CheckIcon";
import CurrencyFormat from "../../functionJS";

function Sucessful() {
  const navigate = useNavigate();
  // code sau khi có data từ url trả về của MOMO

  const [dataURL, setdataURL] = useState({})
  useEffect(() => {
    const searchURL = window.location.search;
    console.log('paymentURL success', searchURL);
    const params = new URLSearchParams(searchURL);
    let paramObj = {};
    for (var value of params.keys()) {
      paramObj[value] = params.get(value);
    }
    console.log('urlObj', paramObj);
    const decodeString = Base64.decode(paramObj.extraData)
    console.log('decodeString', decodeString);
    let extraData = JSON.parse(decodeString);
    console.log(extraData);
    setdataURL({...paramObj, extraData})
  }, []);

  console.log('success', dataURL);

  const data = {
    amount: 3640,
    orderID: 'momojjjjj',
    extraData: {
      address: "123 Quang Trung",
      cart: [
        {
          _id: "625a49984e15f0ea8aee5a54",
          productId: "Arduino USB Host Shield",
          name: "Arduino USB Host Shield",
          images: [
            {
              public_id: "Ecommerce/vklcgrybjc76zigs6i5u",
              url: "http://res.cloudinary.com/doiden24/image/upload/v1650084247/Ecommerce/vklcgrybjc76zigs6i5u.jpg",
            },
          ],
          category: "Arduino",
          price: 159000,
          quantity: 1,
          description:
            "Arduino USB Host Shield tương thích với Arduino dựa trên MAX3421E, là bộ điều khiển máy chủ / thiết bị ngoại vi USB có chứa logic kỹ thuật số, tương thích với USB 2.0.\n\nMạch tương thích với nhiều Arduino, không chỉ UNO và Duemilanove mà cả Mega và Mega 2560 cũng hoạt động với một biến thể tiêu chuẩn của mạch này. Sử dụng chức năng USB HOST tương thích với Arduino, cho phép Arduino của bạn giao tiếp với các thiết bị USB khác và hỗ trợ chức năng USB HUB.",
          views: 2,
          createdAt: "2022-04-16T04:44:08.986Z",
          updatedAt: "2022-05-07T07:38:21.468Z",
          __v: 0,
          votes: [
            {
              username: "Bui Huu Thinh",
              userId: "62356635773b7ef75f7a2aa6",
              score: 4.9,
            },
            {
              username: "BuiThinh",
              userId: "624549487dae9d1fcd7d0b36",
              score: 4.3,
            },
          ],
          totalMoney: 159000,
        },
      ],
    },
    orderInfo: "Pay with MOMO",
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.title}>
            <CheckIcon />
            <h1>Giao dịch thành công</h1>

            <h3>Cảm ơn bạn đã mua hàng tại TSHOP</h3>
          </div>

          <div className={styles.content}>
            <h3>Thông tin đơn hàng</h3>

            <ul className={styles.billInfo}>
              <li className={styles.billInfoItem}>
                <p>Mã đơn hàng</p>
                <span>{data.orderID}</span>
              </li>
              <li className={styles.billInfoItem}>
                <p>Hình thức thanh toán</p>
                <span>{data.orderInfo === 'Pay with MOMO' ? 'Momo' : 'Tiền mặt'}</span>
              </li>
              <li className={styles.billInfoItem}>
                <p>Địa chỉ nhận hàng</p>
                <span>{data.extraData.address}</span>
              </li>
              <li className={styles.billInfoItem}>
                <p>Tổng tiền thanh toán</p>
                <span>{CurrencyFormat(data.amount)}</span>
              </li>
            </ul>

            <p className={styles.confirm}>
              Đơn hàng của bạn đang được xử lí và sẽ hoàn thành từ 3-6 tiếng. Bạn
              sẽ nhận được email xác nhận đơn hàng sau khi hoàn tất
            </p>
          </div>

          <div className={styles.button}>
            <Button variant="contained" onClick={() => navigate("/")}>
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sucessful;
