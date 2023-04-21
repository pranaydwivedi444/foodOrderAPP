import React from "react";
import { useContext } from "react";
import { CartContext } from "../../../Contexts/Cart.context";
import MealItemForm from "../MealItemForm/MealItemForm.component";
import classes from "./MealItem.module.css";

function MealItem(props) {
  const { addItemsToCart } = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  function onAddToCartHandler(amount) {
    addItemsToCart({
      amount,
      price: props.price,
      id: props.id,
      name: props.name,
    });
  }
  return (
    <li>
      <div className={classes.meal}>
        {" "}
        <h3>{props.name}</h3>{" "}
      </div>
      <div className={classes.description}> {props.description} </div>
      <div className={classes.price}> {price} </div>
      <div>
        <MealItemForm onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
