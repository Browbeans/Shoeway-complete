import { Button, TextField } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles';
import { ChangeEvent, useContext, useState } from 'react';
import { btnSmall } from "../../../style/GeneralStyle";
import '../../../style/Admin.css';
import { ProductContext, Product } from "../../../contexts/ProductContext";
import { useHistory, useRouteMatch } from 'react-router';
import axios from "axios";
import CheckboxesGroup from './CheckBoxGroup';

const AddNewProduct = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory()
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
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [infoError, setInfoError] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [stockError, setStockError] = useState('');


    const handleClick = () => {
      const isNewProduct = !currentProduct
      if(isNewProduct) {
        axiosContext.addProduct(product)
        history.push('/admin')
      }
       else {
        axiosContext.editProduct(product, currentProduct)
        history.push('/admin')
      }
    }

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {

       if (!/^[a-öA-Ö\s,'-]+$/.test(e.target.value)) {
         setTitleError("Name is not valid");
       } else {
         setTitleError("");
       }
      setProduct({ ...product, title: e.target.value })
    }

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
       if (!/^[0-9]+$/.test(e.target.value)) {
         setPriceError("Price is not valid");
       } else {
         setPriceError("");
       }
      setProduct({...product, price: parseInt(e.target.value)})
    }

    const handleInfo = (e: ChangeEvent<HTMLInputElement>) => {
      if (!/^[a-öA-Ö\s,'-]+$/.test(e.target.value)) {
        setInfoError("Info is not required");
      } else {
        setInfoError("");
      }
      setProduct({...product, info: e.target.value})
    }

    const handleSize = (e: ChangeEvent<HTMLInputElement>) => {
      if (!/^[0-9]+$/.test(e.target.value)) {
        setSizeError("Size has to be number");
      } else {
        setSizeError("");
      }
      setProduct({...product, size: parseInt(e.target.value)})
    }

    const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
      if (!/^[0-9]+$/.test(e.target.value)) {
        setStockError("Stock has to be number");
      } else {
        setStockError("");
      }
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
          setProduct({ ...product, image: res.data})
      })
    
     }

    return (
      <div className="wrapper">
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
              helperText={titleError}
              error={Boolean(titleError)}
              value={product.title}
              onChange={handleTitle}
            />
            <CheckboxesGroup />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="price"
              label="Price..."
              name="price"
              type="number"
              helperText={priceError}
              error={Boolean(priceError)}
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
              helperText={sizeError}
              error={Boolean(sizeError)}
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
              helperText={infoError}
              error={Boolean(infoError)}
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
              helperText={stockError}
              error={Boolean(stockError)}
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