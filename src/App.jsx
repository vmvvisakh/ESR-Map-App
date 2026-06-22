import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapExplorer from "./components/MapExplorer";
import { SlidersHorizontal } from "lucide-react";
import { usData } from "./data/usData";
import "./App.css";

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

    setApiKey(envKey);
  }, []);

  const handleSelectState = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
  };

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-hidden bg-panel-main">
      <Navbar isKeySet={!!apiKey} />

      <main className="flex flex-col lg:flex-row flex-grow pt-5 gap-2.5 box-border h-[calc(100vh-90px)] lg:overflow-hidden relative">
        <Sidebar
          statesData={usData}
          selectedState={selectedState}
          onSelectState={handleSelectState}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleSelectDistrict}
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <MapExplorer
          apiKey={apiKey}
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
        />
      </main>

      {/* Floating Toggle Action Button for Mobile/Tablet */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-30 p-4 rounded-full bg-gradient-to-r from-glow-primary to-glow-secondary text-txt-dark shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-white/10"
        title="Open filters & data"
      >
        <SlidersHorizontal size={22} />
      </button>
    </div>
  );
}

export default App;
