import React, { Component, createContext } from 'react'

interface Customer {
  name: string, 
  adress: string, 
  phone: string, 
  email: string
  zip: string, 
}

interface Delivery {
  company: string, 
  date: string
}

interface State{
  shippingPriceState: number,
  name: string,
  adress: string, 
  phone: string, 
  email: string, 
  zip: string,
  user: Customer, 
  delivery: Delivery, 
  company: string, 
  date: string
  shopState: boolean
  isFilled: boolean
}
interface ContextProp extends State {
  addName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addAdress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addPhone: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addZip: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addToObject: (event: React.FormEvent) => void;
  addDelivery: (deliverCompany: string, randomDay: number, addNumber: number, shippingPrice: number) => void; 
  shopStateTrue: () => void;
  shopStateFalse: () => void;
  filledState: (filled: boolean) => void;
}
export const UserContext = createContext<ContextProp>({
  name: "",
  shippingPriceState: 0,
  adress: "", 
  phone: '', 
  email: '',
  zip: '',
  user: {
    name: "",
    adress: '',
    phone: '', 
    email: '',
    zip: ''
  },
  delivery: {
    company: '', 
    date: ''
  },
  date: '', 
  company: '',
  shopState: false, 
  isFilled: false,  
  addName: () => {},
  addAdress: () => {},
  addPhone: () => {},
  addEmail: () => {},
  addZip: () => {},
  addToObject: () => {},
  addDelivery: () => {},
  shopStateTrue: () => {}, 
  shopStateFalse: () => {}, 
  filledState: () => {}
});

export default class UserProvider extends Component<{}, State> {
  state: State = {
    name: '',
    shippingPriceState: 0,
    adress: '',
    phone: '', 
    email: '',
    zip: '',
    user: {
      name: '',
      adress: '',
      phone: '', 
      email: '',
      zip: ''
    },
    delivery: {
      company: '', 
      date: ''
    },
    date: '', 
    company: '',
    shopState: false,
    isFilled: false,
  };

  setShopStateTrue = () => {
    this.setState({shopState: true})
  }
  setShopStateFalse = () => {
    this.setState({shopState: false})
  }

  setFilledState = (filled: boolean) => {
    this.setState({isFilled: filled})
  }


  addNameToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ user: { ...this.state.user, name: event.target.value } });
  };
  addAdressToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({adress: event.target.value});
  };
  addPhoneToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({phone: event.target.value});
  };
  addEmailToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({email: event.target.value});
  };
  addZipToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({zip: event.target.value});
  };
  addDeliveryToState = (deliverCompany: string, randomDay: number, addNumber: number, shippingPrice: number) => {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + (Math.floor(Math.random() * randomDay) + addNumber));
    let deliverDay = tomorrow.toString().split(' ')[0]
    let deliverDate = tomorrow.toString().split(' ')[2]
    let deliverMonth = tomorrow.toString().split(' ')[1]
    
    this.setState({
      shippingPriceState: shippingPrice,
      company: deliverCompany,
      date: deliverDay + ' ' + deliverDate + ' ' + deliverMonth
    })
  }

  addInputsToObject = (event: React.FormEvent) => {
    event.preventDefault();
    const newCustomer = {
      name: this.state.user.name,
      adress: this.state.adress, 
      phone: this.state.phone, 
      email: this.state.email,
      zip: this.state.zip
    }
    
    // Name Input 
  if (this.state.user.name !== "") {

    // Adress Input
    if (this.state.adress !== "") {

      // Phone Input
      if (this.state.phone !== "") {

        // Email Input
        if (this.state.email !== "") {
          if (this.state.email.includes("@")) {
            event.preventDefault();
            // Zip Input
            if (this.state.zip !== "") {
              if (this.state.zip.length < 5 || this.state.zip.length >= 6) {
                event.preventDefault();
              } else {
                event.preventDefault();
                this.setState({user: newCustomer, isFilled: true})
              }
            }
          }
        } 
      } 
    }  
  }
}

  render() {
    return (
      <UserContext.Provider
        value={{
          name: this.state.name,
          shippingPriceState: this.state.shippingPriceState,
          adress: this.state.adress, 
          phone: this.state.phone, 
          email: this.state.email,
          zip: this.state.zip,
          user: {
            name: this.state.user.name,
            adress: this.state.user.adress,
            phone: this.state.user.phone,
            email: this.state.user.email,
            zip: this.state.zip
          },
          delivery: {
            company: this.state.company, 
            date: this.state.date
          },
          date: this.state.date, 
          company: this.state.company,
          shopState: this.state.shopState,
          isFilled: this.state.isFilled,
          
          addName: this.addNameToState,
          addAdress: this.addAdressToState, 
          addPhone: this.addPhoneToState, 
          addEmail: this.addEmailToState,
          addZip: this.addZipToState,
          addToObject: this.addInputsToObject,
          addDelivery: this.addDeliveryToState, 
          shopStateTrue: this.setShopStateTrue,
          shopStateFalse: this.setShopStateFalse, 
          filledState: this.setFilledState,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
