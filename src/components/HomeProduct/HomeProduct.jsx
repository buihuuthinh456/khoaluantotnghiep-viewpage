import React from 'react'
import styled from 'styled-components'
import './homeProduct.scss'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeProduct() {
    let settings = {
        dots: true,
        arrow: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false
    }
  return (
    <Container>
        <div className="feature-product">
            <h2 className="title">
                Feature Products
            </h2>

            <div className="slider-container">
                <Carousel {...settings}>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
        <div className="feature-product">
            <h2 className="title">
                ARDUINNO
            </h2>

            <div className="slider-container">
                <Carousel {...settings}>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
        <div className="feature-product">
            <h2 className="title">
                Sensor
            </h2>

            <div className="slider-container">
                <Carousel {...settings}>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                    <div className='item'>
                        <div className="wrapper">
                            <div className="image-wrap">
                                <img src="images/IC-image.jpg" alt="123" />
                            </div>
                            <div className="product-info">
                                <h3>SMART PLUG WIFI APP SMART LIFE</h3>
                                <p className='price'>680000đ</p>
                                <button>Detail</button>
                            </div>  
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    </Container>
  )
}

export default HomeProduct

const Container = styled.div`
    margin-top: 70px;
`

const Carousel = styled(Slider)`
    li.slick-active button:before {
        color: #FB2E86;
    }
`