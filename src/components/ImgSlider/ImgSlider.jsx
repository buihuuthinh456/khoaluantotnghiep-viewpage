import React, {useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectHome, getTopicImgAsync } from '../../features/home/homeSlice'
import { selectLogin } from '../../features/login/loginSlice'

import styles from './imgSlider.module.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Button from '../Button/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Fade } from 'react-awesome-reveal';

const SliderDots = ({children}) => {
  return (
    <div className={styles.dotsContainer}>
      <ul>
        {children}
      </ul>
    </div>
  )
}

function ImgSlider() {

  let slider = useRef()
  const dispatch = useDispatch()
  const imgSlider = useSelector(selectHome).imgSlider
  const userId = useSelector(selectLogin)

  useEffect(()=>{
    dispatch(getTopicImgAsync(userId.info._id))
  }, [imgSlider,userId.info._id])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    className: `${styles.slider}`,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dotsClass: 'oke',
    appendDots: dots => <SliderDots>{dots}</SliderDots>,
    customPaging: i => (
      <div className={styles.dotsItem}>

      </div>
    )
  };

  return (
    <Fade
      direction='down'
      triggerOnce={true}
      delay={200}
      duration={500}
    >
      <div className={styles.container}>
        <div className={styles.sliderContainer}>
          <Slider {...settings} ref={slider}>
            <div className={styles.item}>
                <img src="//bizweb.dktcdn.net/100/190/540/themes/510789/assets/slide-img3.jpg?1649728473586" alt="slider" />
            </div>
            <div className={styles.item}>
                <img src="https://img.freepik.com/free-vector/e-commerce-icon-robotic-hand-internet-shopping-online-purchase-add-cart_127544-586.jpg?w=2000" alt="slider" />
            </div>
          </Slider>
            <Button
              borderRadius = '50%'
              color = 'black'
              fontSize = '1.6rem'
              padding = '12px'
              bgColor = '#2790f2'
              className = {styles.buttonLeft}
              onClick = {()=>{slider.current.slickPrev()}}
            >
              <ArrowBackIosIcon sx={
                {
                  transform: 'translateX(10%)'
                }
              } />
            </Button>
          
            <Button
              borderRadius = '50%'
              color = 'black'
              fontSize = '1.6rem'
              padding = '12px'
              bgColor = '#2790f2'
              className = {styles.buttonRight}
              onClick = {()=>{slider.current.slickNext()}}
            >
              <ArrowForwardIosIcon />
            </Button>
  
        </div>
      </div>
    </Fade>
    
  )
}

export default ImgSlider