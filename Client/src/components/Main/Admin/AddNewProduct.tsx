import { Button, TextField } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles';
import { ChangeEvent, useContext, useState } from 'react';
import { btnSmall } from "../../../style/GeneralStyle";
import '../../../style/Admin.css';
import { ProductContext, Product } from "../../../contexts/ProductContext";
import { useRouteMatch } from 'react-router';
import axios from "axios";
import CheckboxesGroup from './CheckBoxGroup';

const AddNewProduct = () => {
  const match = useRouteMatch<{ id: string }>();

  const newProductData: Product = {
    title: "",
    image: "",
    price: 0,
    info: "",
    category: [],
    quantity: 0,
    size: 0,
    stock: 0,
  };

  const axiosContext = useContext(ProductContext)

  let currentProduct = axiosContext.allProducts.find((specificProduct: Product) => specificProduct.title === match.params.id)

  const [product, setProduct] = useState<Product>(currentProduct || newProductData)
  const [selectedFile, setSelectedFile] = useState('');

    const handleClick = () => {
      const isNewProduct = !currentProduct
      if(isNewProduct) {
        axiosContext.addProduct(product)
      }
       else {
        axiosContext.editProduct(product, currentProduct)
      }
    }

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({ ...product, title: e.target.value })
    }

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({...product, price: parseInt(e.target.value)})
    }

    const handleInfo = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({...product, info: e.target.value})
    }

    const handleSize = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({...product, size: parseInt(e.target.value)})
    }

    // const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    //   const categoryArray: string[] = [e.target.value]
    //   setProduct({ ...product, category: categoryArray });
    // };

    const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({ ...product, stock: parseInt(e.target.value) });
    };
    
    const selectedFileHandler = (e: any) => {
      setSelectedFile(e.target.files[0]);
    };

     const handleFileUpload = () => {
        const fd = new FormData();
        fd.append('image', selectedFile);
        axios({
        method: 'post',
        url: '/image/uploadImage',
        headers: {
            'Content-Type': 'application/json'
        }, 
        data: fd
      })
      .then(res => {
          console.log(res.data);
          setProduct({ ...product, image: res.data})
      })
    
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
            <CheckboxesGroup/>
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
              id="size"
              label="Size..."
              name="size"
              type="number"
              value={product.size}
              autoFocus
              onChange={handleSize}
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
            <div style={{ display: "flex" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="image"
                name="image"
                type="file"
                autoFocus
                onChange={selectedFileHandler}
              />
              <button onClick={handleFileUpload}>Upload</button>
            </div>
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