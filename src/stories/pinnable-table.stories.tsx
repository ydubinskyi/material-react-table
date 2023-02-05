import { useMemo, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnPinningState,
  RowSelectionState,
} from "@tanstack/react-table";
import { Box } from "@mui/material";
import type { ComponentMeta, Story } from "@storybook/react";
import { getRowId, makeData, MockUser } from "./makeMockData";
import { rowSelectionCol } from "../components/table/row-selection-col";
import { PinnableTable } from "../components/table/pinnable-table";

const MOCK_DATA: MockUser[] = makeData();

const useExampleTableProps = (data: MockUser[] = [], pending = false) => {
  const columns = useMemo<ColumnDef<MockUser>[]>(
    () => [
      { ...(rowSelectionCol as ColumnDef<MockUser>), enablePinning: true },
      {
        header: "First name",
        accessorKey: "firstName",
        enablePinning: true,
      },
      {
        header: "Last name",
        accessorKey: "lastName",
        enablePinning: true,
      },
      {
        header: "Username",
        accessorKey: "username",
      },
      {
        header: "Phone",
        accessorKey: "phone",
      },
      {
        header: "Email",
        accessorKey: "email",
        size: 250,
        enablePinning: true,
      },
      {
        header: "City",
        accessorKey: "city",
      },
      {
        header: "Address",
        accessorKey: "address",
        size: 250,
      },
      {
        header: "Fav. color",
        accessorKey: "favoriteColor",
        size: 100,
      },
      {
        header: "Birthdate",
        accessorKey: "birthDate",
        cell: ({ row }) => row.original.birthDate.toLocaleDateString(),
        enablePinning: true,
      },
      {
        header: "Car model",
        accessorKey: "carModel",
        size: 200,
      },
      {
        header: "Registered at",
        accessorKey: "registeredAt",
        cell: ({ row }) => row.original.registeredAt.toLocaleDateString(),
      },
      {
        header: "Last updated at",
        accessorKey: "lastUpdateddAt",
        cell: ({ row }) => row.original.lastUpdateddAt.toLocaleDateString(),
      },
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: ["select", "firstName"], right: [] });

  const table = useReactTable({
    data: data,
    columns,
    defaultColumn: {
      enablePinning: false,
    },
    state: {
      rowSelection,
      columnPinning,
    },
    enableRowSelection: true,
    enablePinning: true,
    getRowId: getRowId,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { table, pending, rowSelection, columnPinning };
};

export default {
  title: "Table/Pinnable Table",
  component: PinnableTable,
} as ComponentMeta<typeof PinnableTable>;

const Template: Story = (args) => {
  const { table, pending, rowSelection, columnPinning } = useExampleTableProps(args.data, args.pending);

  return (
    <Box sx={{ width: "100%" }}>
      <PinnableTable table={table} pending={pending} />

      <pre>{JSON.stringify({ rowSelection, columnPinning }, null, 2)}</pre>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: MOCK_DATA,
};

export const Pending = Template.bind({});
Pending.args = {
  data: [],
  pending: true,
};
