import { Button, TextField } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles'
import { ChangeEvent, useContext, useState } from 'react'
import { btnSmall } from "../../../style/GeneralStyle";
import '../../../style/Admin.css';
import { Product } from '../../../data/productData';
import { AdminContext } from '../../../contexts/AdminContext';
import { useRouteMatch } from 'react-router';


const AddNewProduct = () => {
  const match = useRouteMatch<{ id: string }>();

  const newProductData: Product = {
    title: "",
    image: "",
    price: 0,
    info: "",
    size: 0
  };
  const admin = useContext(AdminContext)
 

  let currentProduct = admin.products.find((specificProduct) => specificProduct.title === match.params.id)

  const [product, setProduct] = useState<Product>(currentProduct || newProductData)

    const handleClick = () => {
      const isNewProduct = !currentProduct
      if(isNewProduct) {
        admin.addNewProduct(product)
      } else {
        admin.submitAll(product, currentProduct)
      }
    }

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({ ...product, title: e.target.value })
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({...product, image: e.target.value})
    }

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({...product, price: parseInt(e.target.value)})
    }

    const handleInfo = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({...product, info: e.target.value})
    }
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
            {!currentProduct?
              <h1 style={title}>Add new product</h1>
              :
              <h1 style={title}>Edit product</h1>
            }
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="title"
              label="Title..."
              name="title"
              type="text"
              autoFocus
              value={product.title}
              onChange={handleTitle}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="image"
              label="Image...(Url)"
              name="image"
              type="text"
              value={product.image}
              autoFocus
              onChange={handleImage}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="price"
              label="Price..."
              name="price"
              type="number"
              value={product.price}
              autoFocus
              onChange={handlePrice}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="info"
              type="text"
              label="Info..."
              name="info"
              value={product.info}
              autoFocus
              onChange={handleInfo}
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

export default AddNewProduct