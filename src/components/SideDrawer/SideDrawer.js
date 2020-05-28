import React from 'react'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from '../UI/Model/Backdrop/Backdrop'
import Aux from '../../hoc/Auxilory'
const sideDrawer = (props) =>{
return(
    <Aux>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={[classes.SideDrawer,props.open ? classes.Open : classes.Close].join(' ')} >
        <div className={classes.Logo}>
        <Logo/>
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </div>
    </Aux>

);
};


export default sideDrawer;