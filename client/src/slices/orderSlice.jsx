import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ORDER_API from "../services/orders";

const initialState = {
  currentPage: 1,
  error: "",
  loading: false,
  orders: [],
  order: {},
  total: 0,
};

export const create = createAsyncThunk("/orders/create", async (payload) => {

  const res = await ORDER_API.create(payload);
  return res.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.fulfilled, (state, action) => {
    // Add order data to the state
        state.loading = false;
        state.orders.push(action.payload.data);
      })
      .addCase(create.pending, (state) => {
         // Set loading state to true while the request is pending
        state.loading = true;
      })
      .addCase(create.rejected, (state, action) => {
            // Handle rejected action, possibly with an error message

        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setCurrentPage } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;