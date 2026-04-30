'use client';

import { useState } from 'react';

export default function ChatInput({
  onSend,
  loading,
}: {
  onSend: (text: string) => void;
  loading: boolean;
}) {
  const [text, setText] = useState('');

  const submit = () => {
    if (!text.trim() || loading) return;

    onSend(text);
    setText('');
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border rounded-xl px-4 py-3 outline-none"
        placeholder="Ask anything..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="rounded-xl bg-black text-white px-5 py-3 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}