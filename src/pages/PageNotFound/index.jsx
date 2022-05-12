import React from 'react'
import styles from './PageNotFound.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.header}>
            <h1>
              404
            </h1>
            <h1>PAGE NOT FOUND</h1>
        </div>
        <div className={styles.content}>
          <span>Trang bạn đang tìm kiếm đã bị xóa bỏ, hoặc tên đã thay đổi</span>
          <div className={styles.button}>
            <Button variant='contained' onClick={()=>navigate('/')}>Về trang chủ</Button> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound