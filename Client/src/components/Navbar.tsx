import React, { Component, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'
import { CartContext } from '../contexts/CartContext'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import BurgerMenu from './BurgerMenu';
import { Avatar } from '@material-ui/core';
import { LoginContext } from '../contexts/User/loginContext';

function Navbar() {
    const cartContext = useContext(CartContext);
    const { isLoggedIn } = useContext(LoginContext);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const handleMenuClick = () => {
      setMenuOpen(!menuOpen)
    }

    const handleBurgerMenuExit = () => {
      setMenuOpen(false);
    }

    return (
      <header className="main-header">
        <Link 
          style={{ textDecoration: "none" }} to="/"
          onClick={handleBurgerMenuExit}
          >
          <h2 className="header-title">ShoeWay</h2>
        </Link>
        <nav>
          <ul
            className="nav-links"
            style={{
              right: menuOpen ? "0%" : "-100%",
            }}
          >
            <Link 
              style={{ textDecoration: "none", color: "#000" }} 
              to="/"
              onClick={handleMenuClick}
              >
              <li>Home</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/products"
              onClick={handleMenuClick}
            >
              <li>Products</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/about"
              onClick={handleMenuClick}
            >
              <li>About</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/admin"
              onClick={handleMenuClick}
            >
              <li>Admin</li>
            </Link>
          </ul>
          <Link
            style={{
              textDecoration: "none",
              color: "#000",
            }}
            to={isLoggedIn ? "/user-profile" : "/entry"}
            onClick={handleBurgerMenuExit}
          >
            <Avatar
              style={{ background: "#333", marginBottom: ".5rem" }}
              
              src=""
            />
          </Link>
          <div className="cart-container">
            <Link to="/checkout" style={{ color: "#333" }} onClick={handleBurgerMenuExit}>
              <ShoppingCartOutlinedIcon style={{ fontSize: "2rem" }} />
            </Link>
            <div className="cart-content">{cartContext.cart.length}</div>
          </div>
          <BurgerMenu
            value={menuOpen}
            handleClick={handleMenuClick}
          />
        </nav>
      </header>
    );
}

export default Navbar