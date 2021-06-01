import  { useContext } from 'react'
import { UserContext } from '../../../../contexts/UserContext';
import '../../../../style/Delivery.css'

const Bring = () => {

  const value = useContext(UserContext)
  
  const clickCallback = () => {
    value.addDelivery('Bring', 5, 3)
    value.filledState(true)
  }

    return (
      <div onClick={clickCallback}>
        <div className="delivery-div">
          <strong className="company">Bring</strong>
          <span> 3 - 5 Days</span>
          <span>39 sek</span>
        </div>
      </div>
    );
}

export default Bring