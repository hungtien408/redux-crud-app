import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import PageMain from 'components/page-main';
import DataTable from 'components/table';
import ProductAdd from 'features/product/components/product-add';
import { createProduct, getProductList, setFilter } from 'features/product/product-slice';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  const displayColumns = [
    {
      field: 'name',
      title: 'Tên',
      type: 'text',
      align: 'left',
    },
    {
      field: 'price',
      title: 'Giá',
      type: 'number',
      align: 'left',
    },
  ];

  const product = useSelector((state) => state.product);
  const { list, filter, pagination } = product;
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(getProductList(filter));
  }, [dispatch, filter]);

  const onFiltered = (key, value) => {
    dispatch(setFilter({ ...filter, [key]: value || undefined }));
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
      <DataTable
        list={list}
        displayColumns={displayColumns}
        pagination={pagination}
        handleFiltered={onFiltered}
        handlePageChange={onPageChange}
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
