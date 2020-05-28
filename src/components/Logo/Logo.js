import React from 'react'
import burgerLogo from '../../assets/images/Logo.png'
import classes from './Logo.css'
const logo = () =>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Niks burger"/>
    </div>
);

export default logo;