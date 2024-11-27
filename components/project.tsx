"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { IUserProjects } from "@/lib/interfaces/IUser";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ImageSelector } from "./ui";
import { FaGithubSquare } from "react-icons/fa";

export default function Project({
  images,
  tags,
  id,
  translationKey,
  type,
  githubLink,
  videoLink,
  ...filteredProps
}: IUserProjects) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const title = "title" in filteredProps ? filteredProps.title : t(filteredProps.translationTitleKey)

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {t(translationKey)}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {
          images[0]?.alt &&

          <Image
            onClick={() => setIsModalOpen(true)}
            role="button"
            src={images[0].src}
            alt={images[0].alt ?? "Project"}
            quality={95}
            className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl
        transition 
        group-hover:scale-[1.04]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2

        group-even:group-hover:translate-x-3
        group-even:group-hover:translate-y-3
        group-even:group-hover:rotate-2

        group-even:right-[initial] group-even:-left-40"
          />
        }

      </section>
      <div className="w-full bg-slate-100 p-6
      flex flex-col sm:flex-row
      items-center justify-center gap-2
      px-4 text-lg font-medium
      ">
        {
          githubLink &&
          <Link
            className="bg-white p-4 
            text-gray-700 flex items-center
            text-[1.35rem] rounded-full
            focus:scale-[1.15] hover:scale-[1.15]
            hover:text-gray-950 active:scale-105
            transition cursor-pointer borderBlack
            dark:bg-white/10 dark:text-white/60 w-auto"
            href={githubLink}
            target="_blank"
          >
            <FaGithubSquare />
          </Link>
        }
        {
          videoLink && <button>
            <Link href={videoLink}>Video del proyecto</Link>
          </button>
        }

        <ImageSelector
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          images={images}
        />
      </div>
    </motion.div>
  );
}
