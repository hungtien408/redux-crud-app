import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { getProductList } from '../../productSlice';
import ProductTable from '../../components/ProductTable';
import './styles.scss';

function ListPage() {
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

export default ListPage;
