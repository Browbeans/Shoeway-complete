
import React, { Component } from 'react';

import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './contexts/CartContext';
import UserProvider from './contexts/UserContext';
import PaymentProvider from './contexts/PaymentContext';
import AdminProvider  from './contexts/AdminContext';
import RegisterProvider from './contexts/User/registerContext';
import OrderProvider from './contexts/OrderContext';
import ProductProvider from './contexts/ProductContext';
import LoginProvider from './contexts/User/loginContext';
import UpdateProvider from './contexts/User/updateContext';

class App extends Component {

  render() {
    return (
     <RegisterProvider>
      <LoginProvider>
        <UpdateProvider>
          <ProductProvider>
            <CartProvider>
              <UserProvider>
                <OrderProvider>
                  <PaymentProvider>
                    <AdminProvider>
                      <BrowserRouter>
                        <Layout />
                      </BrowserRouter>
                    </AdminProvider>
                  </PaymentProvider>
                </OrderProvider>
              </UserProvider>
            </CartProvider>
          </ProductProvider>
        </UpdateProvider>
      </LoginProvider>
     </RegisterProvider>
    );
  }
}

export default App;