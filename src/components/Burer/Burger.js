import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from '../Burer/BurgerIngredient/BurgerIngredient'
import { object } from 'prop-types'
const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        debugger
        return [...Array(props.ingredients[igKey])].map(
            
            (_,i) =>{
                debugger
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            } 
        );
    });
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
export default burger;