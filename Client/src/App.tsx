
import React, { Component } from 'react';

import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './contexts/CartContext';
import UserProvider from './contexts/UserContext';
import PaymentProvider from './contexts/PaymentContext';
import AdminProvider  from './contexts/AdminContext';
import AxiosProvider from './contexts/AxiosContext';
import OrderProvider from './contexts/OrderContext';

class App extends Component {

  render() {
    return (
      <CartProvider>
        <UserProvider>
          <AxiosProvider>
            <OrderProvider>
            <PaymentProvider>
              <AdminProvider>
                <BrowserRouter>
                  <Layout />
                </BrowserRouter>
              </AdminProvider>
            </PaymentProvider>
            </OrderProvider>
          </AxiosProvider>
        </UserProvider>
      </CartProvider>
    );
  }
}

export default App;
