import React from "react";
import classes from "./Header.module.css";
import mealsPic from "./../../../Assets/meals.jpg";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton.component";

function Header() {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsPic} alt="meal image picture" />
      </div>
    </>
  );
}

export default Header;
