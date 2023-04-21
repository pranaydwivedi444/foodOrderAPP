import { useState } from "react";
import React from "react";
import { useReducer } from "react";

export const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItemsToCart: () => {},
  removeItemsFromCart: () => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        items: state.items.concat(action.payload),
        totalAmount:
          action.payload.amount * action.payload.price + state.totalAmount,
      };

    case "REMOVE":
      return {};
  }
};

export const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  function addItemsToCart(item) {
    dispatchCartAction({
      type: "ADD",
      payload: item,
    });
  }
  function removeItemsFromCart(id) {}

  const value = {
    items: cartState.items,
    addItemsToCart,
    totalAmount: cartState.totalAmount,

    removeItemsFromCart,
  };
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
