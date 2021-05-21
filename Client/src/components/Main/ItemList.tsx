import Item from './Item';
import '../../style/Products.css';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/ProductContext';

interface Product {
  title: string,
  price: number,
  info: string, 
  size: number, 
  image: string,
}
const ItemList = () => {
  // const productDataList = useContext(AdminContext)
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
