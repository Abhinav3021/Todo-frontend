'use client';

import { useState } from 'react';
import { Message } from '@/types/chat';
import MessageBubble from '../../components/message-bubble';
import ChatInput from '../../components/chat-input';

export default function ChatWindow() {
  const [messages, setMessages] = useState<
    Message[]
  >([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (
    text: string,
  ) => {
    const userMessage: Message = {
      role: 'user',
      content: text,
    };

    const nextMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(nextMessages);
    setLoading(true);

    const assistantIndex =
      nextMessages.length;

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: '',
      },
    ]);

    try {
      const response = await fetch(
        'http://localhost:5000/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            messages: nextMessages,
          }),
        },
      );

      if (!response.body) {
        throw new Error(
          'No stream received',
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let done = false;

      while (!done) {
        const result =
          await reader.read();

        done = result.done;

        const chunk =
          decoder.decode(
            result.value || new Uint8Array(),
          );

        if (chunk) {
          setMessages((prev) => {
            const copy = [...prev];

            copy[
              assistantIndex
            ] = {
              role: 'assistant',
              content:
                copy[
                  assistantIndex
                ].content + chunk,
            };

            return copy;
          });
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Something went wrong.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-screen flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map(
          (message, index) => (
            <MessageBubble
              key={index}
              message={message}
            />
          ),
        )}

        {loading && (
          <p className="text-sm text-zinc-500">
            Thinking...
          </p>
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
        loading={loading}
      />
    </div>
  );
}