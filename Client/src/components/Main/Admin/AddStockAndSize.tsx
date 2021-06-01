import { Button, TextField } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles';
import { ChangeEvent, useContext, useState } from 'react';
import { btnSmall } from "../../../style/GeneralStyle";
import '../../../style/Admin.css';
import { ProductContext, Product } from "../../../contexts/ProductContext";
import { useRouteMatch } from 'react-router';
import axios from "axios";
import CheckboxesGroup from './CheckBoxGroup';

export interface StockSizeProduct {
    size: number, 
    stock: number, 
    title: string | undefined, 
    quantity: number
    id: string | undefined
}

const AddStockAndSize = () => {
  const match = useRouteMatch<{ id: string }>();

  
  const axiosContext = useContext(ProductContext)
  let currentProduct = axiosContext.allProducts.find((specificProduct: Product) => specificProduct.title === match.params.id)
  const changedProduct = {
    size: 0, 
    stock: 0, 
    title: currentProduct?.title, 
    quantity: 1, 
    id: currentProduct?._id
  }
  const [product, setProduct] = useState<StockSizeProduct>(changedProduct)

    const handleClick = () => {
        axiosContext.addStockSize(product)
    }

    const handleSize = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({...product, size: parseInt(e.target.value)})
    }

    const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({ ...product, stock: parseInt(e.target.value) });
    };
    

    return (
      <div>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 style={title}>Add new size and stock</h1>

            <TextField
                variant="outlined"
                margin="normal"
                required
                id="size"
                label="Size..."
                name="size"
                type="number"
                autoFocus
                onChange={handleSize}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="stock"
              label="Stock..."
              name="stock"
              type="number"
              autoFocus
              onChange={handleStock}
            />
            <div style={{ alignSelf: "center" }}>
              <Button onClick={handleClick} style={btnSmall}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}

const title: CSSProperties = {
  textAlign: "center",
  margin: "0rem 1rem",
}

export default AddStockAndSize