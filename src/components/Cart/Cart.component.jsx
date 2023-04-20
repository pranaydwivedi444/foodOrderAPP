import React from "react";
import Modal from "../UI/Modal/Modal.component";
import classes from "./Cart.module.css";

function Cart(props) {
  const cartItems = [{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map(
    (item) => <li>{item.name}</li>
  );
  return (
    <Modal closeModal={props.closeModal}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.5</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={() => props.closeModal()}
        >
          close{" "}
        </button>
        <button className={classes.button}>order</button>
      </div>
    </Modal>
  );
}

export default Cart;
