import React, { Fragment, useEffect, useState } from "react";
import { publicRoutes } from "./routers";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Routers from "./routers";
import styles from "./app.module.scss";
import UserController from "./components/UserController/UserController";
import Footer from "./components/Footer/Footer";
import Category from "./components/Category/Category";
import ImgSlider from "./components/ImgSlider/ImgSlider";
import { Fade } from "react-awesome-reveal";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "./components/SearchInput/SearchInput";
import Button from "./components/Button/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getUserInfoAsync } from "./features/login/loginSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
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

  useEffect(() => {
    dispatch(getUserInfoAsync());
  }, [accessToken]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <div className={styles.app}>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout

              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                ></Route>
              );
            })}
          </Routes>
        </div>
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
          <ArrowUpwardIcon sx={{ fontSize: "3rem" }}></ArrowUpwardIcon>
        </div>
      )}
    </div>
  );
}

export default App;
