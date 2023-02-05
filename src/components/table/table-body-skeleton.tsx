import { FC } from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";

type TableBodySkeletonProps = {
  colsCount: number;
  rowsCount: number;
};

export const TableBodySkeleton: FC<TableBodySkeletonProps> = ({ colsCount, rowsCount }) => (
  <>
    {[...Array(rowsCount).keys()].map((rowIndex) => (
      <TableRow key={rowIndex}>
        {[...Array(colsCount).keys()].map((colIndex) => (
          <TableCell key={colIndex} align="center">
            <Skeleton animation="pulse" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
