import React from 'react'
import styles from './userController.module.scss'
import styled from 'styled-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function UserController() {
  return (
    <div className={styles.container}>
        <div className={styles.userInfo}>
            <span>toanton0911@gmail.com</span>
        </div>

        <div className={styles.userController}>
            <div className={styles.currency}>
                <span>
                    USD
                </span>
                <ArrowDown />
            </div>
            <div className={styles.login}>
                <span>
                    Login
                </span>
                <UserIcon />
            </div>
        </div>
    </div>
  )
}

export default UserController

const ArrowDown = styled(KeyboardArrowDownIcon)`
    font-size: 2rem;
    color: white;
`

const UserIcon = styled(PersonOutlineIcon)`
    font-size: 2rem;
    color: white;
    margin-left: 4px;
`

const ShoppingCart = styled(ShoppingCartOutlinedIcon)`
    cursor: pointer;
    font-size: 2rem;
    color: white;
`