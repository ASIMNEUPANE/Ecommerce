import { persistStore, persistReducer } from "redux-persist";
import { autoMergeLevel2 } from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

import { cartReducer } from "./slices/cartSlice";
import { productReducer } from "./slices/productSlice";
import { orderReducer } from "./slices/orderSlice";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

export const newStore = persistStore(store);
