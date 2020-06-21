import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spiner from '../../../components/UI/Spiner/Spiner'
import Input from '../../../components/UI/Input/Input'
// import { elementType } from 'prop-types';
class ContactData extends Component{
    config = (props) =>{
        return{
            elementType : props.elementType,
            elementConfig:{
                type: props.type,
                placeholder : props.placeholder 
            },
            value: props.value
        }
    }
    state = {
        orderForm:{
            name:this.config({elementType:'input',type: 'text',placeholder:'Please Enter Your Name',value:''}),
            zipcode:this.config({elementType:'input',type: 'text',placeholder:'Please Enter Zipcode',value:''}),
            country:this.config({elementType:'input',type: 'text',placeholder:'Please Enter Country',value:''}),
            email:this.config({elementType:'input',type: 'text',placeholder:'Please Enter Email',value:''}),
            deliveryMethod:{
                elementType:'select',
                elementConfig :{
                    type:'select',
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'chipest',displayValue:'Chipest'},
                    ],
                    value:''
                }
                
            },
        }
            
        //     address:'',
        //         street:'Nadiad',
        //         zipcode:'000111',
        //         country:'India',
        //     email:'test@burger.com',
        // deliveryMethod:'fastest'
    }
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
        this.setState({loading:true})
        debugger
        const order ={
            ingredients: this.props.ingredients,
            price:this.props.totalPrice,
            
            

        }
        axios.post('orders.json',order)
        .then(response => 
            this.setState({loading:false},
            this.props.history.push('/')
         ))
        .catch(error => this.setState({loading:false}))
    }
    render(){
        let formElementArray= [];
        for(let key in this.state.orderForm){
            debugger
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
                
            });
        }
        let form = (
        <form>
            {
                formElementArray.map(formElement =>{
                    return(
                        <Input 
                            key={formElement.id}
                            elementType={
                             formElement.config.elementType} 
                             elementConfig={formElement.config.elementConfig} 
                             elementValue={formElement.config.value}
                             /> 
                    );
                })
            }
            {/* <Input  lable="Email" type="text" name="email" placeholder="Enter Your Email"/>
            <Input  lable="Street" type="text" name="street" placeholder="Enter Your Street"/>
            <Input  lable="Postal Code" type="text" name="postalcode" placeholder="Enter Your Postal Code"/> */}
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if(this.state.loading){
            form= <Spiner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        );
    }
}
export default ContactData;
