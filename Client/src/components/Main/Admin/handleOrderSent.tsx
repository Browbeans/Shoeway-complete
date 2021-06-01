import react, { ChangeEvent, useContext, useState } from 'react';
import Switch from '@material-ui/core/Switch';
import { Order, OrderContext } from '../../../contexts/OrderContext';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

interface Props {
    value: any
}

const GreenSwitch = withStyles({
    switchBase: {
      color: "purple[300]",
      '&$checked': {
        color: "#56EAC6",
      },
      '&$checked + $track': {
        backgroundColor: "#56EAC6",
      },
    },
    checked: {},
    track: {},
  })(Switch);
  

function HandleOrderSent(value: Props) {

    const order = value.value;
    const { fetchAllOrders } = useContext(OrderContext)

    const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        const onOff = event.target.checked
        handlePutRequest(onOff)
    }

    const handlePutRequest = async (onOff: boolean) => {
        try {
            await axios.patch(`/order/sent-order/${order._id}`, { isSent: onOff })
            fetchAllOrders();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div style={{ display: "flex", alignItems: "center" }}>
            <p>
                {order.isSent
                ?
                <p>Sent</p>
                :
                <p>Not sent</p>
                }
            </p>
            <GreenSwitch color="default" checked={order.isSent} onChange={handleSwitch}/>
        </div>
    );
}

export default HandleOrderSent;