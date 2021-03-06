import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
class Checkout extends Component{

    state={
        ingredients:null,
        totalPrice : 0
    }
    componentWillMount(){
        
       const query = new URLSearchParams(this.props.location.search);
       const ingredients={};
       let totalPrice = 0;
       for(let param of query.entries()){
           //['salad',1]
           //param[0]=salad
           //param[1]=1
           if(param[0] === 'price'){
                totalPrice = param[1];
           }
           else{
            ingredients[param[0]]= +param[1];
           }
           
       }
       this.setState({ingredients:ingredients,totalPrice:totalPrice})
       
    }
    render(){
        
    this.checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }
    this.checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data')
    }
        return(
        <div>
            <CheckoutSummary ingredients={this.state.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients}
                                                     totalPrice={this.state.totalPrice}
                                                     {...props}
                         />)}
            />
        </div>)
    }
}
export default Checkout;