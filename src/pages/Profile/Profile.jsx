import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import Modal from "../../components/Modal/Modal";
import Loading from "../../components/Loading/Loading";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid } from "@mui/x-data-grid";

import DetailOrder from "../../components/DetailOrder/DetailOrder";

import { toast } from "react-toastify";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectsProfile,
  getHistoryPayment,
} from "../../features/profile/profileSlice";
import { selectLogin } from "../../features/login/loginSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector(selectLogin);
  const history = useSelector(selectsProfile).history;
  const isLoading = useSelector(selectsProfile).isLoading;

  const [mountForm, setMountForm] = useState(false);
  const [dataRow, setDataRow] = useState(null);

  useEffect(() => {
    dispatch(getHistoryPayment());
    if (!loginState.isLogin) {
      navigate("/login");
      toast.warning("You have to login", {
        style: {
          fontSize: "1.6rem",
        },
      });
    }

    window.scrollTo(500,500)
  }, []);

  const handleSwitchPage = () => {
    if (loginState.isLogin && loginState.isAdmin) {
      setMountForm((state) => !state);
      setDataRow(null);
    } else {
      toast.error(`You haven't login or not admin`, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
  };

  const columns = [
    { field: "id", headerName: "STT", width: 50 },
    { field: "transId", headerName: "Mã giao dịch", width: 150 },
    {
      field: "amount",
      headerName: "Tổng đơn hàng",
      width: 150,
    },
    // { field: "username", headerName: "username", flex: 1 },
    { field: "createdAt", headerName: "Ngày giao dịch", flex: 2 },
    {
      field: "Option",
      headerName: "Option",
      flex: 1,
      renderCell: (param) => {
        const handleDetail = (e) => {
          e.stopPropagation();
          setMountForm(true);
          setDataRow(param.row);
        };
        return (
          <div className={styles.option}>
            <div className={styles.optionEdit}>
              <Button
                variant="contained"
                color="success"
                sx={{
                  fontSize: "1.2rem",
                }}
                onClick={(e) => handleDetail(e)}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const rows =
    history &&
    history.map((item, index) => {
      return {
        ...item,
        id: index + 1,
        createdAt: item.createdAt,
      };
    });

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Profile</h2>

      <div className={styles.card}>
        <div className={styles.imgWrapper}>
          <img src="images/user-image.jpg" alt="avatar-user" />
        </div>

        <ul className={styles.profile}>
          <li className={styles.userProfile}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Tên người dùng"
              variant="standard"
              value={loginState.info.name}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </li>
          <li className={styles.userProfile}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Địa chỉ email"
              variant="standard"
              value={loginState.info.email}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </li>

          {/* <div className={styles.options}>
            <div className={styles.btnOptions}>
              <Button variant="contained">Change PassWord</Button>
            </div>
          </div> */}
        </ul>
      </div>

      <div className={styles.history}>
        <h2 className={styles.header}>Lịch sử giao dịch</h2>
        {history === null || history.length === 0 ? (
          <h2>Bạn không có lịch sử mua hàng</h2>
        ) : (
          <>
            {!mountForm ? (
              ""
            ) : (
              <div className={styles.headerButton}>
                <Button variant="contained" onClick={() => handleSwitchPage()}>
                  <ArrowBackIcon style={{ fontSize: 20 }} />
                  Back
                </Button>
              </div>
            )}

            <div className={styles.historyContainer}>
              {!mountForm ? (
                <DataGrid
                  style={{ fontSize: "1.6rem" }}
                  rows={rows}
                  columns={columns}
                  pageSize={8}
                  rowsPerPageOptions={[5]}
                  autoHeight
                  //   onRowClick={(e) => console.log("user select", e.row)}
                  // checkboxSelection
                />
              ) : (
                <DetailOrder dataRow={dataRow} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
