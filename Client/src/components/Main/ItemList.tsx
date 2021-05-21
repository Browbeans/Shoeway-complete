import Item from './Item';
import '../../style/Products.css';
import { useContext, useEffect } from 'react';
import { AxiosContext } from '../../contexts/AxiosContext';
import axios from 'axios';

interface Product {
  title: string,
  price: number,
  info: string, 
  size: number, 
  image: string,
}
const ItemList = () => {
  // const productDataList = useContext(AdminContext)
  const productDataList = useContext(AxiosContext);

  useEffect(() => {
    productDataList.fetchProducts();
    console.log(productDataList.allProducts)
  });

    return (
      <div className="product-list">
        <div className="product-container">
            {productDataList.allProducts.map((product: Product) => 
              <Item 
                key={product.title}
                product={product}
              />)}
        </div>
      </div>
    );
}

export default ItemList
