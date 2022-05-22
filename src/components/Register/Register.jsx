import React, { useEffect } from "react";
import styles from "./register.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { closeRegisterModal, openLoginModal,selectModal } from "../../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { handleRegisterUser } from "../../api";
import CloseIcon from '@mui/icons-material/Close';

function Register() {

    const dispatch = useDispatch()
    const modalState = useSelector(selectModal)

    const handleOpenLogin = () => {
      dispatch(closeRegisterModal())
      dispatch(openLoginModal())
    }

    const handleCloseRegister = (e) => {
      e.stopPropagation()
      dispatch(closeRegisterModal())
    }


  const handleRegister = async(values, func) => {
    const {firstName,lastName,email,password} = values;

    const dataPost = {
      name:firstName+lastName,
      email,
      password
    }

    const res = await toast.promise(handleRegisterUser(dataPost),{
        pending: 'Register is handling',
        success: 'Register successfull 👌',
        error: 'Register error 🤯'
      },{
        style:{fontSize:"1.6rem"}
      });
      func()
      dispatch(closeRegisterModal())
  };    
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h1 className={styles.header}>Đăng Ký</h1>

      <div className={styles.close} onClick={(e) => handleCloseRegister(e)}>
        <CloseIcon />
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: `${modalState.value?modalState.value:""}`,
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Tối đa 15 ký tự")
            .required("Thông tin này là bắt buộc"),
          lastName: Yup.string()
            .max(20, "Tối đa 20 ký tự")
            .required("Thông tin này là bắt buộc"),
          email: Yup.string()
            .email("Email không hợp lệ")
            .required("Thông tin này là bắt buộc"),
          password: Yup.string()
            .min(8, "Phải ít nhất 8 ký tự")
            .required("Thông tin này là bắt buộc"),
          passwordConfirm: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Mật khẩu nhập lại sai"
          ),
        })}
        onSubmit={(values, { resetForm }) => {
          handleRegister(values, resetForm);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
           <div className={styles.containerFiel}>
              <div className={styles.field}>
                <TextField
                  required
                  error={
                    formik.errors.firstName
                      ? true
                      : formik.touched.firstName
                      ? false
                      : null
                  }
                  helperText={
                    formik.errors.firstName
                      ? formik.errors.firstName
                      : formik.touched.firstName
                      ? formik.touched.firstName
                      : ""
                  }
                  color={
                    formik.errors.firstName
                      ? "error"
                      : formik.touched.firstName
                      ? "success"
                      : null
                  }
                  focused={
                    formik.errors.firstName
                      ? false
                      : formik.touched.firstName
                      ? true
                      : null
                  }
                  fullWidth
                  id="firstName"
                  label="Nhập họ của bạn"
                  size="large"
                  {...formik.getFieldProps("firstName")}
                />
              </div>

              <div className={styles.field}>
                <TextField
                  required
                  error={
                    formik.errors.lastName
                      ? true
                      : formik.touched.lastName
                      ? false
                      : null
                  }
                  helperText={
                    formik.errors.lastName
                      ? formik.errors.lastName
                      : formik.touched.lastName
                      ? formik.touched.lastName
                      : ""
                  }
                  color={
                    formik.errors.lastName
                      ? "error"
                      : formik.touched.lastName
                      ? "success"
                      : null
                  }
                  focused={
                    formik.errors.lastName
                      ? false
                      : formik.touched.lastName
                      ? true
                      : null
                  }
                  fullWidth
                  id="lastName"
                  label="Nhập tên của bạn"
                  size="large"
                  {...formik.getFieldProps("lastName")}
                />
              </div>
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
                  label="Nhập email của bạn"
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
                  id="password"
                  label="Nhập mật khẩu của bạn"
                  size="large"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
              </div>
              <div className={styles.field}>
                <TextField
                  required
                  error={
                    formik.errors.passwordConfirm
                      ? true
                      : formik.touched.passwordConfirm
                      ? false
                      : null
                  }
                  helperText={
                    formik.errors.passwordConfirm
                      ? formik.errors.passwordConfirm
                      : formik.touched.passwordConfirm
                      ? formik.touched.passwordConfirm
                      : ""
                  }
                  color={
                    formik.errors.passwordConfirm
                      ? "error"
                      : formik.touched.passwordConfirm
                      ? "success"
                      : null
                  }
                  focused={
                    formik.errors.passwordConfirm
                      ? false
                      : formik.touched.passwordConfirm
                      ? true
                      : null
                  }
                  fullWidth
                  id="passwordConfirm"
                  label="Nhập lại mật khẩu của bạn"
                  size="large"
                  type="password"
                  {...formik.getFieldProps("passwordConfirm")}
                />
              </div>
           </div>

           <div className={styles.containerSubmit}>
            <div className={styles.text}>
              Bạn đã đọc và đồng ý với điều khoản và quy định của chúng tôi
            </div>
            <div className={styles.text}>
              Bạn đã có tài khoản? <Link to="" onClick={handleOpenLogin}>Đăng nhập</Link>
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
                Đăng ký
              </Button>
            </div>
           </div>

          </form>
        )}
      </Formik>

      
    </div>
  );
}

export default Register;
