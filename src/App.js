import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Routers from "./routers";
import styles from "./app.module.scss";
import { BrowserRouter } from "react-router-dom";
import UserController from "./components/UserController/UserController";
import Footer from "./components/Footer/Footer";
import Category from "./components/Category/Category";
import ImgSlider from "./components/ImgSlider/ImgSlider";
import { Fade } from "react-awesome-reveal";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register/Register";
import SearchInput from "./components/SearchInput/SearchInput";
import Button from "./components/Button/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function App() {
  const [gotoTop, setGotoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setGotoTop(true);
      } else {
        setGotoTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div className={styles.app}>
      <BrowserRouter>
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
            <Routers />
          </div>
        </div>
        <Fade direction="left" triggerOnce={true}>
          <Footer />
        </Fade>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {gotoTop && (
        <div className={styles.gotoTop} onClick={() => window.scrollTo(0, 0)}>
          <ArrowUpwardIcon sx={{fontSize: '3rem'}}></ArrowUpwardIcon>
        </div>
      )}
    </div>
  );
}

export default App;

