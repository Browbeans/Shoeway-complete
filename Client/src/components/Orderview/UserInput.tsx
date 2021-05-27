import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "../../style/cartItems.css";
import { Guid } from 'js-guid';
import { CartContext } from "../../contexts/CartContext";
import { PaymentContext } from "../../contexts/PaymentContext";
import { LoginContext } from "../../contexts/loginContext";



const UserInput = () =>{
  const userContext = useContext(UserContext)
  const cart = useContext(CartContext)
  const payment = useContext(PaymentContext)
  const { currentUser } = useContext(LoginContext)
  console.log(userContext.user)
  console.log(payment.bankCard)
  console.log(payment.bankPayment)
  console.log(payment.swishNumber)
    return (
      <div>
        <div className="orderView-container">
          <div className="orderlisting-div1">
            <div className="order-listings">
              <h5>Name:</h5>
              <p>{currentUser.name}</p>
            </div>
            <div className="order-listings">
              <h5>Emailadress:</h5>
              <p>{currentUser.email}</p>
            </div>
            <div className="order-listings">
              <h5>Phonenumber:</h5>
              <p>{currentUser.phone}</p>
            </div>
            <div className="order-listings">
              <h5>Adress:</h5>
              <p>{currentUser.adress.city}</p>
              <p>{currentUser.adress.street}</p>
              <p>{currentUser.adress.zip}</p>
            </div>
          </div>

          <div className="orderlisting-div2">
            <div className="order-listings">
              <h5>Zip-Code:</h5>
              <p>{userContext.user.zip}</p>
            </div>
            <div className="order-listings">
              <h5>Shipping:</h5>
              <p>{userContext.delivery.company}</p>
            </div>
            <div className="order-listings">
              <h5>Date of delivery: </h5>
              <p>{userContext.delivery.date}</p>
            </div>
            <div className="order-listings">
              <h5>OrderNr:</h5>
              <p>{Guid.newGuid().toString()}</p>
            </div>
          </div>
        </div>
        <div className="total-price">
          <h5>Total price</h5>
          {`${userContext.shippingPriceState + cart.orderAmount} SEK`}
        </div>
      </div>
    );
}

export default UserInput;
