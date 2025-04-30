'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type DataTableProps } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function DataTable<TData, TValue>({ columns, data, searchKey, filterBy, paging }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        manualPagination: true,
    });

    const handleNextPage = () => {
        if (paging && paging.current_page < paging.total_page) {
            router.visit(`?page=${paging.current_page + 1}`);
        }
    };

    const handlePrevPage = () => {
        if (paging && paging.current_page > 1) {
            router.visit(`?page=${paging.current_page - 1}`);
        }
    };

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder={`Filter berdasarkan ${filterBy}...`}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-justify align-middle">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={!paging || paging.current_page <= 1}>
                    Previous
                </Button>
                <span className="text-muted-foreground text-sm">
                    Page {paging?.current_page ?? 1} of {paging?.total_page ?? 1}
                </span>
                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={!paging || paging.current_page >= paging.total_page}>
                    Next
                </Button>
            </div>
        </div>
    );
}
