import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
    phoneNumber: string;
    message: string;
    value: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message, value }) => {
    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <motion.button
            onClick={handleClick}
            className="mt-6 flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <FaWhatsapp className="mr-2 text-xl" />
            <span className="font-semibold">{value}</span>
        </motion.button>
    );
};

export default WhatsAppButton;