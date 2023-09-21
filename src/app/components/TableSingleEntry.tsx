import React from "react"

interface TableRowEntryProps {
      children: React.ReactNode;
}

export const TableRowEntry: React.FC<TableRowEntryProps> = ({ children }) => {
      return (
            <p className="font-mono">{children}</p>
      );
}