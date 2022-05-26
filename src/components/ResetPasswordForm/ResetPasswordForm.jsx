import React from 'react'
import styles from './resetPasswordForm.module.scss'
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import {confirmChangePasswordApi} from '../../api'

import {toast} from 'react-toastify'

function ResetPasswordForm({resetCode,email}) {
    const navigate = useNavigate()
    console.log(resetCode)
    const handleConfirmResetPassword = async (values,func) => {
        const token = localStorage.getItem("accessToken")
        const query = `resetCode=${resetCode}&email=${email}`
        const payload = {
          password:values.password
        }
        console.log(payload)
        try {
            await toast.promise(confirmChangePasswordApi(token,payload,query),{
                pending:"Hệ thống đang xử lý...",
                success:"Tạo mới mật khẩu thành công"
            },{
                style:{
                    fontSize:"1.6rem"
                }
            })
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.msg,{
                style:{
                    fontSize:"1.6rem"
                }
            })
        }
        func()
    }
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h1 className={styles.header}>Tạo lại mật khẩu</h1>
      <div className={styles.close} onClick={(e) => navigate("/")}>
        <CloseIcon />
      </div>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string().min(8,"Ít nhất phải có 8 ký tự")
            .required("Thông tin này bắt buộc phải có"),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Mật khẩu nhập lại sai"
          ),
        })}
        onSubmit={(values, { resetForm }) => {
          handleConfirmResetPassword(values, resetForm);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
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
                id="password"
                label="Mật khẩu muốn tạo mới"
                size="large"
                {...formik.getFieldProps("password")}
              />
            </div>
            <div className={styles.field}>
              <TextField
                required
                error={
                  formik.errors.confirmPassword
                    ? true
                    : formik.touched.confirmPassword
                    ? false
                    : null
                }
                helperText={
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : formik.touched.confirmPassword
                    ? formik.touched.confirmPassword
                    : ""
                }
                color={
                  formik.errors.confirmPassword
                    ? "error"
                    : formik.touched.confirmPassword
                    ? "success"
                    : null
                }
                focused={
                  formik.errors.confirmPassword
                    ? false
                    : formik.touched.confirmPassword
                    ? true
                    : null
                }
                fullWidth
                type="password"
                id="confirmPassword"
                label="Nhập lại mật khẩu mới"
                size="large"
                {...formik.getFieldProps("confirmPassword")}
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
                Xác nhận
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default ResetPasswordForm