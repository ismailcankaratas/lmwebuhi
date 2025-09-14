import { Sun, Moon, Settings, Wifi, WifiOff, ChevronDown, Bot } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ollamaService } from '../services/ollamaService'
import { LanguageSelector } from './LanguageSelector'
import { MobileMenu } from './MobileMenu'
import { ModelSelector } from './ModelSelector'

interface HeaderProps {
  onMenuClick: () => void
  onThemeToggle: () => void
  theme: 'light' | 'dark'
  onSettingsClick: () => void
  selectedModel: string
  onModelChange: (model: string) => void
  availableModels: string[]
}

export function Header({ onMenuClick, onThemeToggle, theme, onSettingsClick, selectedModel, onModelChange, availableModels }: HeaderProps) {
  const { t } = useTranslation()
  const [isConnected, setIsConnected] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      setIsChecking(true)
      const connected = await ollamaService.checkConnection()
      setIsConnected(connected)
      setIsChecking(false)
    }

    checkConnection()

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className="h-[80px] border-b border-white/10 flex items-center justify-between px-6"
      role="banner"
    >
      <div className="flex items-center gap-4">
        <MobileMenu isOpen={false} onToggle={onMenuClick} />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">
              <Bot className="h-5 w-5 text-white" />
            </span>
          </div>
          <div className="flex flex-col">
            {/*             <span className="font-semibold text-[16px] text-slate-100">LMWebUI</span>
 */}            <span
              className={`text-[11px] px-2 py-0.5 rounded-full ${isChecking
                ? 'bg-yellow-500/15 text-yellow-300'
                : isConnected
                  ? ''
                  : 'bg-red-500/15 text-red-300'
                }`}
            >
              {isChecking ? 'Checking...' : isConnected ? (
                <ModelSelector models={availableModels} selectedModel={selectedModel} onModelChange={onModelChange} />
              ) : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">


        <LanguageSelector />

        <button
          onClick={onThemeToggle}
          className="h-10 w-10 grid place-items-center rounded-xl hover:bg-white/5 focus-visible:ring-2 ring-emerald-400/40 transition-colors"
          aria-label={t('header.toggleTheme', { theme: theme === 'light' ? 'dark' : 'light' })}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-slate-400" />
          ) : (
            <Sun className="h-5 w-5 text-slate-400" />
          )}
        </button>

        <button
          onClick={onSettingsClick}
          className="h-10 w-10 grid place-items-center rounded-xl hover:bg-white/5 focus-visible:ring-2 ring-emerald-400/40 transition-colors"
          aria-label={t('header.openSettings')}
          aria-haspopup="menu"
        >
          <Settings className="h-5 w-5 text-slate-400" />
        </button>
      </div>
    </header>
  )
}
