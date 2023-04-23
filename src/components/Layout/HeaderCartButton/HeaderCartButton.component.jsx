import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../../Contexts/Cart.context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const { items } = useContext(CartContext);
  const [buttonHiglighted, setButtonHighlighted] = useState(false);
  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const buttonClasses = ` ${classes.button} ${
    buttonHiglighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length > 0) setButtonHighlighted(true);
    const timer = setTimeout(() => {
      setButtonHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={buttonClasses} onClick={() => props.openModal()}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
