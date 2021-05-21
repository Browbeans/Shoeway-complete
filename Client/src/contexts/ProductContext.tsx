import axios from 'axios';
import { Component, createContext } from 'react';

export interface Product {
  id: string;
  title: string;
  info: string;
  price: number;
  image: string;
  size: number;
  stock: number;
}

interface State {
    product: Product[];
    allProducts: Product[];
}

interface ContextProps extends State {
  fetchProducts: () => void;
  fetchSpecificProduct: () => void;
  removeProduct: (product: string) => void;
}

export const ProductContext = createContext<ContextProps>({
  product: [],
  allProducts: [],
  fetchProducts: () => {},
  fetchSpecificProduct: () => {},
  removeProduct: (product: string) => {},
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

  removeProduct = async (product: string) => {
    
    const request = await axios.delete(`/products/:id`);
    this.setState({ product: request.data });
    console.log(request);
    return request;
  }

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
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default AxiosProvider;

