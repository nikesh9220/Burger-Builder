import React from 'react'
import classes from './Input.css'
const input = (props) =>{
    debugger
    let inputElement = null;
    switch(props.elementType){
        
        case ('input') :
            debugger;
                inputElement = <input  className={classes.InputElement} {...props.elementConfig} value={props.elementValue}/>;
                break;
        case ('textarea') : 
                inputElement = <textarea className={classes.InputElement}  {...props.elementConfig} value={props.elementValue}/>;
                break;
        case ('select') : 
        debugger
                inputElement = <select className={classes.InputElement} value={props.elementValue}> 
                                {
                                 props.elementConfig.options.map(option => (
                                 <option key={option.displayValue} value={option.value}>{option.displayValue}</option>
                                ))
                                
                                }
                                </select>;
                break;
        default : 
                inputElement = <input  className={classes.InputElement} {...props.elementConfig} value={props.elementValue}/>
                

    }
    return(
        <div className={classes.Input}>
            <label className={classes.Lable}>{props.lable}</label>
            {inputElement}
        </div>
    );
}

export default input;