import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { deliveris, DeliveryContext } from "../../../../contexts/DeliverContext";
import '../../../../style/Delivery.css'


function Deliver (){
    const [dilverarray, setdilverarray]= useState<deliveris[]>([])
    const deliver = useContext(DeliveryContext)
    useEffect(()=>{
      getdelivery()
      setdilverarray(deliver.DeliverOrders)  
      deliver.getdeliverOrder()
    })
    const getdelivery = async()=> {
        const request = await axios.get("/Shiping/getall")
        
        const respones =  request.data
        console.log(respones)
        return respones
    }
    return(
        <div>
            {/* {getdelivery} */}
           
            {dilverarray.map((d)=>(
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