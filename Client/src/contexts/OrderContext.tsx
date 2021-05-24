import axios from 'axios';
import { Component, createContext } from 'react';

interface Product {
    id: string,
    quantity: number,
    title?: string, 
    price?: number,
    size?: number,
    category?: string   
}

interface Customer {
  adress: string,
  _id: string, 
  name: string, 
  phone: string, 
  email: string 
}

export interface Order {
  ordernumber: string, 
  products: Product[],
  customer: string,
  isSent?: boolean,
}



interface State {
  userOrders: Order[]
}

interface ContextProps extends State {
  createOrder: (orderInfo: Order) => void
  getUserOrders: (user: string) => void
}

export const OrderContext = createContext<ContextProps>({
  userOrders: [
    {
      ordernumber: '', 
      products: [],
      customer: ''
    }  
  ] 
  ,
  createOrder: (orderInfo: Order) => {},
  getUserOrders: (user: string) => {}
});

class OrderProvider extends Component<{}, State> {
  state: State = {
    userOrders: [
      {
        ordernumber: '', 
        products: [],
        customer: ''
      }
    ] 
  };

  createOrderToDb = (orderInfo: Order) => {
    axios({
        method: 'post',
        url: '/order/add-order',
        headers: {
            'Content-Type': 'application/json'
        }, 
        data: orderInfo
      });
  }

  getUserOrdersFromDb = async (user: string) => {
    const request = await axios.get(`/order/user-orders/${user}`)
    const result = request.data
    this.setState({ userOrders: result })
  }

  componentDidMount = () => {

  };

  render() {
    return (
      <OrderContext.Provider
        value={{
          userOrders: this.state.userOrders,
          createOrder: this.createOrderToDb,
          getUserOrders: this.getUserOrdersFromDb
        }}
      >
        {this.props.children}
      </OrderContext.Provider>
    );
  }
}

export default OrderProvider;