import React from "react";
import { useRef } from "react";
import Input from "../../UI/Input/Input.component";
import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const amountInputRef = useRef();
  function submitHandler(e) {
    e.preventDefault();
    const enteredAmount = +amountInputRef.current.value;
    props.onAddToCart(enteredAmount);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ ADD</button>
    </form>
  );
}

export default MealItemForm;
