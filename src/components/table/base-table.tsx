import { ReactNode } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

import { flexRender, SortDirection, Table as ReactTable } from "@tanstack/react-table";
import { TablePagination } from "./table-pagination";
import { LoadingSpinner } from "../loading-spinner";
import { TableBodySkeleton } from "./table-body-skeleton";
import { TABLE_SELECTION_COLUMN_ID } from "./row-selection-col";

export type BaseTableProps<TRow> = {
  table: ReactTable<TRow>;
  pending?: boolean;
  noDataPlaceholder?: ReactNode;
};

export const BaseTable = <TRow = unknown,>({ table, pending, noDataPlaceholder }: BaseTableProps<TRow>) => {
  const totalDataLength = table.getCoreRowModel().rows.length;
  const colSpan = table.getAllColumns().length + 1;

  return (
    <Box sx={{ position: "relative" }}>
      <TablePagination<TRow> table={table} disabled={pending} />
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      minWidth: header.getSize(),
                      width: header.getSize(),
                      maxWidth: header.getSize(),
                      py: header.id === TABLE_SELECTION_COLUMN_ID ? 0 : undefined,
                    }}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <TableSortLabel
                        active={!!header.column.getIsSorted()}
                        direction={header.column.getIsSorted() ? (header.column.getIsSorted() as SortDirection) : "asc"}
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={pending}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableSortLabel>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {totalDataLength > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        minWidth: cell.column.getSize(),
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        py: cell.column.id === TABLE_SELECTION_COLUMN_ID ? 0 : undefined,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : pending ? (
              <TableBodySkeleton
                colsCount={table.getAllColumns().length}
                rowsCount={table.getState().pagination.pageSize}
              />
            ) : (
              <TableRow>
                <TableCell colSpan={colSpan} align="center">
                  <Typography variant="body1">{noDataPlaceholder ?? "No data"}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination<TRow> table={table} disabled={pending} />

      {pending ? <LoadingSpinner /> : null}
    </Box>
  );
};
