import React from 'react'
import styles from './modal.module.scss'
import { useSelector, useDispatch} from 'react-redux'
import { selectModal, closeLoginModal, closeRegisterModal } from '../../features/modal/modalSlice'

function Modal({children}) {

  const dispatch = useDispatch()
  const modalState = useSelector(selectModal)

  const handleOpenModal = () => {
    if (modalState.openLogin) {
      dispatch(closeLoginModal())
    }
    if (modalState.openRegister) {
      dispatch(closeRegisterModal())
    }
  }

  return (
    <div className={styles.container} onClick={()=>handleOpenModal()}>
        {children}
    </div>
  )
}

export default Modal