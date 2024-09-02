import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-1/6 bg-gray-800 text-white p-6">
      <ul>
        <li className="mb-4">Home</li>
        <li className="mb-4">Upload New Image</li>
        <li className="mb-4">Manage Gallery</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
