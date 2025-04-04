"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, UserCheck, UserX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios"

export type TableDDATA = {
    Date: string
    Count: string
    Number: string
    All: string
}

async function getData(): Promise<TableDDATA[]> {
    try {
        const response = await axios.get(`https://api.smt.siraphop.me/absent`);
        const absentData = response.data.Absent;

        return absentData
    } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลการขาดเรียนได้ :", error);
        return [];
    }
}

export const columns: ColumnDef<TableDDATA>[] = [
    {
        accessorKey: "Date",
        header: () => <div>วันที่</div>,
        cell: ({ row }) => (
            <div>{row.getValue("Date")}</div>
        ),
    },
    {
        accessorKey: "Count",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                สถิตินักเรียน <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="flex items-center gap-2"><UserCheck size={16} /> {36 - parseInt(row.getValue("Count"))} คน <UserX size={18} /> {row.getValue("Count")} คน</div>,
    },
    {
        accessorKey: "Number",
        header: () => <div>เลขที่ ที่ไม่มา</div>,
        cell: ({ row }) => (
            <div className="max-w-sm break-words whitespace-pre-wrap">
                {row.getValue("Number")}
            </div>
        ),
    },
]

export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [data, setData] = React.useState<TableDDATA[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getData()
            setData(result)
            setLoading(false)
        }
        fetchData()
    }, [])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 20,
            },
        },
    })

    if (loading) {
        return <div className="my-10 flex items-center justify-center w-full"><div className="loader rounded-full"></div></div>;
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-3">
                <Input
                    placeholder="ค้นหาวันที่"
                    value={(table.getColumn("Date")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("Date")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            กรองตามคอลัมน์ <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    ไม่พบข้อมูล
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        ก่อนหน้า
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        ถัดไป
                    </Button>
                </div>
            </div>
        </div>
    )
}
