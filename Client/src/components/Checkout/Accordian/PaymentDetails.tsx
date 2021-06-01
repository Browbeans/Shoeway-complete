
import { CSSProperties } from "@material-ui/styles";
import Swish from "./PaymentMethods/Swish";
import Creditcard from "./PaymentMethods/Creditcard";
import BankTransfer from "./PaymentMethods/BankTransfer";

const PaymentDetails = () => {
    return (
      <div>
        <div style={form}>
          <div style={{marginBottom: '1rem'}}>
            Payment Details
          </div>
          <div style={{width: '70%'}}>
            <Creditcard />
            <Swish />
            <BankTransfer />
          </div>
        </div>
      </div>
    );
}

const form: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "1rem 0rem",
  background: "lightgrey",
  fontSize: "1.2rem",
  width: "100%",
  padding: "2rem 4rem",
  boxShadow: "1px 1px 3px grey",
};

export default PaymentDetails