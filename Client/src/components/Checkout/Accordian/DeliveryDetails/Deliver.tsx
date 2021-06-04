import { useEffect, useContext } from "react";
import { Deliveris, DeliveryContext } from "../../../../contexts/DeliverContext";
import { UserContext } from "../../../../contexts/UserContext";
import "../../../../style/Delivery.css";

function Deliver() {
  const {getdeliverOrder, setDate, fetchshiping, selectDeliver, DeliverOrders}  = useContext(DeliveryContext);
  const { filledState } = useContext(UserContext)  

  useEffect(() => {
    getdeliverOrder();
  }, [getdeliverOrder]);

  const change = (selectshiping: Deliveris) => {
    fetchshiping(selectshiping);
    setDate(2)
     filledState(true)
  };
  return (
    <div>
      {DeliverOrders.map((d) => (
        
        <div key={d._id} className="delivery-div test" onClick={() => change(d)}>
          {d === selectDeliver? <span>Select</span> : null}
          <strong className="company">{d.name}</strong>
          <span>{d.days}</span>
          <span>{d.price} kr</span>
        </div>
      ))}
    </div>
  );
}
export default Deliver;
