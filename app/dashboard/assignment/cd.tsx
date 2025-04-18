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
import { ArrowUpDown, ChevronDown, Pencil, Plus } from "lucide-react"
import Link from "next/link"

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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import FForm from "./edit"

export type TableDDATA = {
  Time: string
  Subject: string
  Decs: string
  Due: string
  isDue: boolean
}

interface DataTableDemoProps {
  data: TableDDATA[]
}

export function DataTableDemo({ data }: DataTableDemoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({});
  const [rawDATA, setRawData] = React.useState<TableDDATA>();
  const [openDrawer, SetOpenDrawer] = React.useState(false);

  const columns: ColumnDef<TableDDATA>[] = [
    {
      accessorKey: "Edit",
      header: () => <div className="table-cell"><Pencil size={16} /></div>,
      cell: ({ row }) => (
        <div
          className="table-cell cursor-pointer"
          onClick={() => {
            setRawData(row.original);
            SetOpenDrawer(true);
          }}
        >
          <Pencil size={16} />
        </div>
      ),
    },
    {
      accessorKey: "Time",
      header: () => <div className="table-cell">วันที่</div>,
      cell: ({ row }) => (
        <div className="table-cell">{row.getValue("Time")}</div>
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
      header: () => <div>รายละเอียด</div>,
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
      header: () => <div className="hidden md:table-cell">วันกำหนดส่ง</div>,
      cell: ({ row }) => {
        return <div className="hidden md:table-cell max-w-sm break-words whitespace-pre-wrap">{row.getValue("Due")}</div>
      },
    },
  ]

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

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4 gap-3">
          <Input
            placeholder="ค้นหารายละเอียดงาน"
            value={(table.getColumn("Decs")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Decs")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="ml-auto flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
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
            <Link href={"/dashboard/assignment/form"}>
              <Button variant="outline">
                <Plus />
              </Button>
            </Link>
          </div>
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
      <div>
        <Drawer open={openDrawer} onOpenChange={SetOpenDrawer}>
          <DrawerContent>
            <div className='max-w-xl mx-auto'>
              <DrawerHeader>
                <DrawerTitle className='flex items-center gap-2'><Pencil /> แก้ไขข้อมูลภาระงาน</DrawerTitle>
                <div className="mt-1">
                  <FForm data={rawDATA} />
                </div>
              </DrawerHeader>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}