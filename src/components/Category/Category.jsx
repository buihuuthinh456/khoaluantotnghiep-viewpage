import React, { useEffect } from 'react'
import styles from './category.module.scss'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Bounce, Fade, Rotate, Reveal } from 'react-awesome-reveal';
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, getCategoriesAsync } from "../../features/category/categorySlice";
import Loading from '../Loading/Loading';

function Category() {

    const dispatch = useDispatch()
    const categoryState = useSelector(selectCategory)

    useEffect(()=>{
        dispatch(getCategoriesAsync())
    }, [])

    const data = categoryState.categories

    if (categoryState.isLoading) return (
        <div className={styles.loading}>
            <Loading></Loading>
        </div>    
    )
  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <div className={styles.titleIcon}>
                <MenuIcon style={{fontSize: '2rem'}}/>
            </div>
            <span>Category</span>
        </div>
        <ul className={styles.list}>
            <Reveal
                cascade= {true}
                triggerOnce={true}
                duration={500}
            >
                {data && data.map((item, index) => (
                    <li key={index} className={styles.item}>
                        <Link to={`/category/${item.name}`} className={styles.itemLink}>
                            <ArrowForwardIosIcon style={{fontSize: '1.6rem', color: '#333'}}/>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </Reveal>
        </ul>
    </div>
  )
}

export default Category