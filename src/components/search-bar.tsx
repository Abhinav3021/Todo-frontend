'use client';

import { useState, useEffect } from 'react';

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <input
      className="w-full border rounded-xl px-4 py-3 outline-none"
      placeholder="Search todos semantically..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}