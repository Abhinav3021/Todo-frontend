'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import { searchTodos } from '@/services/search.service';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchTodos(query),
    enabled: !!query, // only run when query exists
  });

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">
        Semantic Todo Search
      </h1>

      <SearchBar onSearch={setQuery} />

      <SearchResults
        data={data}
        loading={isLoading}
      />
    </div>
  );
}