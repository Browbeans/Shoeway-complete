import react, { useContext, useEffect } from 'react';
import { OrderContext, Order } from '../../../contexts/OrderContext';
import "../../../style/Admin.css";
import HandleOrderSent from './handleOrderSent';

function HandleAllOrders() {
    const { allOrders, fetchAllOrders } = useContext(OrderContext)

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    // console.log(allOrders)

    return(
        <div className="all-orders-container">
            <h2 className="title">All Orders</h2>
            <div className="order-holder sort">
                <div>
                    <p>Order number</p>
                </div>
                <div>
                    <p>Customer</p>
                </div>
                <div>
                    <p>Order Amount</p>
                </div>
                <div>
                    <p>Delivered</p>
                </div>
            </div>
            {allOrders.map((order: any) => (
            <div>
                <div key={order.ordernumber} className="order-holder">
                    <div>
                        <p>{order.ordernumber}</p>
                    </div>
                    <div>
                        <p>{order.customer}</p>
                    </div>
                    <div>
                        <p>{order.orderAmount} sek</p>
                    </div>
                    <HandleOrderSent value={order}/>
                </div>
            </div>
            ))}
        </div>
    );
}

export default HandleAllOrders;