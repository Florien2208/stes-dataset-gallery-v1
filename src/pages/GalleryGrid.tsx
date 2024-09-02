import React from "react";
import GalleryItem from "./GalleryItem";

const galleryData = [
  {
    imageUrl: "https://pbs.twimg.com/media/BdXmX_dCUAApStj.jpg:large",
    title: "Image 1",
  },
  {
    imageUrl: "https://pbs.twimg.com/media/D5e41XkWkAEBvKw.jpg",
    title: "Image 2",
  },
  // Add more items
];

const GalleryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {galleryData.map((item, index) => (
        <GalleryItem key={index} imageUrl={item.imageUrl} title={item.title} />
      ))}
    </div>
  );
};

export default GalleryGrid;
