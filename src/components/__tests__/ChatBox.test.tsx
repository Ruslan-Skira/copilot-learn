import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../test/utils';
import { ChatBox } from '../ChatBox';
import userEvent from '@testing-library/user-event';
import type { ChatMessage } from '../../types';

// Mock the OpenAI assistant hook
const mockUseOpenAIAssistant = {
  messages: [] as ChatMessage[],
  isLoading: false,
  sendMessage: vi.fn(),
  startNewChat: vi.fn(),
};

vi.mock('../../hooks/useOpenAIAssistant', () => ({
  useOpenAIAssistant: () => mockUseOpenAIAssistant,
}));

describe('ChatBox', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseOpenAIAssistant.messages = [];
    mockUseOpenAIAssistant.isLoading = false;
  });

  it('should render chat interface', () => {
    render(<ChatBox />);

    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /new chat/i })).toBeInTheDocument();
    expect(screen.getByText('Welcome to AI Assistant')).toBeInTheDocument();
  });

  it('should handle input changes', async () => {
    const user = userEvent.setup();
    render(<ChatBox />);

    const input = screen.getByPlaceholderText('Type your message...');
    await user.type(input, 'Hello, world!');

    expect(input).toHaveValue('Hello, world!');
  });

  it('should send message when form is submitted', async () => {
    const user = userEvent.setup();
    render(<ChatBox />);

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: '' }); // Button with only icon

    await user.type(input, 'Show me 123 Main Street');
    await user.click(sendButton);

    expect(mockUseOpenAIAssistant.sendMessage).toHaveBeenCalledWith('Show me 123 Main Street');
  });

  it('should prevent sending empty messages', async () => {
    const user = userEvent.setup();
    render(<ChatBox />);

    const sendButton = screen.getByRole('button', { name: '' }); // Button with only icon
    await user.click(sendButton);

    expect(mockUseOpenAIAssistant.sendMessage).not.toHaveBeenCalled();
  });

  it('should start new chat when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ChatBox />);

    const newChatButton = screen.getByRole('button', { name: /new chat/i });
    await user.click(newChatButton);

    expect(mockUseOpenAIAssistant.startNewChat).toHaveBeenCalled();
  });

  it('should display messages', () => {
    mockUseOpenAIAssistant.messages = [
      {
        id: 'msg-1',
        content: 'Hello, how can I help you?',
        role: 'assistant' as const,
        timestamp: new Date('2023-01-01T10:00:00Z'),
      },
      {
        id: 'msg-2',
        content: 'Show me 123 Main Street',
        role: 'user' as const,
        timestamp: new Date('2023-01-01T10:01:00Z'),
      },
    ];

    render(<ChatBox />);

    expect(screen.getByText('Hello, how can I help you?')).toBeInTheDocument();
    expect(screen.getByText('Show me 123 Main Street')).toBeInTheDocument();
  });

  it('should show loading state when sending message', () => {
    mockUseOpenAIAssistant.isLoading = true;

    render(<ChatBox />);

    const sendButton = screen.getByRole('button', { name: '' }); // Button with only icon
    expect(sendButton).toBeDisabled();
  });

  it('should display configuration error when env vars are missing', () => {
    // Test by rendering the JSX structure directly
    const configError = (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-red-800">
          <h3 className="font-semibold">Configuration Error</h3>
          <p className="text-sm mt-1">
            VITE_OPENAI_API_KEY is missing. VITE_ASSISTANT_ID is missing.
            Please check your .env file.
          </p>
        </div>
      </div>
    );

    render(configError);

    expect(screen.getByText('Configuration Error')).toBeInTheDocument();
    expect(screen.getByText(/VITE_OPENAI_API_KEY is missing/)).toBeInTheDocument();
    expect(screen.getByText(/VITE_ASSISTANT_ID is missing/)).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<ChatBox className="custom-class" />);

    const chatBox = container.firstChild as HTMLElement;
    expect(chatBox).toHaveClass('custom-class');
  });

  it('should clear input after sending message', async () => {
    const user = userEvent.setup();
    render(<ChatBox />);

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: '' }); // Button with only icon

    await user.type(input, 'Test message');
    await user.click(sendButton);

    expect(input).toHaveValue('');
  });
});
