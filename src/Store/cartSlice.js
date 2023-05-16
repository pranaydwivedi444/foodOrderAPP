import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItemsCart: (state, action) => {
      const itemToAdd = action.payload;
      const existingCartItem = state.items.find(
        (cartItem) => cartItem.id === itemToAdd.id
      );
      if (existingCartItem) {
        state.items = state.items.map((item) =>
          item.id === itemToAdd.id ? { ...item, amount: item.amount + 1 } : item
        );
      } else {
        state.items.push(itemToAdd);
      }
      state.totalAmount += itemToAdd.price;
    },
    removeItemsCart: (state, action) => {
      const id = action.payload;
      const existingCartItem = state.items.find(
        (cartItem) => cartItem.id === id
      );
      if (existingCartItem.amount > 1) {
        state.items = state.items.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        );
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
      state.totalAmount -= existingCartItem.price;
    },
    resetTheCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItemsCart, removeItemsCart, resetTheCart } =
  cartSlice.actions;

export default cartSlice;
