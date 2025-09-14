import { X, Menu as MenuIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const { t } = useTranslation()

  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={t('header.toggleSidebar')}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  )
}
