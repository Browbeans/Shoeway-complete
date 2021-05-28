import { useContext, useState } from "react";
import { Button } from '@material-ui/core'
import { btnMedium } from '../../style/GeneralStyle'
import { inactiveBtn } from '../../style/GeneralStyle'
import { CartContext } from "../../contexts/CartContext";
import '../../style/productItem.css'
import { Product } from "../../data/productData";
import { useRouteMatch } from "react-router";
import { ProductContext } from "../../contexts/ProductContext";

const ProductItem = () => {

  const match = useRouteMatch<{ id: string }>();
  const cart = useContext(CartContext)
  const axios = useContext(ProductContext);
  let currentProduct = axios.allProducts.find((specificProduct: Product) => specificProduct.title === match.params.id)
  const [isSize, setSize] = useState(false)

  const handleClick = (size: number) => {
    //mutera ej statet
    if(currentProduct) {
      currentProduct.size = size
      setSize(!isSize)
    }
  }
  if(!currentProduct) {
    return <p>Product isnt available</p>
  }

  console.log(currentProduct);
    return (
      <div className="productitem-container">
        <div className="image-div">
          <img
            className="image-style"
            src={currentProduct.image}
            alt=""
          />
        </div>
        <div className="product-div">
          <h2>{currentProduct.title}</h2>
          <div className="product-info">
            <div style={{ margin: "2rem 0" }}>
              <h4>Price</h4>
              <p>{currentProduct.price + " sek"}</p>
            </div>
            <div style={{ margin: "2rem 0" }}>
              <h4>Info</h4>
              <p>
                {currentProduct.info}
              </p>
            </div>
            <div className="sizes">
              <div className="size" onClick={() => handleClick(36)}><p>36</p></div>
              <div className="size" onClick={() => handleClick(37)}><p>37</p></div>
              <div className="size" onClick={() => handleClick(38)}><p>38</p></div>
              <div className="size" onClick={() => handleClick(39)}><p>39</p></div>
              <div className="size" onClick={() => handleClick(40)}><p>40</p></div>
              <div className="size" onClick={() => handleClick(41)}><p>41</p></div>
              <div className="size" onClick={() => handleClick(42)}><p>42</p></div>
              <div className="size" onClick={() => handleClick(43)}><p>43</p></div>
              <div className="size" onClick={() => handleClick(44)}><p>44</p></div>
            </div>
          </div>

          {isSize? 
          <Button 
            variant="contained" 
            style={btnMedium}
            onClick={() => cart.addToCart(currentProduct!)}
            >
              Add to cart
          </Button>
          :  
          <Button 
            variant="contained" 
            style={inactiveBtn}
            >
              Please choose size
          </Button>
          }
        </div>
      </div>
    );
}

export default ProductItem;
