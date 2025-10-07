import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' }
];

export function LanguageSelector({ variant = 'default', className }) {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const currentLanguageData = languages.find(lang => lang.code === currentLanguage) || languages[0];
  
  // Different styles for different variants
  const buttonStyles = variant === 'login'
    ? "inline-flex h-9 w-9 items-center justify-center transition-colors rounded-md border text-black/80 hover:text-black hover:bg-black/10 border-black/20 dark:text-white dark:hover:text-white dark:hover:bg-white/20 dark:border-white/30"
    : "inline-flex items-center justify-center hover:text-red-500 dark:hover:text-red-400 transition-colors px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(buttonStyles, className)}>
          <Globe className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center gap-3 ${
              currentLanguage === language.code 
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                : ''
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            {currentLanguage === language.code && (
              <span className="text-red-600 dark:text-red-400">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
