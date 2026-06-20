import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapExplorer from "./components/MapExplorer";
import ApiKeyModal from "./components/ApiKeyModal";
import { indiaData } from "./data/indiaData";
import "./App.css";

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  // Initialize key from environment or local storage
  useEffect(() => {
    const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
    const savedKey = localStorage.getItem("google_maps_api_key") || "";
    
    setApiKey(envKey || savedKey);
  }, []);

  const handleSelectState = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null); // Reset district when state changes
  };

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
  };

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem("google_maps_api_key", newKey);
    } else {
      localStorage.removeItem("google_maps_api_key");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-hidden">
      {/* Top Glassmorphic Navigation Bar */}
      <Navbar 
        onOpenKeyModal={() => setIsKeyModalOpen(true)} 
        isKeySet={!!apiKey} 
      />

      {/* Main App Layout */}
      <main className="flex flex-col lg:flex-row flex-grow pt-5 gap-2.5 box-border h-[calc(100vh-90px)] lg:overflow-hidden overflow-y-auto">
        <Sidebar
          statesData={indiaData}
          selectedState={selectedState}
          onSelectState={handleSelectState}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleSelectDistrict}
        />

        <MapExplorer
          apiKey={apiKey}
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          onOpenKeyModal={() => setIsKeyModalOpen(true)}
        />
      </main>

      {/* API Key Modal Overlay */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
}

export default App;
