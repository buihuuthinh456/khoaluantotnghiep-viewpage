import React from 'react'
import './userController.scss'
import styled from 'styled-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function UserController() {
  return (
    <div className='container'>
        <div className="user-info">
            <span>toanton0911@gmail.com</span>
        </div>

        <div className="user-controller">
            <div className="currency">
                <span>
                    USD
                </span>
                <ArrowDown />
            </div>
            <div className="login">
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