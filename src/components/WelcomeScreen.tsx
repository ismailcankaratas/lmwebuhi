import { Bot, ChevronDown, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PrivacyIndicator } from './PrivacyIndicator'

interface WelcomeScreenProps {
  selectedModel: string
  onModelChange: (model: string) => void
  availableModels: string[]
  onStartChat: (prompt?: string) => void
}

export function WelcomeScreen({ selectedModel, onModelChange, availableModels, onStartChat }: WelcomeScreenProps) {
  const { t } = useTranslation()

  const suggestedPrompts = [
    {
      title: t('suggestedPrompts.study.title'),
      description: t('suggestedPrompts.study.description')
    },
    {
      title: t('suggestedPrompts.kidsArt.title'),
      description: t('suggestedPrompts.kidsArt.description')
    },
    {
      title: t('suggestedPrompts.procrastination.title'),
      description: t('suggestedPrompts.procrastination.description')
    },
    {
      title: t('suggestedPrompts.funFact.title'),
      description: t('suggestedPrompts.funFact.description')
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full">

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
            <Bot className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-100 mb-4">
            {t('welcome.title')}
          </h1>
          <p className="text-xl text-slate-400">
            {t('welcome.subtitle')}
          </p>
        </div>

        {/* Suggested Prompts */}
        <div className="w-full mb-8">
          <h2 className="text-sm font-medium text-slate-400 mb-6 text-center">
            {t('welcome.suggested')}
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => onStartChat(prompt.title)}
                className="rounded-xl bg-white/5 hover:bg-white/10 p-4 text-left transition-all hover:shadow-lg group"
              >
                <p className="text-sm font-medium text-slate-100 mb-1">
                  {prompt.title}
                </p>
                <p className="text-xs text-slate-400">
                  {prompt.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
