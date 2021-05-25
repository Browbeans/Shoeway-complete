import { useContext, useEffect, useState } from "react"
import { OrderContext } from "../../contexts/OrderContext"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../../style/UserProfile.css'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: "1rem"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
      fontWeight: "bold"
    },
    pos: {
      marginBottom: 12,
    },
  });

function Profile () {
    const { userOrders, getUserOrders } = useContext(OrderContext)
    

    useEffect(() => {
      getUserOrders('60a4fa6051ceee3f08a13335')
    }, [getUserOrders])
    
    const totalAmount = (price: number | undefined, quantity: number) => {
      if(price) {
        const total = price * quantity
        return total
      }
    }


    const classes = useStyles()

    return(
      <div className="profile-container">
          <h1>Passed Orders</h1>
        <div className="all-orders">
            {userOrders.map((order) => (
              <Card className={classes.root} variant="outlined">
                  <CardContent>
                  <Typography className={classes.title} gutterBottom>
                    {'Ordernumber: ' + order.ordernumber}
                  </Typography>
                  {order.products.map((p) => (
                    <div>
                        <Typography className={classes.pos} color="textSecondary">
                          {'Product: ' + p.title}
                          <br/>
                          {`Quantity:  ${p.quantity} X`}
                          <br/>
                          {`Totalprice:  ${totalAmount(p.price, p.quantity)} SEK`}
                        </Typography>
                    </div>
                  ))}
                  {order.isSent 
                  ?
                    'Your order has been shipped'
                  :
                    'Your order is being handled and waiting for shipment'
                  }
                </CardContent>
              </Card>
            ))}
        </div>

      </div>
    )
}

export default Profile