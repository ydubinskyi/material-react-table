import { Checkbox } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";

export const TABLE_SELECTION_COLUMN_ID = "select";

export const rowSelectionCol: ColumnDef<unknown> = {
  id: TABLE_SELECTION_COLUMN_ID,
  header: ({ table }) => (
    <Checkbox
      color="default"
      size="small"
      indeterminate={table.getIsSomeRowsSelected()}
      checked={table.getIsAllRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      color="default"
      size="small"
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onChange={row.getToggleSelectedHandler()}
    />
  ),
  size: 40,
} as const;
