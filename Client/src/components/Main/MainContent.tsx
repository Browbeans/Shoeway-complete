import '../../style/Main.css'
import Startpage from './Startpage';
import ProductPage from './ProductPage';
import { Route, Switch } from 'react-router';
import ProductItem from './ProductItem';
import Checkout from '../Checkout/Checkout';
import OrderView from '../Orderview/OrderView';
import AdminPage from './Admin/AdminPage';
import AddNewProduct from './Admin/AddNewProduct';
import About from './About';
import Profile from '../UserProfile/Profile';
import AdimnLogin from './AdminLogin';
import UserSelection from './userSelection'; 
import Deliver from '../Checkout/Accordian/DeliveryDetails/Deliver';
import AddStockAndSize from './Admin/AddStockAndSize';

function MainContent() {

    return (
      <main>
        <Switch>
          <Route exact path="/">
            <Startpage />
          </Route>
          <Route path="/products">
            <ProductPage />
          </Route>
            <Route path={"/productItem/:id"}>
              <ProductItem />
            </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/orderview">
            <OrderView />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/adminlog">
            <AdimnLogin />
          </Route>
          <Route path="/addNewProduct">
            <AddNewProduct />
          </Route>
          <Route path={"/editProduct/:id"}>
            <AddNewProduct />
          </Route>
          <Route path={"/addStockAndSize/:id"}>
            <AddStockAndSize />
          </Route>
          <Route path="/user-profile">
            <Profile/>
          </Route>
          <Route path="/entry">
            <UserSelection/>
          </Route>
          <Route path="/deliver">
            <Deliver/>
          </Route>
        </Switch>
      </main>
    );
}

export default MainContent
