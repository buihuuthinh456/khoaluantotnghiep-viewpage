import React, { useEffect } from "react";
import styles from "./changePassword.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import {changePasswordApi} from '../../api'
import {
  closeChangePassword,
} from "../../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";



function ChangePassword() {
    const dispatch = useDispatch();

    const handleCloseChangePassword = (e)=>{
        e.stopPropagation()
        e.preventDefault()
        dispatch(closeChangePassword())
    }
    const handleSubmit = async (values,func) => {
        console.log(values)
        const payload = {
            password:values.currentPassword,
            newPassword:values.newPassword
        }
        const token = localStorage.getItem("accessToken")
        console.log(token)
        try {
            await toast.promise(changePasswordApi(token,payload),{
                pending:"Hệ thống đang xử lý",
                success: 'Đổi mật khẩu thành công 👌',
            },
            {
                style:{fontSize:"1.6rem"}
            })
            dispatch(closeChangePassword())
        } catch (error) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
                style: { fontSize: "1.6rem" },
            });
        }
        func()
    }

   
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h1 className={styles.header}>Đổi mật khẩu</h1>

      <div className={styles.close} onClick={(e) => handleCloseChangePassword(e)}>
        <CloseIcon />
      </div>

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          newPasswordConfirm:"",
        }}
        validationSchema={Yup.object({
          currentPassword: Yup.string()
            .required("Bạn phải nhập mật khẩu hiện tại"),
          newPassword: Yup.string().required("Bạn phải nhập mật khẩu mới")
                                    .min(8,"Ít nhất phải có 8 ký tự"),
          passwordConfirm: Yup.string().oneOf(
            [Yup.ref("newPassword"), null],
            "Mật khẩu mới nhập lại sai"
          )
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values,resetForm)
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <TextField
                type="password"
                required
                error={
                  formik.errors.currentPassword
                    ? true
                    : formik.touched.currentPassword
                    ? false
                    : null
                }
                helperText={
                  formik.errors.currentPassword
                    ? formik.errors.currentPassword
                    : formik.touched.currentPassword
                    ? formik.touched.currentPassword
                    : ""
                }
                color={
                  formik.errors.currentPassword
                    ? "error"
                    : formik.touched.currentPassword
                    ? "success"
                    : null
                }
                focused={
                  formik.errors.currentPassword
                    ? false
                    : formik.touched.currentPassword
                    ? true
                    : null
                }
                fullWidth
                id="currentPassword"
                label="Mật khẩu hiện tại"
                size="large"
                {...formik.getFieldProps("currentPassword")}
              />
            </div>
            <div className={styles.field}>
              <TextField
                type="password"
                required
                error={
                  formik.errors.newPassword
                    ? true
                    : formik.touched.newPassword
                    ? false
                    : null
                }
                helperText={
                  formik.errors.newPassword
                    ? formik.errors.newPassword
                    : formik.touched.newPassword
                    ? formik.touched.newPassword
                    : ""
                }
                color={
                  formik.errors.newPassword
                    ? "error"
                    : formik.touched.newPassword
                    ? "success"
                    : null
                }
                focused={
                  formik.errors.newPassword
                    ? false
                    : formik.touched.newPassword
                    ? true
                    : null
                }
                fullWidth
                id="newPassword"
                label="Mật khẩu mới"
                size="large"
                {...formik.getFieldProps("newPassword")}
              />
            </div>
            <div className={styles.field}>
              <TextField
                type="password"
                required
                error={
                  formik.errors.newPasswordConfirm
                    ? true
                    : formik.touched.newPasswordConfirm
                    ? false
                    : null
                }
                helperText={
                  formik.errors.newPasswordConfirm
                    ? formik.errors.newPasswordConfirm
                    : formik.touched.newPasswordConfirm
                    ? formik.touched.newPasswordConfirm
                    : ""
                }
                color={
                  formik.errors.newPasswordConfirm
                    ? "error"
                    : formik.touched.newPasswordConfirm
                    ? "success"
                    : null
                }
                focused={
                  formik.errors.newPasswordConfirm
                    ? false
                    : formik.touched.newPasswordConfirm
                    ? true
                    : null
                }
                fullWidth
                id="newPasswordConfirm"
                label="Mật khẩu mới"
                size="large"
                {...formik.getFieldProps("newPasswordConfirm")}
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
                Xác nhận đổi mật khẩu
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default ChangePassword