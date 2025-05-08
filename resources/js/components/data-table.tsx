'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type DataTableProps } from '@/types';
import { router } from '@inertiajs/react';
import {
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

export function DataTable<TData, TValue>({ columns, data, paging, service }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
            sorting,
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
        <div className="space-y-4">
            <Popover>
                <PopoverTrigger className="cursor-pointer rounded-sm border w-[10rem] py-1 hover:bg-accent">Filter</PopoverTrigger>
                <PopoverContent className="space-y-4" align="start">
                    <div className="space-y-3">
                        <p className="text-center font-semibold">Filter {service} berdasarkan</p>
                        <Separator />
                    </div>
                    <div className="flex flex-col gap-4">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanFilter())
                            .map((column) => {
                                let label: string = column.id;

                                const rawHeader = column.columnDef.header;

                                if (typeof rawHeader === 'string') {
                                    label = rawHeader;
                                } else if (typeof rawHeader === 'function') {
                                    label = column.id.replace(/_/g, ' ');
                                }

                                return (
                                    <div key={column.id} className="flex flex-col gap-y-2">
                                        <Label className='uppercase'>{label}</Label>
                                        <Input
                                            placeholder={`Filter ${label}`}
                                            value={(column.getFilterValue() as string) ?? ''}
                                            onChange={(event) => column.setFilterValue(event.target.value)}
                                            className="max-w-sm"
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </PopoverContent>
            </Popover>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className='font-bold'>
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
                    Sebelumnya
                </Button>
                <span className="text-muted-foreground text-sm">
                    Halaman {paging?.current_page ?? 1} dari {paging?.total_page ?? 1}
                </span>
                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={!paging || paging.current_page >= paging.total_page}>
                    Selanjutnya
                </Button>
            </div>
        </div>
    );
}
