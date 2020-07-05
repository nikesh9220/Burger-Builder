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
            value: props.value,
            validation:{
                required:true,
                minLength: props.minLength,
                maxLength: props.maxLength
            },
            valid:false,
            touched:false
        }
    }
    state = {
        orderForm:{
            name:this.config({elementType:'input',type: 'text',placeholder:'Please Enter Your Name',value:''}),
            zipcode:this.config({elementType:'input',type: 'text',placeholder:'Please Enter Zipcode',value:'',minLength:5,maxLength:5}),
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
    checkValidity(value,rules){
        debugger
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid;
            }
            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid ;
            }
        }
        
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
        this.setState({loading:true})
        const formData = {};
        debugger
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }
        
        const order ={
            ingredients: this.props.ingredients,
            price:this.props.totalPrice,
            customer:formData
            

        }
        axios.post('orders.json',order)
        .then(response => 
            this.setState({loading:false},
            this.props.history.push('/')
         ))
        .catch(error => this.setState({loading:false}))
    }
    inputChangedHadler =(event,inputIdentifier) =>{
        
        //Fetch Old state
        const updatedOrderForm = {...this.state.orderForm};
        updatedOrderForm[inputIdentifier].value = event.target.value;
        updatedOrderForm[inputIdentifier].valid = this.checkValidity(event.target.value,updatedOrderForm[inputIdentifier].validation)
        updatedOrderForm[inputIdentifier].touched = true;
        console.log(updatedOrderForm)
        this.setState({
            orderForm:updatedOrderForm
        })
    }
    render(){
        let formElementArray= [];
        for(let key in this.state.orderForm){
            
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
                
            });
        }
        let form = (
        <form onSubmit={this.orderHandler}>
            {
                formElementArray.map(formElement =>{
                    return(
                        <Input 
                            key={formElement.id}
                            elementType={
                             formElement.config.elementType} 
                             elementConfig={formElement.config.elementConfig} 
                             elementValue={formElement.config.value}
                             invalid={!formElement.config.valid}
                             shouldValidate={formElement.config.validation}
                             touched={formElement.config.touched}
                             changed={(event) => this.inputChangedHadler(event,formElement.id)}
                             /> 
                    );
                })
            }
            {/* <Input  lable="Email" type="text" name="email" placeholder="Enter Your Email"/>
            <Input  lable="Street" type="text" name="street" placeholder="Enter Your Street"/>
            <Input  lable="Postal Code" type="text" name="postalcode" placeholder="Enter Your Postal Code"/> */}
            <Button btnType="Success" >ORDER</Button>
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
