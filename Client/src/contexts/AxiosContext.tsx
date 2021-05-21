import axios from 'axios';
import { Component, createContext } from 'react';


interface Product {
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
}

export const AxiosContext = createContext<ContextProps>({
  product: [],
  allProducts: [],
  fetchProducts: () => {},
  fetchSpecificProduct: () => {},
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

  componentDidMount = () => {
    this.fetchProducts();
  };

  render() {
    return (
      <AxiosContext.Provider
        value={{
          ...this.state,
          fetchProducts: this.fetchProducts,
          fetchSpecificProduct: this.fetchSpecificProduct,
        }}
      >
        {this.props.children}
      </AxiosContext.Provider>
    );
  }
}

export default AxiosProvider;

