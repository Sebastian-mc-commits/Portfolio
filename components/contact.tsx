"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import mainUser from "@/lib/data/mainUser";
import { WhatsAppButton } from "./ui/buttons";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const { t } = useTranslation()

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
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
      <SectionHeading>{t("t_contact")}</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        <a className="underline" href="mailto:example@gmail.com">
          {mainUser.email}
        </a>{" "}
        {t("contact")}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder={t("p_email")}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder={t("p_message")}
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
      <WhatsAppButton message="Hola, me interesa tu trabajo. ¿Podemos hablar sobre una posible colaboración?" phoneNumber="3023492663" value={t("b_contact_whatsapp")} />
    </motion.section>
  );
}
