import React from "react";
import { useContext } from "react";
import { CartContext } from "../../Contexts/Cart.context";
import Modal from "../UI/Modal/Modal.component";
import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem.component";

function Cart(props) {
  const { items, totalAmount } = useContext(CartContext);
  const total = `$${totalAmount.toFixed(2)}`;
  const cartItemRemoveHandler = (id) => {};
  const cartItemAddHandler = (item) => {};
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
  return (
    <Modal closeModal={props.closeModal}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{total}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={() => props.closeModal()}
        >
          close{" "}
        </button>
        {hasItems && <button className={classes.button}>order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
