import { X, Plus, MessageSquare, Trash2, MoreVertical, Search, Settings, User } from 'lucide-react'
import { Conversation } from '../stores/chatStore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useChatStore } from '../stores/chatStore'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  conversations: Conversation[]
  currentConversationId: string | null
  onSettingsClick: () => void
}

export function Sidebar({ isOpen, onClose, conversations, currentConversationId, onSettingsClick }: SidebarProps) {
  const { t } = useTranslation()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const { createConversation, setCurrentConversation, deleteConversation } = useChatStore()

  const handleNewConversation = () => {
    const newId = createConversation()
    setCurrentConversation(newId)
    onClose()
  }

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id)
    setShowDeleteConfirm(null)
  }

  const handleConversationClick = (id: string) => {
    setCurrentConversation(id)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-[#0b1220] border-r border-white/10 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        id="sidebar"
      >
        <div className="flex flex-col h-full">
          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={handleNewConversation}
              className="w-full h-10 bg-emerald-500 hover:bg-emerald-400 text-[#052b22] px-4 flex items-center gap-2 text-sm font-medium transition-all hover:brightness-110 hover:shadow-lg shadow-sm"
              aria-label={t('common.newChat')}
            >
              <Plus className="h-4 w-4" />
              {t('common.newChat')}
            </button>
          </div>

          {/* Search */}
          <div className="px-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full h-9 pl-10 pr-4 bg-white/[0.04] focus:bg-white/[0.06] text-slate-100 placeholder-slate-400 focus:outline-none focus-visible:ring-2 ring-emerald-400/40 transition-colors"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto px-4">
            {conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400 mb-4 text-sm">
                  {t('sidebar.noConversations')}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => handleConversationClick(conversation.id)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 transition-all group relative
                      ${currentConversationId === conversation.id
                        ? 'bg-emerald-500/10 border-l-2 border-emerald-400'
                        : 'hover:bg-white/5'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <MessageSquare className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0 text-left">
                        <span className="text-sm text-slate-200 truncate block">
                          {conversation.title}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">
                        {conversation.messages.length}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowDeleteConfirm(conversation.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/5 transition-all"
                        aria-label="Delete conversation"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                    
                    {showDeleteConfirm === conversation.id && (
                      <div className="absolute right-0 top-8 w-48 bg-[#111827] rounded-lg shadow-lg border border-white/10 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteConversation(conversation.id)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/5 flex items-center space-x-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>{t('sidebar.deleteConversation')}</span>
                        </button>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
              <div>
                <p className="text-xs text-slate-400">
                 {new Date().getFullYear()} - {t('sidebar.userProfile')}
                </p>
              </div>
            {/* <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">{t('sidebar.userProfile')}</p>
                <p className="text-xs text-slate-400">{t('sidebar.userRole')}</p>
              </div>
            </div> */}
           {/*  <button
              onClick={onSettingsClick}
              className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">{t('common.settings')}</span>
            </button> */}
          </div>
        </div>
      </div>
    </>
  )
}
