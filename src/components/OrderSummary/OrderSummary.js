import React from 'react'
import Aux from '../../hoc/Auxilory'
import Button from '../UI/Button/Button'
const orderSummary = (props) =>
{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>{
        return <li key={igKey}><span stye={{textTransform:'capitalize'}}>{igKey}:</span>{props.ingredients[igKey]}</li>
        }) 
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Burger with following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)} </strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};
export default orderSummary;