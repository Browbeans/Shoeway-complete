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
    allProducts: Product[]
}

interface ContextProps extends State {
  fetchSpecificProduct: () => void;
  fetchProducts: () => void;
}

export const AxiosContext = createContext<ContextProps>({
    product: [],
    allProducts: [],
    fetchSpecificProduct: () => {},
    fetchProducts: () => {},
});

class AxiosProvider extends Component<{}, State> {
    state: State = {
        product: [],
        allProducts: []
    }

    fetchSpecificProduct = async () => {
        const request = await axios.get('/products/:id')
        this.setState({ product: request.data })
        console.log(request)
        return request;
    }

    fetchProducts = async () => {
        const request = await axios.get('/products/')
        this.setState({ allProducts: request.data });
        console.log(request);
        return request;
    }

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
        )
    }
}

export default AxiosProvider;

