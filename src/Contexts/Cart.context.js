import { useState } from "react";
import React from "react";
import { useReducer } from "react";
import { act } from "react-dom/test-utils";

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
//add items handler
function addItemsCartHandler(state, itemToAdd) {
  let newItems;
  const existingCartItem = state.items.find(
    (cartItem) => cartItem.id == itemToAdd.id
  );
  if (existingCartItem) {
    newItems = state.items.map((item) =>
      item.id == itemToAdd.id ? { ...item, amount: item.amount + 1 } : item
    );
  } else {
    newItems = state.items.concat(itemToAdd);
  }
  return {
    ...state,
    items: newItems,
    totalAmount: itemToAdd.price + state.totalAmount,
  };
}

//remove items Handler
function removeItemsHandler(state, id) {
  let newItems;
  const existingCartItem = state.items.find((cartItem) => cartItem.id == id);
  if (existingCartItem.amount > 1)
    newItems = state.items.map((item) =>
      item.id == id ? { ...item, amount: item.amount - 1 } : item
    );
  else newItems = state.items.filter((item) => item.id != id);
  const totalAmount = newItems.reduce((acc, item) => {
    return acc + item.price * item.amount;
  }, 0);
  return {
    ...state,
    items: newItems,

    totalAmount: totalAmount,
  };
}
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return addItemsCartHandler(state, action.payload);

    case "REMOVE":
      return removeItemsHandler(state, action.payload);

    default:
      return defaultCartState;
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
  function removeItemsFromCart(id) {
    dispatchCartAction({
      type: "REMOVE",
      payload: id,
    });
  }

  function resetCart() {
    dispatchCartAction({
      type: "reset",
    });
  }
  const value = {
    items: cartState.items,
    addItemsToCart,
    totalAmount: cartState.totalAmount,
    resetCart,

    removeItemsFromCart,
  };
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
