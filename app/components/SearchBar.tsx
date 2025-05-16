"use client";

import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        className="border rounded-none px-3 py-1 placeholder-gruvbox focus:outline-none focus:ring-0"
        style={{ backgroundColor: '#3c3836', color: '#ebdbb2', borderColor: '#fe8019' }}
        type="text"
        placeholder="Search_tools>"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
} 