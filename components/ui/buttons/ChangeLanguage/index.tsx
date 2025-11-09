import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IoLanguage } from 'react-icons/io5';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            className="fixed bottom-[5rem] right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg z-50 flex items-center justify-center"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={i18n.language === 'en' ? 'Cambiar a español' : 'Switch to English'}
            style={{ width: '48px', height: '48px' }}
        >
            <IoLanguage className="text-2xl" />
        </motion.button>
    );
};

export default LanguageSwitcher;