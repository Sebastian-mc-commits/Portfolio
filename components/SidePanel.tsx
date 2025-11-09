"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

export interface SidePanelProps {
  /** Whether the panel is open */
  isOpen: boolean;
  /** Function to close the panel */
  onClose: () => void;
  /** Panel position - left or right side */
  position?: "left" | "right";
  /** Panel size as percentage of viewport width */
  widthPercentage?: number;
  /** Panel height as percentage of viewport height */
  heightPercentage?: number;
  /** Whether panel should overlay content (true) or push content aside (false) */
  overlay?: boolean;
  /** Extra padding percentage when pushing content (added to widthPercentage) */
  pushPadding?: number;
  /** When overlay=false, whether to push content to both sides ('both'), just opposite side ('single'), or shrink content ('shrink') */
  pushMode?: "single" | "both" | "shrink";
  /** Custom className for styling */
  className?: string;
  /** Child components to render inside panel */
  children: ReactNode;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Custom close button content */
  closeButtonContent?: ReactNode;
  /** Z-index for the panel */
  zIndex?: number;
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Background blur when overlay is true */
  backdropBlur?: boolean;
  /** Custom backdrop opacity (0-1) */
  backdropOpacity?: number;
}

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  position = "right",
  widthPercentage = 30,
  heightPercentage = 80,
  overlay = true,
  pushPadding = 5,
  pushMode = "single",
  className = "",
  children,
  showCloseButton = true,
  closeButtonContent,
  zIndex = 1000,
  animationDuration = 0.3,
  backdropBlur = true,
  backdropOpacity = 0.5,
}) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const bodyRef = useRef<HTMLElement | null>(null);

  // Create portal element and manage body adjustments
  useEffect(() => {
    // Create portal container outside of body to avoid being affected by body transforms
    const portalDiv = document.createElement("div");
    portalDiv.style.position = "fixed";
    portalDiv.style.top = "0";
    portalDiv.style.left = "0";
    portalDiv.style.width = "100%";
    portalDiv.style.height = "100%";
    portalDiv.style.pointerEvents = "none";
    portalDiv.style.zIndex = zIndex.toString();
    
    // Append to documentElement instead of body to avoid being affected by body transforms
    document.documentElement.appendChild(portalDiv);
    setPortalElement(portalDiv);
    
    // Store original body reference
    bodyRef.current = document.body;

    return () => {
      if (portalDiv.parentNode) {
        portalDiv.remove();
      }
    };
  }, [zIndex]);

  // Manage body transformations for non-overlay mode
  useEffect(() => {
    // Only apply body transformations when overlay is false
    if (overlay) return;

    const body = document.body;
    
    // Store original styles
    const originalBodyTransition = body.style.transition;
    const originalBodyTransform = body.style.transform;
    const originalBodyTransformOrigin = body.style.transformOrigin;

    if (isOpen) {
      // Calculate total push distance (panel width + padding)
      const totalPushPercentage = widthPercentage + pushPadding;
      
      if (pushMode === "shrink") {
        // Shrink content symmetrically from both sides (only when overlay is false)
        const shrinkScale = (100 - totalPushPercentage) / 100;
        
        // Add smooth transition for transform
        body.style.transition = `transform ${animationDuration}s ease-in-out`;
        
        // Apply scale transform from center - content shrinks equally from both sides
        body.style.transform = `scale(${shrinkScale})`;
        
      } else {
        const pushDistance = (window.innerWidth * totalPushPercentage) / 100;
        let transformValue = "";
        
        if (pushMode === "both") {
          // Push content to both sides (center the content)
          const halfDistance = pushDistance / 2;
          transformValue = position === "left" 
            ? `translateX(${halfDistance}px)` 
            : `translateX(-${halfDistance}px)`;
        } else {
          // Push content to opposite side only
          transformValue = position === "left" 
            ? `translateX(${pushDistance}px)` 
            : `translateX(-${pushDistance}px)`;
        }
        
        // Add smooth transition to body only
        body.style.transition = `transform ${animationDuration}s ease-in-out`;
        
        // Apply transform to body to push content
        body.style.transform = transformValue;
      }
      
      // Prevent horizontal scrolling during animation
      body.style.overflowX = "hidden";
    } else {
      // Reset transformations
      body.style.transform = originalBodyTransform || "";
      body.style.transformOrigin = originalBodyTransformOrigin || "";
      body.style.overflowX = "";
    }

    return () => {
      // Cleanup on unmount
      body.style.transition = originalBodyTransition || "";
      body.style.transform = originalBodyTransform || "";
      body.style.transformOrigin = originalBodyTransformOrigin || "";
      body.style.overflowX = "";
    };
  }, [isOpen, overlay, position, widthPercentage, pushPadding, pushMode, animationDuration]);

  // Prevent body scroll when panel is open and in overlay mode
  useEffect(() => {
    if (overlay && isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, overlay]);

  // Calculate panel dimensions
  const panelWidth = `${widthPercentage}vw`;
  const panelHeight = `${heightPercentage}vh`;
  const topOffset = `${(100 - heightPercentage) / 2}vh`;

  // Animation variants
  const panelVariants = {
    hidden: {
      x: position === "left" ? "-100%" : "100%",
      opacity: 0,
    },
    visible: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: animationDuration,
      },
    },
    exit: {
      x: position === "left" ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: animationDuration * 0.8,
        ease: "easeInOut",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: backdropOpacity,
      transition: { duration: animationDuration * 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: animationDuration * 0.5 }
    },
  };

  if (!portalElement) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop for overlay mode */}
          {overlay && (
            <motion.div
              className={`fixed inset-0 bg-black ${backdropBlur ? "backdrop-blur-sm" : ""}`}
              style={{ 
                pointerEvents: "auto",
                zIndex: zIndex - 1 
              }}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
            />
          )}

          {/* Side Panel */}
          <motion.div
            className={`fixed bg-white dark:bg-neutral-900 shadow-2xl border-l border-r border-gray-200 dark:border-neutral-700 ${className}`}
            style={{
              [position]: 0,
              top: topOffset,
              width: panelWidth,
              height: panelHeight,
              pointerEvents: "auto",
              zIndex: zIndex,
              // Ensure panel is not affected by body transform
              transform: "none !important",
            }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`absolute top-4 z-10 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors duration-200 ${
                  position === "left" ? "right-4" : "left-4"
                }`}
                aria-label="Close panel"
              >
                {closeButtonContent || <FaTimes className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
              </button>
            )}

            {/* Panel Content */}
            <div className="h-full w-full overflow-hidden flex flex-col">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portalElement
  );
};

export default SidePanel;