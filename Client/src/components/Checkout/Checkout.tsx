import { useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import "../../style/Checkout.css";
import { inactiveBtn,btnMedium, cursorPointer } from "../../style/GeneralStyle";
import { CartContext } from "../../contexts/CartContext";
import { CSSProperties } from "@material-ui/styles";
import "../../style/Form.css";
import { Button } from "@material-ui/core";
import Accordian from "./Accordian/Accordian";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { OrderContext } from "../../contexts/OrderContext";
import { Guid } from 'js-guid';
import { LoginContext } from "../../contexts/User/loginContext";
import { DeliveryContext } from "../../contexts/DeliverContext";
import UserSelection from "../Main/userSelection";

const Checkout =  () => {
  const { cart } = useContext(CartContext)
  const cartContext = useContext(CartContext)
  const userContext = useContext(UserContext)
  const orderContext = useContext(OrderContext)
  const { currentUser, isLoggedIn } = useContext(LoginContext)
  const { selectDeliver } = useContext(DeliveryContext)
  const productArray: any = []

  const handleClick = () => {
    let orderProduct = {}
    // eslint-disable-next-line array-callback-return
    cart.map((product) => {
      orderProduct = {
        id: product._id,
        quantity: product.quantity,
        size: product.size
      }
      productArray.push(orderProduct)
    })

    userContext.shopStateFalse()
    const ordernumber = Guid.newGuid().toString()
    orderContext.setOrderNumber(ordernumber)
    const order = {
      ordernumber: ordernumber, 
      products: productArray,
      customer: currentUser._id,
      orderAmount: cartContext.totalAmount + selectDeliver.price,
      shipment: selectDeliver
    }
    orderContext.createOrder(order)
  }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="checkout-container">
          <div className="details-container">
            <form action="/" style={form}>
              <h2 className="checkout-title">Checkout</h2>
              {isLoggedIn ? 
                <Accordian />
              :
                <UserSelection/>
              }
            </form>
          </div>
          <div className="order-container">
            <div className="order-list">
              <h2>Order Summary</h2>
              <div className="overflow-scroll-container">
                {cartContext.cart.map((productValue) => (
                  <div className="order-item">
                    <div className="image-holder">
                      <img
                        className="imageStyle"
                        src={productValue.image}
                        alt=""
                      />
                    </div>
                    <div className="info-container">
                      <p className="order-name">{productValue.title}</p>
                      <p className="order-qty">
                        {"Size: " + productValue.size}
                      </p>
                      <div className="price-holder">
                        <div>
                          <AddCircleIcon
                            className="amount-icons"
                            onClick={() => cartContext.addToCart(productValue)}
                          />
                          <RemoveCircleIcon
                            className="amount-icons"
                            onClick={() =>
                              cartContext.deleteItemQty(productValue)
                            }
                          />
                        </div>
                        <div className="order-qty-holder">
                          <p className="order-qty">{`X ${productValue.quantity}`}</p>
                          <p className="order-price">
                            {`${productValue.quantity * productValue.price} SEK`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CloseIcon
                      onClick={() => cartContext.removeFromCart(productValue)}
                      style={{
                        ...cursorPointer,
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="total-amount-container">
              <strong className="total-amount">Tax:</strong>
              <p>{Math.round(cartContext.totalAmount * 0.2) + " SEK"}</p>
            </div>
            <div className="total-amount-container">
              <strong className="total-amount">Delivery:</strong>
              <p>{userContext.shippingPriceState + " SEK"}</p>
            </div>
            <div className="total-amount-container">
              <strong className="total-amount">Total Amount:</strong>
              <p>{cartContext.totalAmount + selectDeliver.price + " SEK"}</p>
            </div>
          </div>
        </div>
        {userContext.shopState && cartContext.cart.length >= 1 && isLoggedIn ? (
          <Link
            to="/orderview"
            style={{ textDecoration: "none", zIndex: 1, margin: "2rem 0rem" }}
          >
            <Button
              onClick={handleClick}
              variant="contained"
              style={btnMedium}
            >
              {" "}
              Confirm Order
            </Button>
          </Link>
        ) : (
          <Button variant="contained" 
            style={inactiveBtn}
          >
            {" "}
            Confirm Order
          </Button>
        )}
      </div>
    );
}

const form: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  margin: "0.5rem 1rem",
  fontSize: "1.2rem",
  width: "70%"
};

export default Checkout;
