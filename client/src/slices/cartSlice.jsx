import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  initialState: {
    cart: [
      {
        name: "kutha",
        price: 100,
        quantity: 2,
      },
    ],
    quantity: "",
  },

  name: "cart",

  reducers: {
    addtoCart: (state, action) => {
      // Check if existing item is being added
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.card.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    increaseQuantity: (state,action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if(itemInCart)    itemInCart.quantity++;
    },
    decreaseQuantity: (state,action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if(itemInCart)    itemInCart.quantity--;
    },
  },
});

export const { addtoCart, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
