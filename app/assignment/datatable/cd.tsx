/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ArrowUpDown, ChevronDown } from "lucide-react"

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


async function getData(): Promise<TableDDATA[]> {
  try {
    const response = await axios.get(`https://api.smt.siraphop.me/assignment`);
    const homeworkData = response.data.Homework;

    return homeworkData;
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลได้ :", error);

    return [];
  }
}


export type TableDDATA = {
  Time: string
  Subject: string
  Decs: string
  Due: string
  isDue: boolean
}

export const columns: ColumnDef<TableDDATA>[] = [
  {
    accessorKey: "Time",
    header: () => <div className="hidden md:table-cell">วันที่</div>,
    cell: ({ row }) => (
      <div className="hidden md:table-cell">{row.getValue("Time")}</div>
    ),
  },
  {
    accessorKey: "Subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          วิชา
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="max-w-sm break-words whitespace-pre-wrap">{row.getValue("Subject")}</div>,
  },
  {
    accessorKey: "Decs",
    header: () => <div>ลายละเอียด</div>,
    cell: ({ row }) => {
      return (
        <div className="max-w-sm break-words whitespace-pre-wrap">
          {row.getValue("Decs")}
        </div>
      )
    },
  },
  {
    accessorKey: "Due",
    header: () => <div>วันกำหนดส่ง</div>,
    cell: ({ row }) => {
      return <div className="max-w-sm break-words whitespace-pre-wrap">{row.getValue("Due")}</div>
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
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
  })

  if (loading) {
    return <div className="my-10 flex items-center justify-center w-full"><div className="loader rounded-full"></div></div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-3">
        <Input
          placeholder="ค้นหาลายละเอียดงาน"
          value={(table.getColumn("Decs")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Decs")?.setFilterValue(event.target.value)
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
              .map((column) => {
                return (
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={row.original.isDue ? "line-through opacity-50" : ""}
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
