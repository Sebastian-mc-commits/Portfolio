"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const PHONE_NUMBER = "573205012455";
const PHONE_DISPLAY = "+57 320 501 2455";
const EMAIL = "sm9349168@gmail.com";

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.3);
  const { t, i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getMessage = () => {
    if (i18n.language === "es") {
      return "Hola Sebastián, vi tu portafolio y me gustaría hablar contigo sobre una posible colaboración. ¿Tienes disponibilidad para conversar?";
    }
    return "Hi Sebastian, I saw your portfolio and I'd like to talk to you about a possible collaboration. Are you available for a chat?";
  };

  const getEmailSubject = () => {
    if (i18n.language === "es") {
      return "Contacto desde tu Portafolio";
    }
    return "Contact from your Portfolio";
  };

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(getMessage())}`;
  const emailUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(getEmailSubject())}&body=${encodeURIComponent(getMessage())}`;

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-full text-center py-16 scroll-mt-36"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading suppressHydrationWarning>{isMounted ? t("t_contact") : "Contact"}</SectionHeading>

      <div className="flex flex-col items-center justify-center gap-8 mt-8">
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md" suppressHydrationWarning>
          {isMounted
            ? (i18n.language === "es"
              ? "¿Tienes un proyecto en mente? ¡Hablemos!"
              : "Have a project in mind? Let's talk!")
            : "Have a project in mind? Let's talk!"}
        </p>

        <div className="flex items-start justify-center gap-12">
          {/* WhatsApp */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="w-8 h-8" />
            </motion.a>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium" suppressHydrationWarning>
                {isMounted ? (i18n.language === "es" ? "WhatsApp" : "WhatsApp") : "WhatsApp"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mt-0.5">
                {PHONE_DISPLAY}
              </p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={emailUrl}
              className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SiGmail className="w-7 h-7" />
            </motion.a>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Gmail
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mt-0.5">
                {EMAIL}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
