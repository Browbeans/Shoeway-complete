import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'
import { CartContext } from '../contexts/CartContext'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import BurgerMenu from './BurgerMenu';
import { Avatar } from '@material-ui/core';



interface State {
  isMenuOpen: boolean;
}

class Navbar extends Component<{}, State> {
    context!: React.ContextType<typeof CartContext>
    static contextType = CartContext;

    state: State = {
      isMenuOpen: false
    }
    
    handleMenuClick = () => {
      this.setState({
        isMenuOpen: !this.state.isMenuOpen
      })
    }

    handleBurgerMenuExit = () => {
      this.setState({
        isMenuOpen: false
      })
    }

    render() {
      return (
        <header className="main-header">
          <Link 
            style={{ textDecoration: "none" }} to="/"
            onClick={this.handleBurgerMenuExit}
            >
            <h2 className="header-title">ShoeWay</h2>
          </Link>
          <nav>
            <ul
              className="nav-links"
              style={{
                right: this.state.isMenuOpen ? "0%" : "-100%",
              }}
            >
              <Link 
                style={{ textDecoration: "none", color: "#000" }} 
                to="/"
                onClick={this.handleMenuClick}
                >
                <li>Home</li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="/products"
                onClick={this.handleMenuClick}
              >
                <li>Products</li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="/about"
                onClick={this.handleMenuClick}
              >
                <li>About</li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="/admin"
                onClick={this.handleMenuClick}
              >
                <li>Admin</li>
              </Link>
            </ul>
            <Link
              style={{
                textDecoration: "none",
                color: "#000",
              }}
              to="/entry"
              onClick={this.handleBurgerMenuExit}
            >
              <Avatar
                style={{ background: "#333", marginBottom: ".5rem" }}
                
                src=""
              />
            </Link>
            <div className="cart-container">
              <Link to="/checkout" style={{ color: "#333" }} onClick={this.handleBurgerMenuExit}>
                <ShoppingCartOutlinedIcon style={{ fontSize: "2rem" }} />
              </Link>
              <div className="cart-content">{this.context.cart.length}</div>
            </div>
            <BurgerMenu
              value={this.state.isMenuOpen}
              handleClick={this.handleMenuClick}
            />
          </nav>
        </header>
      );
    }
}

export default Navbar