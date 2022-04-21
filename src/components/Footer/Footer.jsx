import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import SearchInput from '../SearchInput/SearchInput'
import styles from './footer.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
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
                        placeholder = 'Enter Email Address'
                    />
                    <Button
                        color = 'white'
                        bgColor = '#1E90FF'
                        width = '120px'
                        margin = '0 4px'
                    >
                    Sign Up
                    </Button>
                </div>
                <Link to='/' className={styles.contactInfo}>
                    Contact Info
                </Link>
            </div>
            <div className={styles.right}>
                <div className={styles.categories}>
                    <div className={styles.title}>
                        <h3>Catagories</h3>
                    </div>

                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink} style={{textDecoration: 'none'}}>
                                Laptop & Computer
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Cameras & Photography
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Smart Phones & Tablets
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Video Games & Consoles
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Waterproof Headphones
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.customCare}>
                    <div className={styles.title}>
                        <h3>Custom Care</h3>
                    </div>

                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink} style={{textDecoration: 'none'}}>
                                My Account
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Discount
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Return
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Order History
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to='/' className={styles.itemLink}>
                                Order Tracking
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.pages}>
                    <div className={styles.title}>
                            <h3>Pages</h3>
                        </div>

                        <ul className={styles.list}>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink} style={{textDecoration: 'none'}}>
                                    Blog
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink}>
                                    Category
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink}>
                                    Pre-Built Pages
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink}>
                                    Visual Composer Elements
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to='/' className={styles.itemLink}>
                                    WooCommerce Pages
                                </Link>
                            </li>
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