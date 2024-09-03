import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

interface Collection {
  _id: string;
  title: string;
}

interface DashboardContext {
  collections: Collection[];
}

interface GalleryItem {
  imageUrl: string;
  title: string;
}

const GalleryGrid: React.FC = () => {
  const { collections } = useOutletContext<DashboardContext>();
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const handleCollectionClick = async (collectionId: string) => {
    setSelectedCollectionId(collectionId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/gallery/collection/${collectionId}`
      );
      setGalleryData(response.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  const handleBackClick = () => {
    setSelectedCollectionId(null);
    setGalleryData([]);
    setShowAddForm(false);
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageFile || !newImageTitle || !selectedCollectionId) return;

    const formData = new FormData();
    formData.append("imageUrl", newImageFile);
    formData.append("title", newImageTitle);
    formData.append("collectionId", selectedCollectionId);

    try {
      console.log("formData", formData);
      const response = await axios.post(
        "http://localhost:8000/api/gallery/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setGalleryData([...galleryData, response.data]);
      setNewImageTitle("");
      setNewImageFile(null);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding image", error);
    }
  };

  if (selectedCollectionId) {
    return (
      <div className="h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {collections.find((c) => c._id === selectedCollectionId)?.title}
          </h2>
          <div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
            >
              {showAddForm ? "Cancel" : "Add Image"}
            </button>
            <button
              onClick={handleBackClick}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Back to Collections
            </button>
          </div>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddImage} className="mb-4">
            <input
              type="text"
              value={newImageTitle}
              onChange={(e) => setNewImageTitle(e.target.value)}
              placeholder="Image Title"
              className="mr-2 px-2 py-1 border rounded"
              required
            />
            <input
              type="file"
              onChange={(e) =>
                setNewImageFile(e.target.files ? e.target.files[0] : null)
              }
              className="mr-2"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          </form>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {galleryData.map((item, index) => (
            <div key={index} className="border rounded-md p-2">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <p className="mt-2 text-center truncate">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {collections.map((collection) => (
        <div
          key={collection._id}
          className="border rounded-md p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => handleCollectionClick(collection._id)}
        >
          <h3 className="text-lg font-semibold text-center">
            {collection.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
