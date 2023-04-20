import React from "react";
import AvailableMeals from "./AvailableMeals/AvailableMeals.component";
import classes from "./Meals.module.css";
import MealsSummary from "./MealsSummary/MealsSummary.component";

function Meals() {
  return (
    <div>
      <MealsSummary />
      <AvailableMeals />
    </div>
  );
}

export default Meals;
