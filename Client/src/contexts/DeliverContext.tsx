import axios from 'axios';
import { Component, createContext } from 'react';

export interface  deliveris{
    name: string
    price: number
    days: string
}

interface State {
  DeliverOrders: deliveris[]
}

interface ContextProps extends State {
   getdeliverOrder: () => void
}

export const DeliveryContext = createContext<ContextProps>({
    DeliverOrders: [],
    getdeliverOrder:() => {}
});

class DeliveryProvider extends Component<{}, State> {
  state: State = {
    DeliverOrders: [
      {
        name: '', 
        days: '',
        price: 0
      }
    ] 
  };

  getDeliveryOrderFromDB = async () => {
    const request = await axios.get(`/Shiping/getall`)
    const result: deliveris[] = request.data
    this.setState({DeliverOrders:result})
    console.log(result)
  } 

  
  componentDidMount = () => {
    this.getDeliveryOrderFromDB()
  };

  render() {
    return (
      <DeliveryContext.Provider
        value={{
        ...this.state, 
        getdeliverOrder: this.getDeliveryOrderFromDB
        }}
      >
        {this.props.children}
      </DeliveryContext.Provider>
    );
  }
}

export default DeliveryProvider;