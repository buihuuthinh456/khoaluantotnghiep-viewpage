import React, { useEffect } from "react";
import styles from "./requestResetPassword.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { requestResetPasswordApi } from "../../api";
import { closeRequeopenRequestResetPassword } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

function RequestResetPassword() {
  const dispatch = useDispatch();

  const handleSubmit = async (values, func) => {
    console.log(values);
    const payload = {
      email: values.email,
    };
    const token = localStorage.getItem("accessToken");
    console.log(token);
    try {
      await toast.promise(
        requestResetPasswordApi(token, payload),
        {
          pending: "Hệ thống đang xử lý",
          success: "Gửi yêu cầu thành công 👌",
        },
        {
          style: { fontSize: "1.6rem" },
        }
      );
      toast.success("Hãy kiểm tra email của bạn", {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
      dispatch(closeRequeopenRequestResetPassword());
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
    func();
  };

  const handleCloseRequestResetPassword = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(closeRequeopenRequestResetPassword());
  };
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h1 className={styles.header}>Quên mật khẩu</h1>

      <div
        className={styles.close}
        onClick={(e) => handleCloseRequestResetPassword(e)}
      >
        <CloseIcon />
      </div>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Đây không phải là email")
            .required("Bạn phải nhập email"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <TextField
                type="email"
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
                label="Email của bạn"
                size="large"
                {...formik.getFieldProps("email")}
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
                Gửi yêu cầu
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default RequestResetPassword;
