import Item from './Item';
import '../../style/Products.css';
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext, Product } from '../../contexts/ProductContext';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const ItemList = () => {
  
  const { fetchProducts, allProducts } = useContext(ProductContext);
  const [categoryState, setCategory] = useState('all')
  const [categoryProduct, setProducts] = useState<Product[]>([])
  const [value, setValue] = React.useState('all');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const logProductOfCategory = (category: string) => {
    setCategory(category)
    const sortedProduct = allProducts.filter((product) => {
      return product.category.indexOf(category) > -1
    })
    setProducts(sortedProduct)
  }

  useEffect(() => {
    fetchProducts();
  },[fetchProducts]);

    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={onChange}>
            <div>
              <FormControlLabel value="all" onClick={() => logProductOfCategory('all') } control={<Radio />} label="All" />
              <FormControlLabel value="Mens" onClick={() => logProductOfCategory('mens') } control={<Radio />} label="Mens" />
              <FormControlLabel value="womens" onClick={() => logProductOfCategory('womens') } control={<Radio />} label="Womens" />
              <FormControlLabel value="unisex" onClick={() => logProductOfCategory('unisex') } control={<Radio />} label="Unisex" />
            </div>
          </RadioGroup>
        </FormControl>
        {categoryState === 'all'
          ?
          <div className="product-list">
          <div className="product-container">
              {allProducts.map((product: Product) => 
                <Item 
                  key={product.title}
                  product={product}
                />)}
          </div>
        </div>
          :
          <div className="product-list">
            <div className="product-container">
                {categoryProduct.map((product: Product) => 
                  <Item 
                    key={product.title}
                    product={product}
                  />)}
            </div>
      </div>
    }
    {/* <button onClick={() => logProductOfCategory('all', true)}> CATEGORY</button>
    <button onClick={() => logProductOfCategory('unisex', false)}> unisex</button>
    <button onClick={() => logProductOfCategory('mens', false)}> MENS</button>
    <button onClick={() => logProductOfCategory('womens', false)}> WOMENS</button> */}
  </div>
  )
}

export default ItemList
