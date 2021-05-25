import React, { useContext, useEffect } from "react";
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
import HandleRegister from "./Accordian/handleRegister";
import HandleLogin from "./Accordian/handleLogin";
import { OrderContext } from "../../contexts/OrderContext";

const Checkout =  () => {
  const cartContext = useContext(CartContext)
  const userContext = useContext(UserContext)
  const orderContext = useContext(OrderContext)

  const handleClick = () => {
    userContext.shopStateFalse()
    const order = {
      ordernumber: "adsad12312", 
        product:[ 
                  {
                    id:"60a6667057fbd72e1443bf6e",
                    qty: 5    
                  }, 
                  {
                    id: "60a797b7423f574550025fc4",
                    qty: 1
                  },
                  {
                    id: "60a797d4423f574550025fc5", 
                    qty: 2
                  }
                ],
        customer: "60a79d8cbf69303b004dd159"
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
              <Accordian />
              <HandleRegister/>
              {/* <HandleLogin/> */}
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
              <strong className="total-amount">Delivary:</strong>
              <p>{userContext.shippingPriceState + " SEK"}</p>
            </div>
            <div className="total-amount-container">
              <strong className="total-amount">Total Amount:</strong>
              <p>{cartContext.totalAmount + userContext.shippingPriceState + " SEK"}</p>
            </div>
          </div>
        </div>
        {userContext.shopState ? (
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
            onClick={handleClick}
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
  justifyContent: "center",
  margin: "0.5rem 1rem",
  fontSize: "1.2rem",
};

export default Checkout;
