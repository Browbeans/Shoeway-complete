import React, { useContext, useEffect } from "react";
import "../../../style/Checkout.css";
import "../../../style/Admin.css";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Link } from "react-router-dom";
import { adminIcons } from "../../../style/GeneralStyle";
import { ProductContext, Product } from "../../../contexts/ProductContext";
import { LoginContext } from "../../../contexts/User/loginContext";
import HandlePending from "./handlePending";
import HandleAllOrders from "./handleAllOrders";

function AdminHandler() {
  const axios = useContext(ProductContext); 
  const { registeredUsers, isLoggedIn } = useContext(LoginContext);

  return (
    <div className="admin-handler-container">
      <div className="all-users-container">
      <h2 className="title">All Users</h2>
      <div className="user-holder sort">
                <div>
                    <p>Name</p>
                </div>
                <div>
                    <p>City</p>
                </div>
                <div>
                    <p>Street</p>
                </div>
                <div>
                    <p>Zip</p>
                </div>
                <div>
                    <p>Phone</p>
                </div>
                <div>
                    <p>Email</p>
                </div>
                <div>
                    <p>Role</p>
                </div>
            </div>
        {registeredUsers.map((user: any) => (
            <div className="user-holder">
              <div>
                <p>{user.name}</p>
              </div>
              <div>
                <p>{user.adress.city}</p>
              </div>
              <div>
                <p>{user.adress.street}</p>
              </div>
              <div>
                <p>{user.adress.zip}</p>
              </div>
              <div>
                <p>{user.phone}</p>
              </div>
              <div>
                <p>{user.email}</p>
              </div>
              <div>
              <HandlePending value={user}/>
              </div>
            </div>
        ))}
      </div>
      <HandleAllOrders/>
      <div className="all-products-container">
        <h2 className="title">All Products</h2>
      {axios.allProducts.map((product: Product) => (
        <div className="admin-item">
          {/* <img className="imageStyle" src={product.image} alt="of product" /> */}
          <p className="admin-title">{product.title}</p>
          <div className="info-admin-container">
              <h4 className="admin-price">{`${product.price} SEK`}</h4>
            <p className="admin-info">{product.info}</p>
          </div>
          <div>
            <Link to={"/addStockAndSize/" + product.title}>
              <AddBoxOutlinedIcon
                style={adminIcons}
              />
            </Link>
            <DeleteOutlinedIcon
              style={adminIcons}
              onClick={() => axios.removeProduct(product)}
            />
            <Link to={"/editProduct/" + product.title}>
              <CreateOutlinedIcon
                style={adminIcons}
              />
            </Link>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default AdminHandler;
