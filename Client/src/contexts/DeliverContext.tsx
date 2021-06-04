import axios from 'axios';
import { Component, createContext } from 'react';

export interface  Deliveris{
    name: string
    price: number
    days: string
    _id: string
}

interface State {
  DeliverOrders: Deliveris[]
  selectDeliver: Deliveris 
  date: string
}

interface ContextProps extends State {
   getdeliverOrder: () => void
   fetchshiping: (selectshiping: Deliveris) => void
    setDate: (randomDay: number) => void
   
}

export const DeliveryContext = createContext<ContextProps>({
    selectDeliver: {
      name:"",
      days:"",
      price: 0,
      _id: ""
    },
    setDate: () => {},
    DeliverOrders: [],
    getdeliverOrder:() => {},
    fetchshiping:(selectshiping: Deliveris)=>{},
    date: ""
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
    date: ""
  };

  getDeliveryOrderFromDB = async () => {
    const request = await axios.get(`/Shiping/getall`)
    const result: Deliveris[] = request.data
    this.setState({DeliverOrders:result})
  } 

  setSelectShiping = async (selectshiping: Deliveris) => {
   this.setState({selectDeliver: selectshiping})  
  };

  addShippingDate = ( randomDay: number) => {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + (Math.floor(Math.random() * randomDay) + 2));
    let deliverDay = tomorrow.toString().split(' ')[0]
    let deliverDate = tomorrow.toString().split(' ')[2]
    let deliverMonth = tomorrow.toString().split(' ')[1]
    
    this.setState({

      date: deliverDay + ' ' + deliverDate + ' ' + deliverMonth
    })
  }

  componentDidMount = () => {
    this.getDeliveryOrderFromDB()
  };

  render() {
    return (
      <DeliveryContext.Provider
        value={{
        ...this.state, 
        getdeliverOrder: this.getDeliveryOrderFromDB,
        fetchshiping: this.setSelectShiping,
        setDate: this.addShippingDate
        }}
      >
        {this.props.children}
      </DeliveryContext.Provider>
    );
  }
}

export default DeliveryProvider;