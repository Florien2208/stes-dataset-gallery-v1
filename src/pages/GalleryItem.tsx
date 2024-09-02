import React from "react";

interface GalleryItemProps {
  imageUrl: string;
  title: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ imageUrl, title }) => {
  return (
    <div className="p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg mt-2">{title}</h3>
    </div>
  );
};

export default GalleryItem;
