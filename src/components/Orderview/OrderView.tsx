import { CSSProperties } from '@material-ui/styles';
import React, { Component } from 'react'
import CartItems from './CartItems';
import TimeOut from './TimeOut';


class OrderView extends Component<{}> {

    render() {
      return(
          <div style={rootStyle}>
              <h2>Orderbekräftelse</h2>
            <TimeOut> 
                <div style={rootStyle}>
                    <CartItems/>
                </div>
            </TimeOut>  
          </div>
        )
    }
}
const rootStyle: CSSProperties = {
    width: '100%',
    height: '90%',  
    background: 'white', 
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center'
}


export default OrderView;