import React, { useEffect, useState, useRef } from "react";
import styles from "./userController.module.scss";
import styled from "styled-components";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ChangePassword from "../ChangePassword/ChangePassword";
import RequestResetPassword from "../RequestResetPassword/RequestResetPassword";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useSelector, useDispatch } from "react-redux";
import {
  selectModal,
  openLoginModal,
  openRegisterModal,
  openChangePassword
} from "../../features/modal/modalSlice";
import { selectLogin, logOut } from "../../features/login/loginSlice";
import {setEmptyCart} from '../../features/cart/cartSlice'
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";


function UserController() {
  const dispatch = useDispatch();
  const modalState = useSelector(selectModal);
  const loginState = useSelector(selectLogin);
  const [userData, setUserData] = useState([]);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    setUserData(loginState.info);
    setUserLogin(loginState.isLogin);
  }, [loginState.isLogin]);

  return (
    <div className={styles.container}>
      {userLogin ? (
        <div className={styles.userInfo}>
          <span>Chào {userData.name}</span>
        </div>
      ) : (
        <div></div>
      )}

      {!userLogin ? (
        <div className={styles.userController}>
          <div
            className={styles.register}
            onClick={() => dispatch(openRegisterModal())}
          >
            <span>Đăng ký</span>
            <RegisterIcon />
          </div>
          <div
            className={styles.login}
            onClick={() => dispatch(openLoginModal())}
          >
            <span>Đăng nhập</span>
            <UserIcon />
          </div>
        </div>
      ) : (
        <div className={styles.userController}>
          <div className={styles.userAvatar}>
              <img src='/images/user-image.jpg' alt='user-ava'></img>
              <ul className={styles.avatarOptionList}>
                <li className={styles.avatarOptionItem} onClick={() => {dispatch(logOut());dispatch(setEmptyCart())}}>
                  <span>Đăng xuất</span>
                  <LogOutIconCustom />
                </li>
                <li className={styles.avatarOptionItem} onClick={() => {dispatch(openChangePassword())}}>
                  <span>Đổi mật khẩu</span>
                  <LogOutIconCustom />
                </li>
                <li className={styles.avatarOptionItem} onClick={() => console.log("Khác")}>
                  <span>Lịch sử giao dịch</span>
                  <LogOutIconCustom />
                </li>
                <li className={styles.avatarOptionItem} onClick={() => console.log("Khác")}>
                  <span>Cài đặt</span>
                  <LogOutIconCustom />
                </li>
              </ul>
          </div>

        </div>
      )}

      {modalState.openLogin && (
        <Modal>
          <Login></Login>
        </Modal>
      )}
      {modalState.openRegister && (
        <Modal>
          <Register></Register>
        </Modal>
      )}
       {modalState.openChangePassword && (
        <Modal>
          <ChangePassword></ChangePassword>
        </Modal>
      )}
      {modalState.openRequestResetPassword && (
        <Modal>
          <RequestResetPassword></RequestResetPassword>
        </Modal>
      )}
    </div>
  );
}

export default UserController;

const RegisterIcon = styled(HowToRegIcon)`
  font-size: 2rem;
  color: white;
  margin-left: 4px;
`;

const UserIcon = styled(PersonOutlineIcon)`
  font-size: 2rem;
  color: white;
  margin-left: 4px;
`;

const HelpIconCustom = styled(HelpIcon)`
  font-size: 2rem;
  color: white;
  margin-left: 4px;
`;

const LogOutIconCustom = styled(LogoutIcon)`
  font-size: 2rem;
  color: #000;
  margin-left: 4px;
`;
