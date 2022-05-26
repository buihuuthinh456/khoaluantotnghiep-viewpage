import React from 'react'
import Modal from '../../components/Modal/Modal'
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm'

import styles from './resetPassword.module.scss'

import { toast } from 'react-toastify'

function ResetPassword() {
    const queryURL = window.location.search;
    const queryObject = new URLSearchParams(queryURL);
    let paramObj = {};
    for (var value of queryObject.keys()) {
    paramObj[value] = queryObject.get(value);
    }
    const {resetCode,email} = paramObj
    // console.log(resetCode)

  return (
    <Modal>
        <ResetPasswordForm resetCode={resetCode} email={email}/>
    </Modal>
  )
}

export default ResetPassword