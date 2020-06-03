import React,{Component} from 'react'
import Modal from '../../components/UI/Model/Model'
import Aux from '../Auxilory/Auxilory'

const withErrorHandler = (WrappedComponent,axios)=>{
    return class extends Component {
        state ={
            error:null
        }
        modalClickHandler = () =>{
            debugger;
            this.setState({
                error:null
            })
        }
        componentwillMount(){
            axios.interceptors.request.use(req =>{
                debugger
                this.setState({
                    error : null
                })
                return req;
            })
            axios.interceptors.response.use(resp => resp ,error =>{
                debugger
                this.setState({
                    error : error
                })
            })
        }
        render(){
            return(
                <Aux>
                 <Modal 
                 show={this.state.error}
                 modalClosed={this.modalClickHandler}>
                     {this.state.error ?this.state.error.message:null}</Modal>
                 <WrappedComponent {...this.props}/>
                </Aux>
                )};
    };
};

export default withErrorHandler;