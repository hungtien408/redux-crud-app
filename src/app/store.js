import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from 'components/layout/layout-slice';
import productReducer from 'features/product/product-slice';

const rootReducer = {
  layout: layoutReducer,
  product: productReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
