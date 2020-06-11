import React from 'react';
import Burger from '../../Burer/Burger';
import Button from '../../UI/Button/Button';
import classes from  './CheckoutSummary.css'
const checkoutSummary = (props) =>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Happy to serve you.!</h1>
            <div style={{width:'100%', height:'300px', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked>Cancel</Button>
            <Button btnType="Success" clicked>Checkout </Button>
        </div>
    )
}
export default checkoutSummary;