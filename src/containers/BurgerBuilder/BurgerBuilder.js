import React,{Component} from 'react'
import Aux from '../../hoc/Auxilory'
import Burger from '../../components/Burer/Burger'
import BuildControls from '../../components/Burer/BuildControls/BuildControls'
import Modal from '../../components/UI/Model/Model'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
const INGREDIENTS_PRICES ={
            salad:23,
            bacon:10,
            cheese:28,
            meat:70
};

class BurgerBuilder extends Component{
    state ={
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:45,
        purchasable : false,
        purchasing:false
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
        alert("You Can Continue!")
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
        debugger;
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
    return(
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                <OrderSummary ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCanceledHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}
                ></OrderSummary>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved ={this.removeIngredientHandler}
                disabled={disabledInfo}
                price = {this.state.totalPrice}
                purchasable= {this.state.purchasable}
                ordered={this.purchaseHandler}
            />
        </Aux>
    );
};
}
export default BurgerBuilder;