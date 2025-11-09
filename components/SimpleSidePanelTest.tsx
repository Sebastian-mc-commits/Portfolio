"use client";

import React, { useState } from "react";
import SidePanel from "./SidePanel";

const SimpleSidePanelTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">SidePanel Test</h1>
      
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Panel
      </button>
      
      <SidePanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        widthPercentage={30}
        heightPercentage={80}
        overlay={true}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Panel Content</h2>
          <p className="text-gray-600 mb-4">
            This is a working side panel component!
          </p>
          <ul className="space-y-2">
            <li>✅ Animated open/close</li>
            <li>✅ Portal-based rendering</li>
            <li>✅ Customizable positioning</li>
            <li>✅ Responsive design</li>
          </ul>
        </div>
      </SidePanel>
    </div>
  );
};

export default SimpleSidePanelTest;