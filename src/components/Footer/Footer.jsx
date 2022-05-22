import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import SearchInput from '../SearchInput/SearchInput'
import styles from './footer.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import Modal from "../Modal/Modal";
import Register from "../Register/Register";

import { useSelector, useDispatch } from "react-redux";

import {
    selectModal,
    openRegisterModal,
    closeRegisterModal,
  } from "../../features/modal/modalSlice";

function Footer() {

    const modalState = useSelector(selectModal);
    const dispatch = useDispatch();
    const [value,setValue] = useState(null)
  return (
    <div className={styles.footer}>
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <h1>TSHOP</h1>
                </div>
                <div className={styles.searchField}>
                    <SearchInput
                        type = 'text' 
                        width = '80%'
                        height = '45px'
                        placeholder = 'Nhập Email'
                        value={value}
                        onChange={(e)=>{setValue(e.target.value)}}
                    />
                    <Button
                        color = 'white'
                        bgColor = '#1E90FF'
                        width = '120px'
                        margin = '0 4px'
                        onClick={(e) => {
                            dispatch(openRegisterModal(value))
                        }}
                    >
                    Đăng ký
                    </Button>
                </div>
                <Link to='/' className={styles.contactInfo}>
                    Thông tin về chúng tôi
                </Link>
            </div>
            <div className={styles.right}>
                <div className={styles.categories}>
                    <div className={styles.title}>
                        <h3>Sản phẩm</h3>
                    </div>

                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink} style={{textDecoration: 'none'}}>
                                Điện trở, tụ điện các loại
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Các dòng IC nhỏ, vừa, lớn
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Các dòng Raspberry
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Arduino các loại
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Các dòng vi điều khiển khác
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.customCare}>
                    <div className={styles.title}>
                        <h3>Hỗ Trợ</h3>
                    </div>

                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink} style={{textDecoration: 'none'}}>
                                Thanh toán trực tiếp
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Có hỗ trợ MoMo
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Hoàn trả hàng trong 48h
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Ưu đãi khách hàng thân thiết
                            </Link>
                        </li>
                        {/* <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Order Tracking
                            </Link>
                        </li> */}
                    </ul>
                </div>
                <div className={styles.pages}>
                    <div className={styles.title}>
                            <h3>Dịch vụ</h3>
                        </div>

                        <ul className={styles.list}>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink} style={{textDecoration: 'none'}}>
                                    Hàng có tem chống giả
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink}>
                                    Cam kết giữ bí mật thông tin
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink}>
                                    Vận chuyển nhanh chóng
                                </Link>
                            </li>
                            {/* <li className={styles.item}>
                                <Link to='/' className={styles.itemLink}>
                                    Visual Composer Elements
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink}>
                                    WooCommerce Pages
                                </Link>
                            </li> */}
                        </ul>
                </div>
            </div>
        </div>

        <div className={styles.footerCopyright}>
            <span>©Tôn Thất Bảo Toàn- Bùi Hữu Thịnh</span>

            <div className={styles.socialMedia}>
                <Link to='' className={styles.icon}>
                    <FacebookIcon />
                </Link>
                <Link to='' className={styles.icon}>
                    <InstagramIcon />
                </Link>
                <Link to='' className={styles.icon}>
                    <TwitterIcon />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Footer