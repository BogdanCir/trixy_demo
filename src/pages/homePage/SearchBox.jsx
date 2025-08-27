import React, { useState } from 'react';
import { Searchbar } from 'framework7-react';
import { Mic } from 'feather-icons-react';

export default function SearchBox({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(value);
  };

  return (
    <div className="search-box">
      <Searchbar
        value={value}
        placeholder="Start typing..."
        clearButton
        onChange={(e) => setValue(e.target.value)}
        onSearchbarSearch={handleSearch}
      />
      <Mic size={20} className="search-box__mic" onClick={() => console.log('mic')} />
    </div>
  );
}
