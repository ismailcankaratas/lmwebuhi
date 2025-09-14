import { Message } from '../stores/chatStore'
import { TypingDots } from './TypingDots'
import { MarkdownRenderer } from './MarkdownRenderer'

interface MessageBubbleProps {
  message: Message
}

const BotBubble = ({ children, time }: { children: React.ReactNode, time: string }) => (
  <div className="flex gap-3 items-start mb-6">
    <div className="mt-1 h-8 w-8 rounded-full bg-emerald-500/20 grid place-items-center text-sm flex-shrink-0">🤖</div>
    <div className="relative max-w-[80%] rounded-2xl bg-[#111827] px-4 py-3 shadow-sm">
      <div className="text-[15px] leading-7 [&>p]:my-0">{children}</div>
      <span className="absolute -bottom-6 left-2 text-[11px] text-slate-400">{time}</span>
    </div>
  </div>
)

const UserBubble = ({ children, time }: { children: React.ReactNode, time: string }) => (
  <div className="flex justify-end mb-6">
    <div className="relative max-w-[80%] rounded-2xl bg-emerald-400 text-[#052b22] px-4 py-3 shadow-sm">
      <div className="text-[15px] leading-7 [&>p]:my-0">{children}</div>
      <span className="absolute -bottom-6 right-2 text-[11px] text-slate-400">{time}</span>
    </div>
  </div>
)

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isStreaming = message.isStreaming && message.content === ''
  const time = new Date(message.timestamp).toLocaleTimeString()

  if (isUser) {
    return (
      <UserBubble time={time}>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </UserBubble>
    )
  }

  return (
    <BotBubble time={time}>
      {isStreaming ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm">AI is thinking</span>
          <TypingDots />
        </div>
      ) : (
        <div className="relative">
          <MarkdownRenderer content={message.content} />
        
        </div>
      )}
    </BotBubble>
  )
}
