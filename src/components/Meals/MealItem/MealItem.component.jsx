import React from "react";
import MealItemForm from "../MealItemForm/MealItemForm.component";
import classes from "./MealItem.module.css";

function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li>
      <div className={classes.meal}>
        {" "}
        <h3>{props.name}</h3>{" "}
      </div>
      <div className={classes.description}> {props.description} </div>
      <div className={classes.price}> {price} </div>
      <div>
        <MealItemForm />
      </div>
    </li>
  );
}

export default MealItem;
