import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import PageMain from 'components/page-main';
import Pager from 'components/pager';
import ScrollableTable from 'components/table/scrollable-table';
import { getProductList, setFilter } from 'features/product/product-slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ProductTable from '../../components/product-table';
import './styles.scss';

function ProductList() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { list, filter, pagination } = product;

  useEffect(() => {
    dispatch(getProductList(filter));
  }, [dispatch, filter]);

  const onSearchEnter = (values) => {
    const { searchInput } = values;
    dispatch(setFilter({ ...filter, q: searchInput || undefined }));
  };

  const onRefresh = () => {
    // eslint-disable-next-line no-console
    console.log('onRefresh');
  };

  const onCreate = () => {
    // eslint-disable-next-line no-console
    console.log('onCreate');
  };

  const handlePageChange = (page) => {
    dispatch(setFilter({ ...filter, _page: page }));
  };

  const applyFiltered = (column, event) => {
    if (event.key === 'Enter' || event === '') {
      const { value } = event.target;
      const key = typeof value === 'string' ? `${column}_like` : column;
      dispatch(setFilter({ ...filter, [key]: value || undefined }));
    }
  };

  return (
    <PageMain
      page="Sản Phẩm"
      title="Tất cả sản phẩm"
      handleSearchEnter={onSearchEnter}
      handleRefresh={onRefresh}
      handleCreate={onCreate}
    >
      {/* <ProductTable productList={product.list} /> */}
      <ScrollableTable>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="left">
                <div>Tên</div>
                <TextField
                  id="standard-basic"
                  label="Tìm theo Tên"
                  variant="standard"
                  style={{ width: '100%' }}
                  onKeyDown={(e) => applyFiltered('name', e)}
                />
              </TableCell>
              <TableCell align="left">
                <div>Giá</div>
                <TextField
                  id="standard-basic"
                  label="Tìm theo Giá"
                  variant="standard"
                  style={{ width: '100%' }}
                  onKeyDown={(e) => applyFiltered('price', e)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{'$' + row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollableTable>
      <Pager
        page={pagination._page}
        total={pagination._totalRows}
        limit={pagination._limit}
        changePage={handlePageChange}
      />
    </PageMain>
  );
}

export default ProductList;
