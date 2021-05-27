import { Link } from 'react-router-dom';
import '../../style/Products.css';
import { Product } from "../../contexts/ProductContext";
import { useEffect } from 'react';
import axios from 'axios';

interface Props{
  product: Product 
}
const Item = (props: Props) => {

  useEffect(() => {
    axios.get(`/image/getImage/${props.product._id}`)
    .then((res) => {
      console.log(res);
    })
  })

    return (
      <div className="product-item">
        <h2 className="title">{props.product.title}</h2>
        {/* <img className="product-image" src={props.product.image} alt=""/> */}
        <h4 className="price">{props.product.price + " sek"}</h4>
        <Link to={"/productItem/" + props.product.title}>
          <button className="add-btn">
            More info...
          </button>
        </Link>
      </div>
    );
}

export default Item