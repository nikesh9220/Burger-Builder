import React,{Component} from 'react'
import Aux from '../../hoc/Auxilory/Auxilory'
import Burger from '../../components/Burer/Burger'
import BuildControls from '../../components/Burer/BuildControls/BuildControls'
import Modal from '../../components/UI/Model/Model'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spiner from '../../components/UI/Spiner/Spiner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INGREDIENTS_PRICES ={
            salad:23,
            bacon:10,
            cheese:28,
            meat:70
};

class BurgerBuilder extends Component{
    componentDidMount(){
        axios.get('https://react-my-burger-91121.firebaseio.com/ingredients.json')
        .then(resp => {
            const ingredinets = resp.data
            Object.keys(ingredinets)
                        .map(igKey =>{
                            debugger
                            if(ingredinets[igKey] > 0){
                                this.priceCalculator(igKey,ingredinets[igKey])
                            }
                            
                return ingredinets[igKey]
            });
            this.setState({
                ingredients:resp.data
            })
        })
        .catch(error => {this.setState({error:true})})
    }
    priceCalculator = (type,amount) => {
        
        let priceAddition = INGREDIENTS_PRICES[type];
        priceAddition = priceAddition* amount;
        const newPrice = this.state.totalPrice + priceAddition ;
        this.setState ({
          totalPrice:newPrice,
          
        })
    }
    state ={
        ingredients: null,
        totalPrice:40,
        purchasable : false,
        purchasing:false,
        loading:false,
        error:false
    }
    purchaseHandler = () =>{
        this.setState({
            purchasing:true
        });
    }
    purchaseCanceledHandler = () =>{
        this.setState({
            purchasing:false
        });
    }
    purchaseContinueHandler = () =>{
        //alert("You Can Continue!")
        // this.setState({loading:true})
        // const order ={
        //     ingredients: this.state.ingredients,
        //     price:this.state.totalPrice,
        //     customer:{
        //         name:'Nikesh Pandya',
        //         address:{
        //             street:'Nadiad',
        //             zipcode:'000111',
        //             country:'India'
        //         },
        //         email:'test@burger.com',
        //     },
        //     deliveryMethod:'fastest'
            

        // }
        // axios.post('orders.json',order)
        // .then(response => this.setState({loading:false,purchasing:false}))
        // .catch(error => this.setState({loading:false,purchasing:false}))
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        };
        queryParams.push('price='+ this.state.totalPrice)
        debugger
        let param = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?'+param
        });
    }
    updatePurchaseble = (ingredinets) =>{
        const sum = Object.keys(ingredinets)
            .map(igKey =>{
                return ingredinets[igKey]
            })
            .reduce((sum,el)=>{
                return sum += el;
            },0)
            this.setState({
                purchasable: sum>0
            })
    }
    addIngredientHandler = (type) =>{
        debugger
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredient ={
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition ;
        this.setState ({
          totalPrice:newPrice,
          ingredients : updatedIngredient
        })
        this.updatePurchaseble(updatedIngredient);

    }
    removeIngredientHandler = (type) =>{
     
        const updatedCount = this.state.ingredients[type] - 1;
        if(updatedCount >= 0){
            const updatedIngredient ={
                ...this.state.ingredients
            };
            updatedIngredient[type] = updatedCount;
            const priceDeduction = INGREDIENTS_PRICES[type];
            const newPrice = this.state.totalPrice - priceDeduction ;
            this.setState ({
              totalPrice:newPrice,
              ingredients : updatedIngredient
            })
            this.updatePurchaseble(updatedIngredient);
        }
        

    }
    
render(){
    const disabledInfo ={
        ...this.state.ingredients
    }
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary= null;
    
    let burger = this.state.error?'Error While loading ingredeints...!': <Spiner/>;
    if(this.state.ingredients){
        burger =  (
        <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
            ingredientAdded = {this.addIngredientHandler} 
            ingredientRemoved ={this.removeIngredientHandler}
            disabled={disabledInfo}
            price = {this.state.totalPrice}
            purchasable= {this.state.purchasable}
            ordered={this.purchaseHandler}
        />
        </Aux>);
         orderSummary = <OrderSummary ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCanceledHandler}
          purchaseContinued={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}/>
          if(this.state.loading){
                orderSummary=<Spiner/>
        }

    }
    return(
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
               {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};
}
export default withErrorHandler(BurgerBuilder,axios);