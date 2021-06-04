import { Component, createContext } from "react";
import { Product, ProductData } from "../data/productData";

interface State {
  mode: string
  products: Product[]
}

interface ContextProps extends State {
  submitAll: (product: Product, currentProduct: any) => void; 
  addNewProduct: (newProductData: Product) => void; 
  removeItem: (product: Product) => void; 
}

export const AdminContext = createContext<ContextProps>({
  mode: '', 
  products: [], 
  submitAll: () => {},
  addNewProduct: () => {},
  removeItem: () => {}
});

class AdminProvider extends Component<{}, State> {
  state: State = {
    mode: '',
    products: JSON.parse(localStorage.getItem("ProductData") || "[]"),
  };


  removeItemFromData = (product: Product) => {
    const cartIndex = this.state.products.indexOf(product);
    this.state.products.splice(cartIndex, 1);
    this.setState({products: this.state.products})
  }

  submitEditInput = (editedProduct: Product, currentProduct: any) => {
    const productIndex = this.state.products.indexOf(currentProduct)
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.products[productIndex] = editedProduct
    this.setState({mode: '', products: this.state.products})
  }

  addProductToState = (newProductData: Product) => {
    this.state.products.push(newProductData);
    localStorage.setItem("ProductData", JSON.stringify(this.state.products));
    this.setState({products: this.state.products})
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("ProductData") || "[]").length === 0) {
      localStorage.setItem("ProductData", JSON.stringify(ProductData));
   }
  }

  componentDidUpdate() {
    localStorage.setItem("ProductData", JSON.stringify(this.state.products))
  }

  render() {
    return (
      <AdminContext.Provider
        value={{
          ...this.state,
          submitAll: this.submitEditInput, 
          addNewProduct: this.addProductToState, 
          removeItem: this.removeItemFromData,
        }}
      >
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}

export default AdminProvider;