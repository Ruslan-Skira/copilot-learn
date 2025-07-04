import { useState, useCallback, useRef, useMemo } from 'react';
import OpenAI from 'openai';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface UseOpenAIAssistantProps {
  apiKey: string;
  assistantId: string;
}

export const useOpenAIAssistant = ({ apiKey, assistantId }: UseOpenAIAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const openai = useMemo(() => new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
  }), [apiKey]);

  const createNewThread = useCallback(async () => {
    try {
      const thread = await openai.beta.threads.create();
      setThreadId(thread.id);
      setMessages([]);
      return thread.id;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }, [openai]);

  const sendMessage = useCallback(async (content: string) => {
    let currentThreadId = threadId;

    // Create thread if it doesn't exist
    if (!currentThreadId) {
      currentThreadId = await createNewThread();
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Add message to thread
      await openai.beta.threads.messages.create(currentThreadId, {
        role: 'user',
        content,
      });

      // Create assistant message placeholder
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      // Create and stream the run
      const stream = openai.beta.threads.runs.stream(currentThreadId, {
        assistant_id: assistantId,
      });

      stream.on('textDelta', (textDelta) => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + (textDelta.value || '') }
              : msg
          )
        );
      });

      stream.on('textDone', () => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, isStreaming: false }
              : msg
          )
        );
        setIsLoading(false);
      });

      stream.on('error', (error) => {
        console.error('Streaming error:', error);
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: 'Error: Failed to get response', isStreaming: false }
              : msg
          )
        );
        setIsLoading(false);
      });

      stream.on('end', () => {
        setIsLoading(false);
      });

    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Sorry, I encountered an error. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = 'API key error. Please check your OpenAI API key.';
        } else if (error.message.includes('assistant')) {
          errorMessage = 'Assistant not found. Please check your Assistant ID.';
        } else if (error.message.includes('thread')) {
          errorMessage = 'Thread error. Please try starting a new chat.';
        }
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
      }]);
      setIsLoading(false);
    }
  }, [openai, threadId, assistantId, createNewThread]);

  const startNewChat = useCallback(async () => {
    // Abort any ongoing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsLoading(false);
    await createNewThread();
  }, [createNewThread]);

  return {
    messages,
    isLoading,
    sendMessage,
    startNewChat,
  };
};
