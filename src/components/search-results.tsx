'use client';

export default function SearchResults({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  if (loading) {
    return (
      <p className="text-sm text-zinc-500">
        Searching...
      </p>
    );
  }

  if (!data?.results?.length) {
    return (
      <p className="text-sm text-zinc-400">
        No results
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.results.map((todo: any) => (
        <div
          key={todo.id}
          className="border rounded-xl p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">
              {todo.title}
            </p>

            <p className="text-xs text-zinc-500">
              similarity: {' '}
              {todo.similarity ? todo.similarity.toFixed(2) : '--'}
            </p>
          </div>

          <span
            className={`text-xs px-2 py-1 rounded ${
              todo.completed
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {todo.completed
              ? 'Done'
              : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  );
}