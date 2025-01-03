import mainUser from "@/lib/data/mainUser";
import React from "react";

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; 2025 {mainUser.name}.
      </small>
      <p className="text-xs">
        built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion & React, Render Hosting.
      </p>
    </footer>
  );
}
