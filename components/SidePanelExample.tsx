"use client";

import React, { useState } from "react";
import SidePanel from "./SidePanel";
import { FaCog, FaUser, FaHome, FaBars } from "react-icons/fa";

const SidePanelExample: React.FC = () => {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [overlayMode, setOverlayMode] = useState(true);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">SidePanel Component Demo</h1>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setIsLeftPanelOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <FaBars />
          Open Left Panel
        </button>
        
        <button
          onClick={() => setIsRightPanelOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <FaCog />
          Open Right Panel
        </button>
        
        <button
          onClick={() => setOverlayMode(!overlayMode)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            overlayMode 
              ? "bg-purple-500 text-white hover:bg-purple-600" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Mode: {overlayMode ? "Overlay" : "Push Content"}
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg p-8 min-h-[400px]">
        <h2 className="text-xl font-semibold mb-4">Main Content Area</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This is the main content area. When overlay mode is disabled, 
          this content will be pushed aside when panels open.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-neutral-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Content Card {i + 1}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Some example content here...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Left Side Panel */}
      <SidePanel
        isOpen={isLeftPanelOpen}
        onClose={() => setIsLeftPanelOpen(false)}
        position="left"
        pushMode="shrink"
        widthPercentage={25}
        heightPercentage={90}
        overlay={overlayMode}
        className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
        animationDuration={0.4}
      >
        <div className="p-6 h-full">
          <div className="mb-6 pt-8">
            <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <FaUser />
              Navigation
            </h2>
          </div>
          
          <nav className="space-y-2">
            {[
              { icon: FaHome, label: "Dashboard", active: true, id: "dashboard" },
              { icon: FaUser, label: "Profile", active: false, id: "profile" },
              { icon: FaCog, label: "Settings", active: false, id: "settings" },
            ].map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                  item.active
                    ? "bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100"
                    : "text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-8 p-4 bg-blue-200/50 dark:bg-blue-800/30 rounded-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              Quick Info
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              This is a left-positioned side panel with custom content and styling.
            </p>
          </div>
        </div>
      </SidePanel>

      {/* Right Side Panel */}
      <SidePanel
        isOpen={isRightPanelOpen}
        onClose={() => setIsRightPanelOpen(false)}
        position="right"
        widthPercentage={35}
        heightPercentage={85}
        overlay={overlayMode}
        className="bg-gradient-to-b from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20"
        animationDuration={0.35}
        backdropOpacity={0.3}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="mb-6 pt-8">
            <h2 className="text-xl font-bold text-green-800 dark:text-green-200 flex items-center gap-2">
              <FaCog />
              Settings Panel
            </h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-3">Appearance</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-green-600 dark:text-green-400">Dark mode</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-green-600 dark:text-green-400">Compact layout</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-3">Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-green-600 dark:text-green-400">Email notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-green-600 dark:text-green-400">Push notifications</span>
                </label>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-green-200/50 dark:bg-green-800/30 rounded-lg">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Panel Features
              </h3>
              <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
                <li>• Fully animated open/close</li>
                <li>• Customizable dimensions</li>
                <li>• Overlay or push content modes</li>
                <li>• Portal-based rendering</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </SidePanel>
    </div>
  );
};

export default SidePanelExample;