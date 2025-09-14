import { Bot, User } from 'lucide-react'
import { Message } from '../stores/chatStore'
import { MessageBubble } from './MessageBubble'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Start a conversation
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Type a message below to begin chatting with your AI assistant.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  )
}
