import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  }

  return (
    <Button variant='ghost' size='sm' onClick={toggleLanguage}
      className='hover:bg-secondary transition-colors'
    >
      <Languages className='h-4 w-4 mr-2' />
      {i18n.language.toUpperCase()}
    </Button>
  )
}