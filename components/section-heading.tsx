import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  suppressHydrationWarning?: boolean;
};

export default function SectionHeading({ children, suppressHydrationWarning }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl font-medium capitalize mb-8 text-center" suppressHydrationWarning={suppressHydrationWarning}>
      {children}
    </h2>
  );
}
