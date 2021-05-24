
import React, { Component } from 'react';

import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './contexts/CartContext';
import UserProvider from './contexts/UserContext';
import PaymentProvider from './contexts/PaymentContext';
import AdminProvider  from './contexts/AdminContext';
import AxiosProvider from './contexts/AxiosContext';
import UserAxiosProvider from './contexts/userAxiosContext';
import OrderProvider from './contexts/OrderContext';
import ProductProvider from './contexts/ProductContext';



class App extends Component {

  render() {
    return (
     <UserAxiosProvider>
      <ProductProvider>
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
      </ProductProvider>
     </UserAxiosProvider>
    );
  }
}

export default App;
