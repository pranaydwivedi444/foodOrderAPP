import React from "react";
import { useContext } from "react";
import { CartContext } from "../../../Contexts/Cart.context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const { items } = useContext(CartContext);
  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={() => props.openModal()}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
