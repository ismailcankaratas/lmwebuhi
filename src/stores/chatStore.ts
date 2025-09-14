import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  isStreaming?: boolean
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
  model?: string
}

interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
  isLoading: boolean
  selectedModel: string
  
  // Actions
  createConversation: () => string
  setCurrentConversation: (id: string) => void
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void
  updateMessage: (conversationId: string, messageId: string, content: string) => void
  deleteConversation: (id: string) => void
  setLoading: (loading: boolean) => void
  setSelectedModel: (model: string) => void
  clearAllConversations: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,
      isLoading: false,
      selectedModel: '',
      
      createConversation: () => {
        const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const newConversation: Conversation = {
          id,
          title: 'New Conversation',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: id,
        }))
        
        return id
      },
      
      setCurrentConversation: (id) => {
        set({ currentConversationId: id })
      },
      
      addMessage: (conversationId, message, messageId?: string) => {
        const newMessage: Message = {
          ...message,
          id: messageId || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
        }
        
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  updatedAt: Date.now(),
                  title: conv.messages.length === 0 ? 
                    message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '') 
                    : conv.title,
                }
              : conv
          ),
        }))
      },
      
      updateMessage: (conversationId, messageId, content) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, content } : msg
                  ),
                  updatedAt: Date.now(),
                }
              : conv
          ),
        }))
      },
      
      deleteConversation: (id) => {
        set((state) => {
          const newConversations = state.conversations.filter((conv) => conv.id !== id)
          const newCurrentId = state.currentConversationId === id 
            ? (newConversations[0]?.id || null)
            : state.currentConversationId
            
          return {
            conversations: newConversations,
            currentConversationId: newCurrentId,
          }
        })
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading })
      },
      
      setSelectedModel: (model) => {
        set({ selectedModel: model })
      },
      
      clearAllConversations: () => {
        set({
          conversations: [],
          currentConversationId: null,
        })
      },
    }),
    {
      name: 'LMWebUI-chat',
      partialize: (state) => ({
        conversations: state.conversations,
        selectedModel: state.selectedModel,
      }),
    }
  )
)
