import { useState, useEffect } from 'react'

export function useLanguage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' | null
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage)
    }
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguageAndSave(newLanguage)
  }

  const setLanguageAndSave = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return {
    language,
    setLanguage: setLanguageAndSave,
    toggleLanguage,
    mounted,
    isRTL: language === 'ar'
  }
} 