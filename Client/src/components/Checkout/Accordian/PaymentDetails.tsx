
import { CSSProperties } from "@material-ui/styles";
import Swish from "./PaymentMethods/Swish";
import Creditcard from "./PaymentMethods/Creditcard";
import BankTransfer from "./PaymentMethods/BankTransfer";
import '../../../style/Payment.css'

const PaymentDetails = () => {
    return (
        <div className="payment-container">
          <div style={{marginBottom: '1rem'}}>
            Payment Details
          </div>
          <div>
            <Creditcard />
            <Swish />
            <BankTransfer />
          </div>
        </div>
    );
}

export default PaymentDetails