import React from "react";
import Card from "../../UI/Card/Card.component";
import MealItem from "../MealItem/MealItem.component";
import classes from "./AvailableMeals.module.css";
import { useEffect } from "react";
import { useState } from "react";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  const fetchMealsData = async () => {
    try {
      const response = await fetch(
        "https://samvaad-chat-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();
      // console.log(data[`-NUvkp4Ky9g_rV56qbs5`]);
      setMeals(data[`-NUvkp4Ky9g_rV56qbs5`]);
      setLoading(false);
    } catch (error) {
      setHttpError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // setLoading(true);
    fetchMealsData();

    // return () => {

    // }
  }, []);

  if (loading) {
    return (
      <section className={classes.MealsLoading}>
        <p> Loading 🎂🍔🍕🌭🍟</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsLoading}>
        <p>ERROR | SERVER ERROR</p>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              description={meal.description}
              price={meal.price}
              name={meal.name}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;

// const postMealsData = async () => {
//   const response = await fetch(
//     "https://samvaad-chat-default-rtdb.firebaseio.com/meals.json",
//     {
//       method: "POST",
//       body: JSON.stringify(DUMMY_MEALS),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   console.log(data);
// };

// useEffect(() => {
//   postMealsData();
//   return () => {};
// }, []);
