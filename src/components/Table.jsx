import * as React from "react";
import { cn } from "@/lib/utils/Cn";

export const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("w-full border-[#dedede] overflow-x-scroll")}>
    <table ref={ref} className={cn("w-full text-sm", className)} {...props} />
  </div>
));

Table.displayName = "Table";

export const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("font-medium", className)} {...props} />
));

TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef(({ ...props }, ref) => (
  <tbody ref={ref} {...props} />
));
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium border-b-0 border-[var(--border-color)]",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef(({ ...props }, ref) => (
  <tr
    ref={ref}
    className={`${
      props.currindex && props.currindex % 2 !== 0
        ? "bg-[#f3f4f8]"
        : "bg-[#ffffff]"
    }
      `}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "p-1 border-x border-[#ffffff] bg-[#dee0e9] text-[#222222] text-start align-top font-bold text-wrap text-[12px]",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-1 border border-[#dedede] align-middle whitespace-nowrap text-xs text-[#202020]",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
