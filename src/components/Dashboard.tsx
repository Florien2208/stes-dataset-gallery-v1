import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GalleryGrid from "../pages/GalleryGrid";


const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 bg-gray-100">
          <GalleryGrid />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
