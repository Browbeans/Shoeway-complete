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
  email: string,
}

export interface Order {
  ordernumber: string, 
  products: Product[],
  customer: string,
  isSent?: boolean,
  orderAmount: Number
}

interface State {
  userOrders: Order[],
  allOrders: [],
  orderNumber: string
}

interface ContextProps extends State {
  allOrders: []
  createOrder: (orderInfo: Order) => void
  getUserOrders: (user: string) => void
  fetchAllOrders: () => void
  setOrderNumber: (ordernumber: string) => void
}

export const OrderContext = createContext<ContextProps>({
  userOrders: [
    {
      ordernumber: '', 
      products: [],
      customer: '',
      orderAmount: 0
    }  
  ],
  allOrders: [],
  fetchAllOrders: () => {},
  orderNumber: '',
  createOrder: (orderInfo: Order) => {},
  getUserOrders: (user: string) => {}, 
  setOrderNumber: (ordernumber: string) => {}
});

class OrderProvider extends Component<{}, State> {
  state: State = {
    userOrders: [
      {
        ordernumber: '', 
        products: [],
        customer: '',
        orderAmount: 0
      }
    ],
    allOrders: [],
    orderNumber: '' 
  };

  createOrderToDb = (orderInfo: Order) => {
    console.log(orderInfo)
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

  fetchAllOrdersRequest = async () => {
    try {
      const request = await axios.get('/order/all-orders');
      this.setState({ allOrders: request.data })
    } catch (error) {
      console.log(error) 
    }
  }

  setOrderNumberToState = (ordernumber: string) => {
    this.setState({ orderNumber: ordernumber})
  }

  componentDidMount = () => {

  };

  render() {
    return (
      <OrderContext.Provider
        value={{
          userOrders: this.state.userOrders,
          allOrders: this.state.allOrders,
          createOrder: this.createOrderToDb,
          getUserOrders: this.getUserOrdersFromDb,
          fetchAllOrders: this.fetchAllOrdersRequest,
          orderNumber: this.state.orderNumber,
          setOrderNumber: this.setOrderNumberToState
        }}
      >
        {this.props.children}
      </OrderContext.Provider>
    );
  }
}

export default OrderProvider;