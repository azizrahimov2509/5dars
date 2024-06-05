import React from "react";
import { header, container, logo, list } from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Popover, List, message, Button } from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { removeFromCart } from "../store/CartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItemsCount = cartItems.reduce(
    (total, item) => total + item.count,
    0
  );

  const logout = () => {
    // Assuming 'logoutUser' is a Redux action that clears the authentication state
    dispatch({ type: "LOGOUT_USER" });
    navigate("/login"); // Redirect user to the login or sign-up page
  };

  const cartContent = (
    <div style={{ width: 300 }}>
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteOutlined
                onClick={() => {
                  message.warning("Item removed from cart");
                  dispatch(removeFromCart({ id: item.id }));
                }}
                style={{ color: "red", cursor: "pointer", zoom: 1.7 }}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <img src={item.image} alt={item.title} width={50} height={50} />
              }
              title={item.title}
              description={`Quantity: ${item.count} | Price per item: ${
                item.price
              }$ | Total Price: ${item.price * item.count}$`}
            />
          </List.Item>
        )}
      />
      <Button
        type="primary"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={() => navigate("/layout/selected-cart")}
      >
        Checkout
      </Button>
    </div>
  );

  return (
    <header className={header}>
      <div className={container}>
        <Link to="/" className={logo}>
          LOGO
        </Link>
        <nav>
          <ul className={list}>
            <li>
              <Link to="/layout/products">Home</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </nav>

        <Popover content={cartContent} trigger="hover" placement="bottomRight">
          <Badge count={totalItemsCount}>
            <ShoppingCartOutlined
              style={{ zoom: 3, color: "white", cursor: "pointer" }}
            />
          </Badge>
        </Popover>
        <button className="btn btn-error" onClick={logout}>
          Logout{" "}
          <LogoutOutlined
            width={25}
            height={25}
            style={{ marginLeft: "8px" }}
          />
        </button>
      </div>
    </header>
  );
}
