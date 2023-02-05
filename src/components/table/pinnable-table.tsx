import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

import PushPinIcon from "@mui/icons-material/PushPin";
import ClearIcon from "@mui/icons-material/Clear";
import { Cell, flexRender, HeaderGroup, Row, SortDirection } from "@tanstack/react-table";
import { TablePagination } from "./table-pagination";
import { LoadingSpinner } from "../loading-spinner";
import { TableBodySkeleton } from "./table-body-skeleton";
import { TABLE_SELECTION_COLUMN_ID } from "./row-selection-col";
import type { BaseTableProps } from "./base-table";

const HeadRow = <TRow = unknown,>({ headerGroup, pending }: { headerGroup: HeaderGroup<TRow>; pending: boolean }) => (
  <TableRow>
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
        {header.id !== TABLE_SELECTION_COLUMN_ID && header.column.getCanPin() && (
          <IconButton
            aria-label={header.column.getIsPinned() ? "Unpin" : "Pin"}
            onClick={() => {
              header.column.pin(header.column.getIsPinned() ? false : "left");
            }}
            size="small"
          >
            {header.column.getIsPinned() ? <ClearIcon /> : <PushPinIcon />}
          </IconButton>
        )}
      </TableCell>
    ))}
  </TableRow>
);

const BodyCell = <TRow = unknown,>({ cell }: { cell: Cell<TRow> }) => (
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
);

export const PinnableTable = <TRow = unknown,>({ table, pending, noDataPlaceholder }: BaseTableProps<TRow>) => {
  const totalDataLength = table.getCoreRowModel().rows.length;
  const colSpan = table.getAllColumns().length + 1;

  return (
    <Box sx={{ position: "relative" }}>
      <TablePagination<TRow> table={table} disabled={pending} />

      <TableContainer sx={{ display: "flex" }}>
        <Table sx={{ position: "sticky", left: 0, backgroundColor: "#fff", zIndex: 2 }}>
          <TableHead>
            {table.getLeftHeaderGroups().map((headerGroup) => (
              <HeadRow key={headerGroup.id} headerGroup={headerGroup} pending={!!pending} />
            ))}
          </TableHead>

          <TableBody>
            {totalDataLength > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getLeftVisibleCells().map((cell) => (
                    <BodyCell key={cell.id} cell={cell} />
                  ))}
                </TableRow>
              ))
            ) : pending ? (
              <TableBodySkeleton
                colsCount={table.getLeftLeafColumns().length}
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

        <Table sx={{}}>
          <TableHead>
            {table.getCenterHeaderGroups().map((headerGroup) => (
              <HeadRow key={headerGroup.id} headerGroup={headerGroup} pending={!!pending} />
            ))}
          </TableHead>

          <TableBody>
            {totalDataLength > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getCenterVisibleCells().map((cell) => (
                    <BodyCell key={cell.id} cell={cell} />
                  ))}
                </TableRow>
              ))
            ) : pending ? (
              <TableBodySkeleton
                colsCount={table.getCenterLeafColumns().length}
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
