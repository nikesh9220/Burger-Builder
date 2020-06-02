import React from 'react'
import Modal from '../../components/UI/Model/Model'
import Aux from '../Auxilory/Auxilory'

const withErrorHandler = (WrappedComponent)=>{
    return(props) =>{
        return (
            <Aux>
                <Modal>Something went wrong....!</Modal>
                <WrappedComponent {...props}/>
             </Aux>
            ); 
            
    };
};

export default withErrorHandler;