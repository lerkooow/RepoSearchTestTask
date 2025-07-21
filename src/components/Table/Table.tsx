import { useState, useMemo, useCallback, type ChangeEvent } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import { columns } from "../../constants/data";

import type { Order, TReposData } from "../../types/types";

import s from "./Table.module.scss";

interface BasicTableProps {
  onSelect: (repo: TReposData) => void;
  repos: TReposData[];
  searchValue: string;
}

export const BasicTable = ({ repos, onSelect }: BasicTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TReposData | null>(null);

  const sortableColumns: (keyof TReposData)[] = ["stargazers_count", "forks", "updated_at"];

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  const handleSort = useCallback(
    (property: keyof TReposData) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const sortedRepos = useMemo(() => {
    const sorted = [...repos];
    if (!orderBy) return sorted;

    return sorted.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (orderBy === "updated_at") {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        return order === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [repos, orderBy, order]);

  return (
    <Paper className={s.table__paper} elevation={0}>
      <TableContainer className={s.table__container}>
        <Table stickyHeader aria-label="sortable table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                const isSortable = sortableColumns.includes(column.id);
                return (
                  <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false} sx={{ minWidth: column.minWidth }}>
                    {isSortable ? (
                      <TableSortLabel hideSortIcon={false} active={orderBy === column.id} direction={orderBy === column.id ? order : "asc"} onClick={() => handleSort(column.id)}>
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRepos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.id} onClick={() => onSelect(row)} className={s.table__tableRow}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return <TableCell key={column.id}>{column.format ? column.format(value) : typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={repos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
