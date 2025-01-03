import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { I_Image } from '@/lib/interfaces/ui';
import Image from 'next/image';

interface AnimatedImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: I_Image[];
}

const AnimatedImageModal: React.FC<AnimatedImageModalProps> = ({ isOpen, onClose, images }) => {
    const [selectedImage, setSelectedImage] = useState<I_Image | null>(null);

    return (
        <AnimatePresence>
            {(isOpen && images.length > 1) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <IoMdClose size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        quality={95}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <AnimatePresence>
                        {selectedImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-90"
                                onClick={() => setSelectedImage(null)}
                            >
                                <motion.img
                                    src={selectedImage.src.src}
                                    alt={selectedImage.alt}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedImageModal;

