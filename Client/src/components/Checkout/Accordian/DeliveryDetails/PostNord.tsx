import  { useContext } from 'react'
import { UserContext } from '../../../../contexts/UserContext';
import '../../../../style/Delivery.css'

const PostNord = () => {

    const value = useContext(UserContext)

    const clickCallback = () => {
      value.addDelivery('Postnord', 3, 1, 0)
      value.filledState(true)
    }

    return (
      <div onClick={clickCallback}>
        <div className="delivery-div">
          <strong className="company">Postnord</strong>
          <span> 2 - 3 Days</span>
          <span>gratis</span>
        </div>
      </div>
    );
}

export default PostNord