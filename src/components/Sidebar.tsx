import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  onCreateCollection: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <ul>
        <Link to="gallery">
          <li className="mb-4">Manage Gallery</li>
        </Link>
        {/* <Link
          to="/"
          className="mb-4 cursor-pointer"
          onClick={onCreateCollection}
        >
          <li>Manage Gallery</li>
        </Link> */}
        <Link to="create-collection" className="mb-4">
          <li>Create Collection</li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
