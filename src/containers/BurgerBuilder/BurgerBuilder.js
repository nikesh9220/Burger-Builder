import React,{Component} from 'react'
import Aux from '../../hoc/Auxilory'
import Burger from '../../components/Burer/Burger'
import BuildControls from '../../components/Burer/BuildControls/BuildControls'

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
        totalPrice:45
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
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved ={this.removeIngredientHandler}
                disabled={disabledInfo}
                price = {this.state.totalPrice}
            />
        </Aux>
    );
};
}
export default BurgerBuilder;