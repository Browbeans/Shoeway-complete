
import React, { Component } from 'react';
import DeliveryProvider from './contexts/DeliverContext'
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './contexts/CartContext';
import UserProvider from './contexts/UserContext';
import PaymentProvider from './contexts/PaymentContext';
import AdminProvider  from './contexts/AdminContext';
import RegisterProvider from './contexts/registerContext';
import OrderProvider from './contexts/OrderContext';
import ProductProvider from './contexts/ProductContext';
import LoginProvider from './contexts/loginContext';

class App extends Component {

  render() {
    return (
     <RegisterProvider>
      <LoginProvider>
        <ProductProvider>
          <CartProvider>
            <UserProvider>
              <OrderProvider>
                <PaymentProvider>
                  <AdminProvider>
                    <DeliveryProvider>
                      <BrowserRouter>
                        <Layout />
                      </BrowserRouter>
                    </DeliveryProvider>
                  </AdminProvider>
                </PaymentProvider>
              </OrderProvider>
            </UserProvider>
          </CartProvider>
        </ProductProvider>
      </LoginProvider>
     </RegisterProvider>
    );
  }
}

export default App;