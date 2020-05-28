import React,{Component} from 'react'
import classes from './Model.css'
import Aux from '../../../hoc/Auxilory'
import Backdrop from '../../UI/Model/Backdrop/Backdrop'

class Modal extends Component{
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.show !== this.props.show;
  }
  componentWillUpdate(){
      console.log('MOdal')
  }
    render(){
        return(
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className={classes.Modal}
            style={{
                transform:this.props.show? 'translateY(0)':'translateY(-100vh)',
                opacity: this.props.show ? '1':'0'
            }}>
            {this.props.children}
        </div>
        </Aux>
        )
    }
}


export default Modal;