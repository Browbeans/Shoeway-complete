import { useEffect, useContext } from "react";
import { DeliveryContext } from "../../../../contexts/DeliverContext";
import { UserContext } from "../../../../contexts/UserContext";
import "../../../../style/Deliverystyle.css";

function Deliver() {
  const {getdeliverOrder, fetchshiping, selectDeliver, DeliverOrders}  = useContext(DeliveryContext);
  const { filledState, addDelivery } = useContext(UserContext)  

  useEffect(() => {
    getdeliverOrder();
  }, [getdeliverOrder]);

<<<<<<< HEAD
   const change = (id: string) => {
       console.log("test")
    deliver.fetchshiping(id)
   }
    return(
        <div >
            {/* {getdelivery} */}
           
            {deliver.DeliverOrders.map((d)=>(
                <div className="delivery-div hover" onClick={() => change(d._id)}>
                <strong className="company hover" >{d.name}</strong>
                <span className="hover" >{d.days}</span>
                <span >{d.price} kr</span>
                </div>
            ) )}
=======
  const change = (id: string) => {
    console.log("test");
    fetchshiping(id);
    addDelivery(selectDeliver.name, 2, selectDeliver.price)
    filledState(true)
  };
  return (
    <div>
      {/* {getdelivery} */}

      {DeliverOrders.map((d) => (
        <div className="delivery-div" onClick={() => change(d._id)}>
          <strong className="company">{d.name}</strong>
          <span>{d.days}</span>
          <span>{d.price} kr</span>
>>>>>>> master
        </div>
      ))}
    </div>
  );
}
export default Deliver;
