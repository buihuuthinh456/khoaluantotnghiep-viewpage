import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import './homeCategory.scss'
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function HomeCategory() {
    const data = [
        {
            name: 'All Product',
        }, 
        {
            name: 'SemiConductor'
        }, 
        {
            name: 'Passive Components'
        }, 
        {
            name: 'Embedded Solutions'
        }, 
        {
            name: 'Sensors'
        }, 
        {
            name: 'LED-LCD'
        }, 
        {
            name: 'Enclosures'
        }, 
        {
            name: 'Connectors'
        }, 
        {
            name: 'Power'
        }, 
        {
            name: 'Other'
        },
    ]
  return (
    <div className='homeCategory'>
        <div className="homeCategory__title">
            <div className="homeCategory__title-icon">
                <MenuIcon style={{fontSize: '2rem'}}/>
            </div>
            <span>Category</span>
        </div>

        <ul className="homeCategory__list">
            {data && data.map((item, index) => (
                <li key={index} className="homeCategory__item">
                    <Link to='/' className='homeCategory__item-link'>
                        <ArrowForwardIosIcon style={{fontSize: '1.6rem'}}/>
                        <span>{item.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default HomeCategory