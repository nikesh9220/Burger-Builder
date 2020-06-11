import React,{Component} from 'react'
import Modal from '../../components/UI/Model/Model'
import Aux from '../Auxilory/Auxilory'

const withErrorHandler = (WrappedComponent,axios)=>{
    return class extends Component {
        state ={
            error:null
        }
        modalClickHandler = () =>{
            
            this.setState({
                error:null
            })
        }
        componentwillMount(){
           this.reqInterceptors = axios.interceptors.request.use(req =>{
            
                this.setState({
                    error : null
                })
                return req;
            })
            this.respInterceptors =axios.interceptors.response.use(resp => resp ,error =>{
                debugger
                this.setState({
                    error : error
                })
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.respInterceptors);
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