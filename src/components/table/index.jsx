import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import Pager from 'components/pager';
import PropTypes from 'prop-types';
import ScrollableTable from './scrollable-table';

DataTable.propTypes = {
  list: PropTypes.array,
  displayColumns: PropTypes.array,
  pagination: PropTypes.object,
  handleFiltered: PropTypes.func,
  handlePageChange: PropTypes.func,
};

function DataTable({
  list = [],
  displayColumns = [],
  pagination = {},
  handleFiltered = null,
  handlePageChange = null,
}) {
  const applyFiltered = (column, event) => {
    if (!handleFiltered) return;

    setTimeout(() => {
      const { value } = event.target;
      const key = typeof value === 'string' ? `${column}_like` : column;
      handleFiltered(key, value);
    }, 500);
  };

  const pageChange = (page) => {
    if (!handlePageChange) return;
    handlePageChange(page);
  };

  return (
    <>
      <ScrollableTable>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              {displayColumns.map((item, index) => (
                <TableCell key={index} align={item.align}>
                  <div>{item.title}</div>
                  <TextField
                    label={`Tìm theo ${item.title}`}
                    type={item.type}
                    variant="standard"
                    style={{ width: '100%' }}
                    onChange={(e) => applyFiltered(item.field, e)}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                {displayColumns.map((item, index) => (
                  <TableCell key={index} align={item.align}>
                    {row[item.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollableTable>
      <Pager
        page={pagination._page}
        total={pagination._totalRows}
        limit={pagination._limit}
        changePage={pageChange}
      />
    </>
  );
}

export default DataTable;
