import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { deliveris, DeliveryContext } from "../../../../contexts/DeliverContext";



function Deliver (){
    const [dilverarray, setdilverarray]= useState<deliveris[]>([])
    const deliver = useContext(DeliveryContext)
    useEffect(()=>{
      getdelivery()
      setdilverarray(deliver.DeliverOrders)
    })
    const getdelivery = async()=> {
        const request = await axios.get("/Shiping/getall")
        
        const respones =  request.data
        console.log(respones)
        return respones
    }
    const HandelClick = ()=>{
        deliver.getdeliverOrder()
    }
    return(
        <div>
            {/* {getdelivery} */}
            <button onClick={HandelClick}>dad</button>
            {dilverarray.map((d)=>(
                <strong>{d.name}</strong>
               
            ) )}
              {dilverarray.map((d)=>(
                <span>{d.days}</span>
               
            ) )}
                  {dilverarray.map((d)=>(
                <span>{d.price}</span>
               
            ) )}
        </div>
        
    );
}
export default Deliver