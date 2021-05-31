import axios from 'axios';
import { Component, createContext } from 'react';

export interface  deliveris{
    name: string
    price: number
    days: string
    _id: string
}

interface State {
  DeliverOrders: deliveris[]
  selectDeliver: deliveris 
}

interface ContextProps extends State {
   getdeliverOrder: () => void
   fetchshiping: (id: string) => void
}

export const DeliveryContext = createContext<ContextProps>({
    selectDeliver: {
      name:"",
      days:"",
      price: 0,
      _id: ""
    },

    DeliverOrders: [],
    getdeliverOrder:() => {},
    fetchshiping:(id: string)=>{}
});

class DeliveryProvider extends Component<{}, State> {
  state: State = {
    DeliverOrders: [
      {
        name: '', 
        days: '',
        price: 0,
        _id: ""
      }
    ],  
    selectDeliver: {
      name:"",
      days:"",
      price: 0,
      _id: ""
    },

  };

  getDeliveryOrderFromDB = async () => {
    const request = await axios.get(`/Shiping/getall`)
    const result: deliveris[] = request.data
    this.setState({DeliverOrders:result})
    console.log(result)
  } 

  fetchSpecificshiping = async (id: string) => {
   const request = await axios.get(`/Shiping/${id}`) 
   this.setState({selectDeliver: request.data})
   console.log(request.data)
  };

  componentDidMount = () => {
    this.getDeliveryOrderFromDB()
  };

  render() {
    return (
      <DeliveryContext.Provider
        value={{
        ...this.state, 
        getdeliverOrder: this.getDeliveryOrderFromDB,
        fetchshiping: this.fetchSpecificshiping
        }}
      >
        {this.props.children}
      </DeliveryContext.Provider>
    );
  }
}

export default DeliveryProvider;