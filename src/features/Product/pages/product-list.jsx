import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import PageMain from 'components/page-main';
import Pager from 'components/pager';
import ScrollableTable from 'components/table/scrollable-table';
import ProductAdd from 'features/product/components/product-add';
import { createProduct, getProductList, setFilter } from 'features/product/product-slice';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ProductTable from '../../components/product-table';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

function ProductList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { list, filter, pagination } = product;
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(getProductList(filter));
  }, [dispatch, filter]);

  const applyFiltered = (column, event) => {
    if (event.key === 'Enter' || event === '') {
      const { value } = event.target;
      const key = typeof value === 'string' ? `${column}_like` : column;
      dispatch(setFilter({ ...filter, [key]: value || undefined }));
    }
  };

  const onSearchEnter = (values) => {
    const { searchInput } = values;
    dispatch(setFilter({ ...filter, q: searchInput || undefined }));
  };

  const onRefresh = () => {
    dispatch(getProductList({ ...filter, _page: 1 }));
  };

  const onCreate = (e) => {
    setOpenDialog(true);
  };

  const onPageChange = (page) => {
    dispatch(setFilter({ ...filter, _page: page }));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateProduct = async (values) => {
    try {
      const action = createProduct(values);
      const resultAction = await dispatch(action);
      // unwrapResult dùng để lấy kết quả từ action object nếu success(fulfilled) => return data, fail(rejected) => throw error
      const product = unwrapResult(resultAction);

      handleCloseDialog();
      enqueueSnackbar(`Tạo ${product.name} thành công!!!`, { variant: 'success' });
      onRefresh();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
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
                  id="filterName"
                  label="Tìm theo Tên"
                  variant="standard"
                  style={{ width: '100%' }}
                  onKeyDown={(e) => applyFiltered('name', e)}
                />
              </TableCell>
              <TableCell align="left">
                <div>Giá</div>
                <TextField
                  id="filterPrice"
                  label="Tìm theo Giá"
                  type="number"
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
        changePage={onPageChange}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton} onClick={handleCloseDialog}>
          <Close />
        </IconButton>
        <DialogTitle id="form-dialog-title">Thêm mới sản phẩm</DialogTitle>
        <DialogContent>
          <ProductAdd onSubmit={handleCreateProduct} />
        </DialogContent>
      </Dialog>
    </PageMain>
  );
}

export default ProductList;
