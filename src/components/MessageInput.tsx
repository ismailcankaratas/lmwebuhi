import { useState, useRef, KeyboardEvent } from 'react'
import { Send, Mic } from 'lucide-react'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function MessageInput({ onSendMessage, disabled, placeholder }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }

  return (
    <form className="mx-auto max-w-[1100px]" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="relative rounded-2xl bg-[#0b1220] ring-1 ring-white/10 shadow-[0_0_0_2px_rgba(255,255,255,0.02)] px-4 py-3 flex items-end gap-3">
        <label htmlFor="message-input" className="sr-only">
          Type your message
        </label>
        <textarea
          id="message-input"
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            handleInput()
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 resize-none bg-transparent outline-none placeholder:text-slate-400 text-slate-100 text-[15px] leading-7 min-h-[48px] max-h-[120px]"
          rows={1}
          aria-describedby="message-help"
          aria-invalid={false}
        />
        <div id="message-help" className="sr-only">
          Press Enter to send, Shift+Enter for new line
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-10 w-10 grid place-items-center rounded-xl hover:bg-white/5 transition-colors"
            aria-label="Attach file"
          >
            <span className="text-slate-400 text-lg">📎</span>
          </button>
          
          <button
            type="button"
            className="h-10 w-10 grid place-items-center rounded-xl hover:bg-white/5 transition-colors"
            aria-label="Voice input"
          >
            <Mic className="h-4 w-4 text-slate-400" />
          </button>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="h-10 px-5 rounded-xl bg-emerald-400 text-[#052b22] font-medium hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:ring-2 ring-emerald-400/40"
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </form>
  )
}
