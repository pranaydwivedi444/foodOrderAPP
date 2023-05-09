import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Contexts/Cart.context";
import Modal from "../UI/Modal/Modal.component";
import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem.component";
import Checkout from "./Checkout/Checkout.component";

function Cart(props) {
  const { items, totalAmount, addItemsToCart, removeItemsFromCart, resetCart } =
    useContext(CartContext);
  const total = `$${totalAmount.toFixed(2)}`;
  const [isCheckOutActive, setIsCheckOutActive] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const cartItemRemoveHandler = (id) => {
    removeItemsFromCart(id);
  };
  const cartItemAddHandler = (item) => {
    addItemsToCart(item);
  };

  const orderHandler = () => {
    setIsCheckOutActive(true);
  };
  const submitOrder = async (userData) => {
    const response = await fetch(
      "https://samvaad-chat-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderdedItems: items }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setSuccessPopup(true);
    setIsCheckOutActive(false);
    resetCart();
  };
  const cartItems = items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />
  ));
  const hasItems = items.length > 0;
  if (successPopup) {
    return (
      <Modal closeModal={props.closeModal}>
        <p
          style={{
            fontSize: "1.3rem",
            textAlign: "center",
          }}
        >
          ORDER SUCESSFULLY COMPLETED 🍽{" "}
        </p>
      </Modal>
    );
  }

  return (
    <Modal closeModal={props.closeModal}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{total}</span>
      </div>
      {isCheckOutActive && (
        <Checkout cancelModal={props.closeModal} onConfirm={submitOrder} />
      )}
      {!isCheckOutActive && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={() => props.closeModal()}
          >
            close{" "}
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}

export default Cart;
