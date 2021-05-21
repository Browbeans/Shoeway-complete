import Item from './Item';
import '../../style/Products.css';
import { useContext, useEffect } from 'react';
import { ProductContext, Product } from '../../contexts/ProductContext';

const ItemList = () => {
  
  const productDataList = useContext(ProductContext);

  useEffect(() => {
    productDataList.fetchProducts();
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
