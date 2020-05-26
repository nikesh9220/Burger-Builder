import React,{Component} from 'react'
import Aux from '../../hoc/Auxilory'
import Burger from '../../components/Burer/Burger'
import BuildControls from '../../components/Burer/BuildControls/BuildControls'
class BurgerBuilder extends Component{
    state ={
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        }
    }
render(){
    return(
        <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls/>
        </Aux>
    );
};
}
export default BurgerBuilder;