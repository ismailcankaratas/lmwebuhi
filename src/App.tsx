import { useState, useEffect } from 'react'
import { ChatInterface } from './components/ChatInterface'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Settings } from './components/Settings'
import { useThemeStore } from './stores/themeStore'
import { useChatStore } from './stores/chatStore'

function App() {
  const { theme, toggleTheme } = useThemeStore()
  const { conversations, currentConversationId, selectedModel, setSelectedModel } = useChatStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [availableModels, setAvailableModels] = useState<string[]>([])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-100 tracking-[0.01em] antialiased">
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSettingsClick={() => setSettingsOpen(true)}
      />
      
      <main className="flex-1 flex flex-col h-screen">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onThemeToggle={toggleTheme}
          theme={theme}
          onSettingsClick={() => setSettingsOpen(true)}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          availableModels={availableModels}
        />
        
        <ChatInterface onModelsChange={setAvailableModels} />
      </main>

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        availableModels={[]} // This will be passed from ChatInterface
      />
    </div>
  )
}

export default App
