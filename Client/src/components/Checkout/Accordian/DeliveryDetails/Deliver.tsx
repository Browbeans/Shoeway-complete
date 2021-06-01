import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { deliveris, DeliveryContext } from "../../../../contexts/DeliverContext";
import '../../../../style/Deliverystyle.css'


function Deliver (){
    const [dilverarray, setdilverarray]= useState<deliveris[]>([])
    const deliver = useContext(DeliveryContext)
    useEffect(()=>{
      deliver.getdeliverOrder()
      console.log('test')
    },[ deliver.getdeliverOrder])

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
        </div>
        
    );
}
export default Deliver