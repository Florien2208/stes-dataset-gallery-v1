import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GalleryGrid from "./pages/GalleryGrid";
import CollectionUpload from "./pages/CreateCollection";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<GalleryGrid />} />
          <Route path="create-collection" element={<CollectionUpload />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
