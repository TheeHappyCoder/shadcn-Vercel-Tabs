"use client";

import * as React from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { CommandPopover } from "../command-popover";
import { AlertCircle, ArrowDownNarrowWide,ArrowUpNarrowWide,X } from "lucide-react";
import { Button } from "./button";

type TableProps<TData extends Record<string, any>> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  caption?: string;
  className?: string;
  headerAction?: React.ReactNode;
  actionFooter?: React.ReactNode[];
  selectedDockActions?: React.ReactNode[];
  onRowSelect?: (client: TData) => void;
  bordered?: "none" | "right" | "full"; // Add this line
  showDeselect?: boolean;
};



function Table<TData extends Record<string, any>>({ data, columns, caption, className, headerAction, actionFooter, selectedDockActions, onRowSelect, bordered = "right", showDeselect }: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState<string>("");
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    columns.reduce((acc, col) => ({ ...acc, [col.id as string]: true }), {})
  );

// Handle column visibility change
    const toggleColumnVisibility = (columnId: string) => {
      const visibleColumns = Object.values(columnVisibility).filter(Boolean).length;

      // If toggling off the last visible column, prevent the action
      if (visibleColumns === 1 && columnVisibility[columnId]) {
        return;
      }

      setColumnVisibility((prev) => ({
        ...prev,
        [columnId]: !prev[columnId],
      }));
    };

  // Filtered data based on the search query
  const filteredData = React.useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnVisibility },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

const getBorderClass = (type: "none" | "right" | "full") => {
  if (type === "full") return "border";
  if (type === "right") return "border-b border-r";
  return ""; // No borders
};

  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-hidden rounded-none",
        className
      )}
    >

      {/* Toolbar Header */}
          <div
  data-slot="toolbar-header"
  className={cn(
    "flex justify-between items-center p-2 bg-muted/50 rounded-none",
      getBorderClass(bordered)
  )}
>
  {/* Button on the top left */}
  {headerAction && (
    <div className="flex-shrink-0">
      {headerAction}
    </div>
  )}

  {/* Search, bordered toggle, and column toggle on the right */}
  <div className="flex gap-4 items-center ml-auto">

    {/* Search Input */}
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
      className={cn(
        "px-3 py-2 text-sm border border-muted rounded-none focus:outline-none",
        "bg-background text-foreground placeholder-muted-foreground",
        "focus:ring-2 focus:ring-offset-2 focus:ring-ring"
      )}
    />

    {/* Column Toggle Popover */}
<div className="relative">
  <CommandPopover
    columnVisibility={columnVisibility} 
    toggleColumnVisibility={toggleColumnVisibility} 
    table={table} 
  />
</div>


  </div>
</div>

      <table
        data-slot="table"
        className={cn(
          "w-full text-sm text-left border-collapse bg-background text-foreground",
          "transition-colors",
          className
        )}
      >
        {caption && (
          <caption
            data-slot="table-caption"
            className="text-muted-foreground py-2 text-base font-semibold"
          >
            {caption}
          </caption>
        )}
        <thead data-slot="table-header" className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={cn(
                  getBorderClass(bordered)
                )}
              >
              {headerGroup.headers.map((header) => (
               <th
                key={header.id}
                data-slot="table-head"
                className="px-10 py-2 text-left font-medium cursor-pointer select-none"
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center gap-1">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" && <ArrowUpNarrowWide className="w-4 h-4" />}
                  {header.column.getIsSorted() === "desc" && <ArrowDownNarrowWide className="w-4 h-4" />}
                </div>
              </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="rounded-b-sm" data-slot="table-body">
            {Object.values(columnVisibility).every((visible) => !visible) ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="p-4 text-center text-muted-foreground"
                  style={{ height: "150px" }}
                >
                  No columns selected
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
              <tr
                    key={row.id}
                    className={cn(
                      "hover:bg-muted/20 transition-colors cursor-pointer",
                      selectedRow === row.id ? "bg-muted/40" : ""
                    )}
                    onClick={() => {
                    if (selectedRow === row.id) {
                      setSelectedRow(null); // Deselect if already selected
                    } else {
                      setSelectedRow(row.id);
                      if (onRowSelect) {
                        onRowSelect(row.original);
                      }
                    }
                  }}
                  >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      data-slot="table-cell"
                      className={cn(
                        "px-10 py-4 text-sm",
                        getBorderClass(bordered)
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>

        {filteredData.length === 0 && (
         <tfoot
  data-slot="table-footer"
  className={cn(
    "bg-muted/50",
    getBorderClass(bordered)
  )}
>
  <tr>
    <td colSpan={columns.length} className="p-8 text-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <AlertCircle className="w-10 h-10 text-muted-foreground opacity-60" /> {/* Modern Icon */}
        <span className="text-base text-muted-foreground font-light">
          No data available
        </span>
      </div>
    </td>
  </tr>
</tfoot>
        )}
      </table>
      {/* Action Footer */}
{actionFooter && actionFooter.length > 0 && (
  <div
    data-slot="action-footer"
    className={cn(
      "flex justify-center items-center bg-muted/50 rounded-b-sm h-15 gap-2",
      getBorderClass(bordered),
      "pb-3"
    )}
  >
    {actionFooter.map((action, index) => (
      <Button
        key={index}
        variant="ghost"
        className="inline-flex items-center text-sm font-medium text-primary"
      >
        {action}
      </Button>
    ))}
  </div>
)}

{selectedRow && selectedDockActions && selectedDockActions.length > 0 && (
  <div
    data-slot="selected-row-dock"
    className={cn(
      "flex justify-center items-center bg-muted/50 h-15 gap-2",
      getBorderClass(bordered),
      "pb-1"
    )}
  >
    {selectedDockActions.map((action: React.ReactNode, index: number) =>
    React.isValidElement(action)
      ? React.cloneElement(action, { key: index })
      : null
  )}


    {/* Deselect button with icon + label */}
    {showDeselect && (
  <Button
    key="deselect"
    variant="ghost"
    onClick={() => setSelectedRow(null)}
    className="inline-flex items-center text-sm font-medium text-destructive"
  >
    <X className="w-4 h-4" />
    Deselect
  </Button>
)}

  </div>
)}


    </div>
  );
}

export { Table };
