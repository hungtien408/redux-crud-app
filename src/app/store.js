import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Product/productSlice';
import photoReducer from './../features/Photo/photoSlice';

const rootReducer = {
  photos: photoReducer,
  product: productReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
