import { Component, createContext } from "react";
import { Product } from "../data/productData";

interface CartItem {
  title: string;
  info: string;
  price: number;
  image: string;
  size: number;
  quantity: number;
  _id?: string
}
interface State {
  cart: CartItem[];
  totalAmount: number;
  tax: number;
  orderCart: CartItem[];
  orderAmount: number;
}
interface ContextProps extends State {
  addToCart: (product: Product) => void;
  removeFromCart: (product: CartItem) => void;
  deleteItemQty: (product: CartItem) => void;
  emptyCart: () => void;
}

export const CartContext = createContext<ContextProps>({
  cart: [],
  orderAmount: 0,
  totalAmount: 0,
  tax: 0,
  orderCart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  deleteItemQty: () => {},
  emptyCart: () => {},
});

class CartProvider extends Component<{}, State> {
  state: State = {
    cart: JSON.parse(localStorage.getItem("Products") || "[]"),
    totalAmount: Number(JSON.parse(localStorage.getItem("TotalAmount") || "0")),
    tax: 0,
    orderCart: [],
    orderAmount: 0,
  };

  addProductToCart = (product: Product) => {
    let currentProduct = this.state.cart.find(
      (specificProduct) => specificProduct.title === product.title
    );
    if (currentProduct?.quantity !== undefined && currentProduct.size === product.size) {
      currentProduct.quantity += 1;
      this.setState({});
      const updatedCart = [...this.state.cart];
      this.changeTotalAmount(updatedCart);
    } else {
      const quantity = 1;
      const cartItem = { ...product, quantity };
      let updatedCart = [...this.state.cart, cartItem];
      this.setState({ cart: updatedCart });
      this.changeTotalAmount(updatedCart);
    }
  };

  removeProductFromCart = (product: CartItem) => {
    const updatedCart = [...this.state.cart];
    const cartIndex = updatedCart.indexOf(product);
    updatedCart.splice(cartIndex, 1);
    this.setState({ cart: updatedCart });
    this.changeTotalAmount(updatedCart);
  };

  changeTotalAmount = (cart: any) => {
    if (cart.length !== 0) {
      const itemsPrice = cart.reduce(
        (a: number, c: CartItem) => a + c.price * c.quantity,
        0
      );
      this.changeTax(itemsPrice);
      this.setState({ totalAmount: itemsPrice });
    } else {
      this.setState({ totalAmount: 0, tax: 0 });
    }
  };

  changeTax = (productPrice: number) => {
    const itemsTax = productPrice * 0.2;
    const roundedTax = Math.round(itemsTax);
    this.setState({ tax: roundedTax });
  };

  deleteItemFromQty = (product: Product) => {
    let currentProduct = this.state.cart.find(
      (specificProduct) => specificProduct.title === product.title
    );
    if (currentProduct!.quantity === 1) {
      this.removeProductFromCart(currentProduct!);
    } else {
      currentProduct!.quantity = currentProduct!.quantity - 1;
      this.setState({});
      const updatedCart = [...this.state.cart];
      this.changeTotalAmount(updatedCart);
    }
  };

  emptyCartItems = () => {
    this.setState({
      orderCart: [...this.state.cart],
      orderAmount: this.state.totalAmount,
      cart: [],
      totalAmount: 0,
    });
  };

  componentDidUpdate() {
    localStorage.setItem("Products", JSON.stringify(this.state.cart));
    localStorage.setItem("TotalAmount", JSON.stringify(this.state.totalAmount));
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          addToCart: this.addProductToCart,
          removeFromCart: this.removeProductFromCart,
          deleteItemQty: this.deleteItemFromQty,
          emptyCart: this.emptyCartItems,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
