import { createPortal } from "react-dom";
import { Command, CommandInput, CommandGroup, CommandItem } from "@/components/ui/command";
import { MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function CommandPopover({
  columnVisibility,
  toggleColumnVisibility,
  table,
}: {
  columnVisibility: Record<string, boolean>;
  toggleColumnVisibility: (columnId: string) => void;
  table: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close the popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Add event listener when popover is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-none hover:bg-muted transition-colors"
      >
        <MoreVertical className="h-5 w-5 text-foreground" />
      </button>
      {isOpen && createPortal(
        <div
          ref={popoverRef}
          className="fixed top-20 right-5 w-80 bg-background border border-muted rounded-none shadow-md z-50"
        >
          <Command className="max-h-60 overflow-y-auto p-2 rounded-none">
            <CommandInput placeholder="Search column..." />
            <CommandGroup>
              {Object.values(columnVisibility).every((visible) => !visible) ? (
                <div className="p-4 text-center text-muted-foreground">
                  No columns selected
                </div>
              ) : (
                table.getAllColumns().map((column: any) => (
                  <CommandItem
                    key={column.id}
                    onSelect={() => toggleColumnVisibility(column.id)}
                    className="flex items-center gap-2 py-1 px-2 hover:bg-muted/20 rounded-none transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={() => toggleColumnVisibility(column.id)}
                    />
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </Command>
        </div>,
        document.body
      )}
    </>
  );
}

export { CommandPopover };
