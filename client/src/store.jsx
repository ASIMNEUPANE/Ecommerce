import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer,PAUSE,PERSIST,REGISTER,PURGE,FLUSH,REHYDRATE } from "redux-persist";
import { autoMergeLevel2 } from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import { cartReducer } from "./slices/cartSlice";
import { productReducer } from "./slices/productSlice";
import { orderReducer } from "./slices/orderSlice";
import { authReducer } from "./slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedProductsReducer = persistReducer(persistConfig, productReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    products: persistedProductsReducer,
    auth:persistedAuthReducer,
    orders: orderReducer,

  },
  middleware:(getDefaultMiddleware)=>
getDefaultMiddleware({
  serializableCheck:{
    ignoreActions: [PAUSE,PERSIST,REGISTER,PURGE,FLUSH,REHYDRATE ]
  }
})
  
});

export const newStore = persistStore(store);
