import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as PRODUCT_API from "../services/products";

const initialState = {
  products: [],
  total: 0,
  currentPage: 1,
  product: {},
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await PRODUCT_API.list();
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add iser to the state array
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = [...action.payload];
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setCurrentPage } = productSlice.actions;

export const productReducer = productSlice.reducer;
