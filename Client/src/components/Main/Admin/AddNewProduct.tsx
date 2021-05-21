import { Button, TextField } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles';
import { ChangeEvent, useContext, useState } from 'react';
import { btnSmall } from "../../../style/GeneralStyle";
import '../../../style/Admin.css';
import { ProductContext, Product } from "../../../contexts/ProductContext";
import { useRouteMatch } from 'react-router';

const AddNewProduct = () => {
  const match = useRouteMatch<{ id: string }>();

  const newProductData: Product = {
    title: "",
    image: "",
    price: 0,
    info: "",
    category: '',
    quantity: 0,
    size: 0,
    stock: 0,
  };

  const axios = useContext(ProductContext)

  let currentProduct = axios.allProducts.find((specificProduct: Product) => specificProduct.title === match.params.id)

  const [product, setProduct] = useState<Product>(currentProduct || newProductData)

    const handleClick = () => {
      const isNewProduct = !currentProduct
      if(isNewProduct) {
        axios.addProduct(product)
      }
      // } else {
      //   axios.submitAll(product, currentProduct)
      // }
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

    const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({ ...product, category: e.target.value });
    };

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
            {!currentProduct ? (
              <h1 style={title}>Add new product</h1>
            ) : (
              <h1 style={title}>Edit product</h1>
            )}
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
              id="category"
              label="Category"
              name="Category"
              type="text"
              value={product.category}
              autoFocus
              onChange={handleCategory}
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="stock"
              label="Stock..."
              name="stock"
              type="number"
              value={product.stock}
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

export default AddNewProduct