import React from 'react'
import classes from './Order.css'
const order = (props) =>{
 const ingredients=[];
 for(let ingredientName in props.ingredients){
     ingredients.push(
         {
             ingredientName : ingredientName,
             amount : props.ingredients[ingredientName]
         }
     );
 }
 const ingredientOutput = ingredients.map(ig =>{
 return <span 
    style= 
    {{
        textTransform:'capitalize',
        display:'inline-block',
        margin:'0 8px',
        border: '1px solid #ccc',
        padding:'5px'
    }}
    key={ig.ingredientName}> {ig.ingredientName} ({ig.amount}) </span>
 })
    
    return(<div className={classes.Order}>
        <p>Ingredients :   {ingredientOutput} </p>
        <p>Price : <strong>INR {props.price}</strong></p>
    </div>)
    
};
export default order;