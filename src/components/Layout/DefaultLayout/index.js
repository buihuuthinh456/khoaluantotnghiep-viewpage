import React from 'react'
import Button from '../../Button/Button'
import Navbar from '../../Navbar/Navbar'
import SearchInput from '../../SearchInput/SearchInput'
import UserController from '../../UserController/UserController'
import styles from './DefaultLayout.module.scss'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ImgSlider from '../../ImgSlider/ImgSlider'
import Category from '../../Category/Category'
import { Fade } from 'react-awesome-reveal'
import Footer from '../../Footer/Footer'

function DefaultLayout({ children }) {
  


  return (
    <div>
        <div className={styles.userController}>
          <UserController />
        </div>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.searchMobile}>
          <SearchInput width={"100%"} height={"40px"} placeholder="Search..." />
          <Button color="white" bgColor="#1E90FF" width="50px" margin="0 4px">
            <SearchOutlinedIcon />
          </Button>
        </div>
        <div className={styles.sliderContainer}>
          <ImgSlider />
        </div>

        <div className={styles.container}>
          <div className={styles.categoryWrapper}>
            <Category />
          </div>
          <div className={styles.routerWrapper}>
            {children}
          </div>
        </div>
        <Fade direction="left" triggerOnce={true}>
          <Footer />
        </Fade>
    </div>
  )
}

export default DefaultLayout