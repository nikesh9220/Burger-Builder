import React,{Component} from 'react'
import Aux from '../../hoc/Auxilory'
import Burger from '../../components/Burer/Burger'
class BurgerBuilder extends Component{
render(){
    return(
        <Aux>
            <Burger/>
            <div>Build Controls</div>
        </Aux>
    );
};
}
export default BurgerBuilder;