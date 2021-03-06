import React, { useEffect } from "react";
import styles from "./login.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { selectLogin, handleLoginAsync } from "../../features/login/loginSlice";
import {
  closeLoginModal,
  openRegisterModal,
  openRequestResetPassword,
} from "../../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';

function Login() {
  const dispatch = useDispatch();
  const loginUser = useSelector(selectLogin);

  const navigate = useNavigate();
  useEffect(() => {
    if (loginUser.isLogin === true) {
      navigate("/");
      dispatch(closeLoginModal());
    }
  }, [loginUser.isLogin]);

  const handleCloseLogin = (e) => {
    e.stopPropagation()
    dispatch(closeLoginModal())
  }
  const handleOpenRequestResetPassword = (e)=>{
    e.stopPropagation()
    dispatch(closeLoginModal())
    dispatch(openRequestResetPassword())
  }

  const handleOpenRegister = (e) => {
    e.stopPropagation()
    dispatch(closeLoginModal());
    dispatch(openRegisterModal());
  };

  const handleLogin = async (values, func) => {
    console.log(values);
    const { email, password } = values;
    const dataPost = {
      email,
      password,
    };
    dispatch(handleLoginAsync(dataPost));
    func();
  };

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h1 className={styles.header}>Đăng Nhập</h1>

      <div className={styles.close} onClick={(e) => handleCloseLogin(e)}>
        <CloseIcon />
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Email không hợp lệ")
            .required("Thông tin này bắt buộc phải có"),
          password: Yup.string().required("Thông tin này bắt buộc phải có"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values, resetForm);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <TextField
                required
                error={
                  formik.errors.email
                    ? true
                    : formik.touched.email
                    ? false
                    : null
                }
                helperText={
                  formik.errors.email
                    ? formik.errors.email
                    : formik.touched.email
                    ? formik.touched.email
                    : ""
                }
                color={
                  formik.errors.email
                    ? "error"
                    : formik.touched.email
                    ? "success"
                    : null
                }
                focused={
                  formik.errors.email
                    ? false
                    : formik.touched.email
                    ? true
                    : null
                }
                fullWidth
                id="email"
                label="Email"
                size="large"
                {...formik.getFieldProps("email")}
              />
            </div>
            <div className={styles.field}>
              <TextField
                required
                error={
                  formik.errors.password
                    ? true
                    : formik.touched.password
                    ? false
                    : null
                }
                helperText={
                  formik.errors.password
                    ? formik.errors.password
                    : formik.touched.password
                    ? formik.touched.password
                    : ""
                }
                color={
                  formik.errors.password
                    ? "error"
                    : formik.touched.password
                    ? "success"
                    : null
                }
                focused={
                  formik.errors.password
                    ? false
                    : formik.touched.password
                    ? true
                    : null
                }
                fullWidth
                type="password"
                id="email"
                label="Mật khẩu"
                size="large"
                {...formik.getFieldProps("password")}
              />
            </div>
            <div className={styles.button}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                isSubmitting={formik.isSubmitting}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
              >
                Đăng nhập
              </Button>
            </div>

            <div className={styles.signUpNav}>
              <div className={styles.forgotPass}>
                <div className={styles.forgotPassLink}
                  onClick={handleOpenRequestResetPassword}
                >
                  Quên Mật Khẩu ?
                </div>
              </div>

              <div className={styles.register}>
                <div
                  className={styles.registerLink}
                  onClick={handleOpenRegister}
                >
                  Chưa có tài khoản ? Đăng kí
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
