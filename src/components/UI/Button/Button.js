import React from 'react'
import classes from './Button.css'
const button = (props) =>(
    <buttton 
        onClick={props.clicked}
        type={props.type}
        className={[classes.Button,classes[props.btnType]].join(' ')}
        >
        {props.children}
    </buttton>
)
export default button;