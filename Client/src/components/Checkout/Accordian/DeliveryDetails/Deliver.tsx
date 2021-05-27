import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { deliveris, DeliveryContext } from "../../../../contexts/DeliverContext";
import '../../../../style/Delivery.css'


function Deliver (){
    const [dilverarray, setdilverarray]= useState<deliveris[]>([])
    const deliver = useContext(DeliveryContext)
    useEffect(()=>{
      deliver.getdeliverOrder()
      console.log('test')
    },[ deliver.getdeliverOrder])
   
    return(
        <div>
            {/* {getdelivery} */}
           
            {deliver.DeliverOrders.map((d)=>(
                <div className="delivery-div">
                <strong className="company">{d.name}</strong>
                <span>{d.days}</span>
                <span>{d.price}</span>
                </div>
            ) )}
        </div>
        
    );
}
export default Deliver