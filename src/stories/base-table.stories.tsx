import { useMemo, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import { Box } from "@mui/material";
import type { ComponentMeta, Story } from "@storybook/react";
import { BaseTable } from "../components/table/base-table";
import { makeData, MockUser, getRowId } from "./makeMockData";
import { rowSelectionCol } from "../components/table/row-selection-col";

const MOCK_DATA: MockUser[] = makeData();

const useExampleTableProps = (data: MockUser[] = [], pending = false, selectable = false) => {
  const columns = useMemo<ColumnDef<MockUser>[]>(
    () => [
      ...(selectable ? [rowSelectionCol as ColumnDef<MockUser>] : []),
      {
        header: "First name",
        accessorKey: "firstName",
      },
      {
        header: "Last name",
        accessorKey: "lastName",
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

  const table = useReactTable({
    data: data,
    columns,
    state: {
      rowSelection,
    },
    getRowId: getRowId,
    enableRowSelection: selectable,
    // // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { table, pending, rowSelection };
};

export default {
  title: "Table/Base Table",
  component: BaseTable,
} as ComponentMeta<typeof BaseTable>;

const Template: Story = (args) => {
  const { table, pending, rowSelection } = useExampleTableProps(args.data, args.pending, args.selectable);

  return (
    <Box sx={{ width: "100%" }}>
      <BaseTable table={table} pending={pending} />

      {args.selectable && <pre>{JSON.stringify({ rowSelection }, null, 2)}</pre>}
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: MOCK_DATA,
};

export const Selectable = Template.bind({});
Selectable.args = {
  data: MOCK_DATA,
  selectable: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
};

export const PendingNoData = Template.bind({});
PendingNoData.args = {
  data: [],
  pending: true,
};

export const PendingSelectable = Template.bind({});
PendingSelectable.args = {
  data: [],
  pending: true,
  selectable: true,
};

export const PendingWithData = Template.bind({});
PendingWithData.args = {
  data: MOCK_DATA,
  pending: true,
};
