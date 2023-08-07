import React, { useState } from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    onSearch(newSearchText);
  };

  return (
    <TextField
      label="Search Item"
      variant="outlined"
      value={searchText}
      onChange={handleSearch}
      sx={{ width: "100%", maxWidth: 500 }}
    />
  );
};

export default SearchBar;
