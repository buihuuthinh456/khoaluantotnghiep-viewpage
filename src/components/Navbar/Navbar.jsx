import React from 'react'
import styles from './navbar.module.scss'
import SearchInput from '../SearchInput/SearchInput'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import NavbarMobileMenu from '../NavbarMobileMenu/NavbarMobileMenu';


function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link to='/' className={styles.logo}>
          TSHOP
        </Link>
      </div>
      <div className={styles.navbarMobileMenu}>
          <NavbarMobileMenu />
        </div>
      <div className={styles.center}>
        <SearchInput 
          width = {'100%'}
          height = {'40px'}
          placeholder = 'Search...'
        />
        <Button
          color = 'white'
          bgColor = '#1E90FF'
          width = '50px'
          margin = '0 4px'
        >
          <SearchOutlinedIcon />
        </Button>
      </div>
      <div className={styles.right}>
          <div className={styles.cart}>
            <ShoppingCartRoundedIcon style={{fontSize: '2.4rem'}}/>
            <span>Giỏ Hàng</span>
          </div>
      </div>
    </div>
  )
}

export default Navbar