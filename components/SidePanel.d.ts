import { ReactNode } from "react";

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

declare const SidePanel: React.FC<SidePanelProps>;

export default SidePanel;