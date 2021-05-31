import React from 'react';
import BurgerLogo from '../../../src/Assets/Images/burger-logo.png';
import classes from './Logo.module.css';
const logo =()=>(
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt ='MyBurger'/>
    </div>
);
export default logo;