// src/features/counter/movieSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "localhost:3000";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    list: {
      data: [],
      totalPages: 0,
      currentPage: 0,
      totalData: 0,
      dataPerPage: 0,
    },
    detail: {},
  },
  reducers: {
    setProducts: (state, action) => {
      state.list.data = action.payload.data;
    },
    setDetailProduct: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { setProducts, setDetailProduct } = productSlice.actions;

export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${serverUrl}/products`);
    dispatch(setProducts(data));
  };
};

export const fetchDetailProduct = (productId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${serverUrl}/products/${productId}`);
    dispatch(setDetailProduct(data));
  };
};

export default productSlice.reducer;
