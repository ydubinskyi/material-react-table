import { Table } from "@tanstack/react-table";
import { TablePagination as MuiTablePagination } from "@mui/material";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 15, 20, 25];

type TablePaginationProps<T> = {
  table: Table<T>;
  pageSizeOptions?: number[];
  disabled?: boolean;
};

export const TablePagination = <T = unknown,>({
  table,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  disabled,
}: TablePaginationProps<T>) => {
  const total = table.getCoreRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <MuiTablePagination
      sx={{ py: 2 }}
      rowsPerPageOptions={pageSizeOptions}
      component="div"
      count={total}
      rowsPerPage={pageSize}
      page={pageIndex}
      onPageChange={(_e, newPage: number) => table.setPageIndex(newPage)}
      onRowsPerPageChange={(e) => {
        table.setPageSize(Number(e.target.value));
      }}
      backIconButtonProps={{ disabled: disabled || !table.getCanPreviousPage() }}
      nextIconButtonProps={{ disabled: disabled || !table.getCanNextPage() }}
      SelectProps={{ disabled: disabled || pageSizeOptions.length <= 1 }}
    />
  );
};
