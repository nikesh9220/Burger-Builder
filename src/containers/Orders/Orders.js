import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component{
    state= {
        orders:[],
        loading :true
    }
    componentDidMount()
    {
          axios.get('orders.json')
         .then(response => {
            let fetchOrders = [];
            for(let key in response.data){
                fetchOrders.push({
                    ...response.data[key],
                    id:key
                });
            }
            this.setState({orders:fetchOrders,loading:false})
            //this.setState({orders : response.data});
         })
         .catch(error => this.setState({loading:false}));
    }
    render(){
        return (
            <div>
               {this.state.orders.map(order =>(
                   <Order key={order.key}
                        ingredients={order.ingredients}
                        price={order.price}
                   />
               ))}
            </div>
        );
    }
}

export default  withErrorHandler(Orders,axios);