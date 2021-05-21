import axios from 'axios';
import { Component, createContext } from 'react';

export interface Product {
  _id?: string;
  title: string;
  info: string;
  price: number;
  image: string;
  size: number;
  stock: number;
  category: string, 
  quantity: number,
}

interface State {
    product: Product[];
    allProducts: Product[];
}

interface ContextProps extends State {
  fetchProducts: () => void;
  fetchSpecificProduct: () => void;
  removeProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  editProduct: (editedProduct: Product, currentProduct: any) => void;
}

export const ProductContext = createContext<ContextProps>({
  product: [],
  allProducts: [],
  fetchProducts: () => {},
  fetchSpecificProduct: () => {},
  removeProduct: (product: Product) => {},
  addProduct: (product: Product) => {},
  editProduct: (editedProduct: Product, currentProduct: any) => {}
});

class AxiosProvider extends Component<{}, State> {
  state: State = {
    product: [],
    allProducts: [],
  };

  fetchProducts = async () => {
    const request = await axios.get("/products");
    this.setState({ allProducts: request.data });
    console.log(request.data);
    return request;
  };

  fetchSpecificProduct = async () => {
    const request = await axios.get("/products/:id");
    this.setState({ product: request.data });
    console.log(request);
    return request;
  };

  removeProduct = async (product: Product) => {
    const id = product._id;
    const request = await axios.delete(`/products/${id}`);
    this.fetchProducts();
    console.log(id);
    return request;
  };

  addProduct = async (product: Product) => {
    const completedProduct = { ...product, quantity: 1 };
    const request = await axios.post("/products/addProduct", completedProduct);
    this.fetchProducts();
    console.log(product);
    return request;
  };

  editProduct = async (editedProduct: Product, currentProduct: any) => {
    const id = editedProduct._id;
    const request = await axios({
      method: "put",
      url: `/products/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: editedProduct,
    });

    this.fetchProducts();
    console.log(editedProduct);
    return request;
  };

  componentDidMount = () => {
    this.fetchProducts();
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          fetchProducts: this.fetchProducts,
          fetchSpecificProduct: this.fetchSpecificProduct,
          removeProduct: this.removeProduct,
          addProduct: this.addProduct,
          editProduct: this.editProduct
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default AxiosProvider;

