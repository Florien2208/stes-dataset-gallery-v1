import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CollectionUpload: React.FC = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title) {
      setError(null);
      setIsLoading(true);
      try {
        await axios.post("http://localhost:8000/api/gallery/collection", {
          title,
        });
        navigate("/"); // Navigate back to the home page after successful creation
      } catch (err) {
        console.error("Error creating collection", err);
        setError("Failed to create collection. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please fill in the title field.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Collection</h2>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Collection Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter collection title"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Collection"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollectionUpload;
