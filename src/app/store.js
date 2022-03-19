import { configureStore } from '@reduxjs/toolkit';
import productReducer from './../features/product/product-slice';
const rootReducer = {
  product: productReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
