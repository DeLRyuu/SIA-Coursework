import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps): JSX.Element {
  return (
    <div className="search-bar">
      <Search size={16} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search burgers..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search burgers"
      />
    </div>
  );
}
