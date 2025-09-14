import { Shield, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export function PrivacyIndicator() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              🔒 Your data stays private
            </h3>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors"
              aria-label={showDetails ? 'Hide privacy details' : 'Show privacy details'}
            >
              {showDetails ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
            All conversations are stored locally on your device. No data is sent to external servers.
          </p>
          
          {showDetails && (
            <div className="mt-3 space-y-2 text-xs text-green-600 dark:text-green-400">
              <div className="flex items-center space-x-2">
                <Lock className="h-3 w-3" />
                <span>Local storage only - no cloud sync</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-3 w-3" />
                <span>Direct connection to Ollama - no intermediaries</span>
              </div>
              <div className="flex items-center space-x-2">
                <EyeOff className="h-3 w-3" />
                <span>No telemetry or analytics collected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
