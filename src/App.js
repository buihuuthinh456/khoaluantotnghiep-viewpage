import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

// Styles
import styles from "./app.module.scss";



// Compontn
import DefaultLayout from "./components/Layout/DefaultLayout";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// Others
import { publicRoutes } from "./routers";
import { getUserInfoAsync } from "./features/login/loginSlice";

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
