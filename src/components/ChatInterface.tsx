import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { useChatStore } from '../stores/chatStore'
import { ollamaService } from '../services/ollamaService'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import { ModelSelector } from './ModelSelector'
import { PrivacyIndicator } from './PrivacyIndicator'
import { WelcomeScreen } from './WelcomeScreen'

interface ChatInterfaceProps {
  onModelsChange: (models: string[]) => void
}

export function ChatInterface({ onModelsChange }: ChatInterfaceProps) {
  const {
    conversations,
    currentConversationId,
    createConversation,
    setCurrentConversation,
    addMessage,
    updateMessage,
    setLoading,
    isLoading,
    selectedModel,
    setSelectedModel,
  } = useChatStore()

  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const streamingMessageIdRef = useRef<string | null>(null)

  const currentConversation = conversations.find(conv => conv.id === currentConversationId)

  useEffect(() => {
    const initializeApp = async () => {
      // Check Ollama connection
      const connected = await ollamaService.checkConnection()
      setIsConnected(connected)

      if (connected) {
        try {
          const models = await ollamaService.getModels()
          const modelNames = models.map(model => model.name)
          setAvailableModels(modelNames)
          onModelsChange(modelNames) // Notify parent component

          if (modelNames.length > 0 && !selectedModel) {
            setSelectedModel(modelNames[0])
          }
        } catch (error) {
          console.error('Failed to fetch models:', error)
        }
      }

      // Create initial conversation if none exists
      if (conversations.length === 0) {
        createConversation()
      }
    }

    initializeApp()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !currentConversationId || !selectedModel || !isConnected) {
      return
    }

    // Add user message
    addMessage(currentConversationId, {
      role: 'user',
      content: content.trim(),
    })

    setLoading(true)

    try {
      const messages = currentConversation?.messages || []
      const ollamaMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }))

      // Add the new user message
      ollamaMessages.push({
        role: 'user',
        content: content.trim(),
      })

      // Add assistant message placeholder and store its ID
      const assistantMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      streamingMessageIdRef.current = assistantMessageId

      addMessage(currentConversationId, {
        role: 'assistant',
        content: '',
        isStreaming: true,
      }, assistantMessageId)

      let fullResponse = ''

      for await (const chunk of ollamaService.streamChat({
        model: selectedModel,
        messages: ollamaMessages,
        stream: true,
      })) {
        fullResponse += chunk

        // Update the assistant message with streaming content
        if (streamingMessageIdRef.current) {
          updateMessage(currentConversationId, streamingMessageIdRef.current, fullResponse)
        }
      }

      // Mark streaming as complete
      if (streamingMessageIdRef.current) {
        updateMessage(currentConversationId, streamingMessageIdRef.current, fullResponse)
        streamingMessageIdRef.current = null
      }

    } catch (error) {
      console.error('Error sending message:', error)

      // Update with error message
      if (streamingMessageIdRef.current) {
        updateMessage(currentConversationId, streamingMessageIdRef.current,
          'Sorry, I encountered an error. Please make sure Ollama is running and try again.'
        )
        streamingMessageIdRef.current = null
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Ollama Not Connected
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please make sure Ollama is running on your local machine and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  if (availableModels.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No Models Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please install some models in Ollama first. You can do this by running:
          </p>
          <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm mb-4">
            ollama pull llama2
          </code>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {currentConversation && currentConversation.messages.length > 0 ? (
        <>
          {/* Messages - Takes full height above input */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="mx-auto max-w-[1100px] px-4 py-6">
              <MessageList messages={currentConversation.messages} />
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input - Fixed at bottom */}
          <div className="flex-shrink-0 px-4 py-4 ">
            <MessageInput
              onSendMessage={handleSendMessage}
              disabled={isLoading || !selectedModel}
              placeholder={
                !selectedModel
                  ? "Select a model to start chatting..."
                  : isLoading
                    ? "AI is thinking..."
                    : "Type your message..."
              }
            />
          </div>
        </>
      ) : (
        <>
          {/* Welcome Screen - Takes full height above input */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <WelcomeScreen
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              availableModels={availableModels}
              onStartChat={(prompt) => {
                if (!currentConversationId) {
                  createConversation()
                }
                if (prompt) {
                  // Prompt'u otomatik gönder
                  setTimeout(() => {
                    handleSendMessage(prompt)
                  }, 100)
                }
              }}
            />
          </div>

          {/* Input - Fixed at bottom */}
          <div className="flex-shrink-0 px-4 py-4 bg-[#0f172a]">
            <MessageInput
              onSendMessage={handleSendMessage}
              disabled={isLoading || !selectedModel}
              placeholder={
                !selectedModel
                  ? "Select a model to start chatting..."
                  : "Type your message..."
              }
            />
          </div>
        </>
      )}
    </div>
  )
}
