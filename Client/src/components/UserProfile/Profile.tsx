import { useContext, useEffect, useState } from "react"
import { OrderContext } from "../../contexts/OrderContext"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function Profile () {
    const orderContext = useContext(OrderContext)
    const orders = orderContext.userOrders
    const [userOrder, getUserOrders] = useState([])
    const classes = useStyles();
    
    const handleClick = () => {
        orderContext.getUserOrders('60a79d8cbf69303b004dd159')
    }

    useEffect(() => {
        handleClick()
    })

    return(
        <div>
            <h1>USER PROFILE</h1>
        </div>
    )
}

export default Profile