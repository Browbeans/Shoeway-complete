import { CSSProperties, useContext, useEffect, useState } from "react"
import { OrderContext } from "../../contexts/OrderContext"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../../style/UserProfile.css'
import { LoginContext } from "../../contexts/User/loginContext";
import { Link } from 'react-router-dom';
import UserDetails from './userDetails'

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
  const { currentUser, isLoggedIn, logoutRequest } = useContext(LoginContext)


  useEffect(() => {
    if (currentUser) {
      getUserOrders(currentUser._id)
    } 
  }, [currentUser, getUserOrders])

    const totalAmount = (price: number | undefined, quantity: number) => {
      if(price) {
        const total = price * quantity
        return total
      }
    }


    const classes = useStyles()

    return(
      <div className="profile-container">
          {!isLoggedIn
          ?
          // USER IS LOGGED OUT
          <div className="out-logged-container">
            <p>To review your profile, you have to</p>
            <Link to="/entry" style={{ textDecoration: "none" }}>
              <span>&nbsp;log in</span>
            </Link>
          </div>
          :
          // USER IS LOGGED IN
          
          <div className="all-orders">
            <UserDetails/>
            <h2>Passed Orders</h2>
            {userOrders.map((order) => (
              <Card className={classes.root} variant="outlined" style={{ margin: "2rem 0rem" }}>
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
            <div>
              <Button
                style={btn}
                variant="contained"
                onClick={logoutRequest}
              >
                Log out
              </Button>
            </div>
          </div>
          }
      </div>
    )
}

const btn: CSSProperties = {
  alignSelf: "center",
  borderRadius: ".5rem",
  outline: "none",
  fontSize: "1rem",
  background: "#56EAC6",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  padding: "0.7rem 1.2rem",
};

export default Profile