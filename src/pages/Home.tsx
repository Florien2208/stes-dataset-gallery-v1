import React from "react";
import { useOutletContext } from "react-router-dom";

interface Collection {
  _id: string;
  title: string;
}

interface DashboardContext {
  collections: Collection[];
}

const Home: React.FC = () => {
  const { collections } = useOutletContext<DashboardContext>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to Gallery Dashboard</h2>
      <p className="mb-4">You have {collections.length} collections.</p>
      <ul>
        {collections.map((collection) => (
          <li key={collection._id}>{collection.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
