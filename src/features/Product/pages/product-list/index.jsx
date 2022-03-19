import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductTable from '../../components/product-table';
import { getProductList } from '../../product-slice';
import './styles.scss';

function ProductList() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductList(product.filter));
  }, [dispatch, product.filter]);

  return (
    <div className="product-main">
      <Container>
        <ProductTable productList={product.list} />
      </Container>
    </div>
  );
}

export default ProductList;
