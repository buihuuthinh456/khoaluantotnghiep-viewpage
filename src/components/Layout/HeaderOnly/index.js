import React from 'react'
import styles from './HeaderOnly.module.scss'
import UserController from '../../UserController/UserController'
import Navbar from '../../Navbar/Navbar'

function HeaderOnly({children}) {
  return (
    <div>
        <div className={styles.userController}>
          <UserController />
        </div>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.content}>
            {children}
        </div>
    </div>
  )
}

export default HeaderOnly