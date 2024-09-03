import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

interface Collection {
  _id: string;
  title: string;
}

const CustomAlert: React.FC<{ message: string }> = ({ message }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
    role="alert"
  >
    <span className="block sm:inline">{message}</span>
  </div>
);

const Dashboard: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/gallery/collection"
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections", error);
        setError("Failed to fetch collections. Please try again later.");
      }
    };

    fetchCollections();
  }, []);

  const handleCreateCollection = () => {
    // Implement navigation to create collection route
  };

  return (
    <div className="flex h-screen">
      <Sidebar onCreateCollection={handleCreateCollection} />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 bg-gray-100">
          {error && <CustomAlert message={error} />}
          <Outlet context={{ collections }} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
