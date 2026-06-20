import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, MapPin, Users, Globe2, BookOpen, Trash2, ArrowRight } from "lucide-react";

export default function Sidebar({
  statesData,
  selectedState,
  onSelectState,
  selectedDistrict,
  onSelectDistrict
}) {
  const [stateSearch, setStateSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [stateOpen, setStateOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);

  const stateRef = useRef(null);
  const districtRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setStateOpen(false);
      }
      if (districtRef.current && !districtRef.current.contains(event.target)) {
        setDistrictOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter states
  const filteredStates = statesData.filter(state =>
    state.name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Filter districts of selected state
  const districtsList = selectedState ? selectedState.districts : [];
  const filteredDistricts = districtsList.filter(district =>
    district.name.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const handleStateClick = (state) => {
    onSelectState(state);
    setStateSearch("");
    setStateOpen(false);
  };

  const handleDistrictClick = (district) => {
    onSelectDistrict(district);
    setDistrictSearch("");
    setDistrictOpen(false);
  };

  const resetAll = () => {
    onSelectState(null);
  };

  return (
    <div className="w-full lg:w-[420px] flex flex-col gap-5 px-5 lg:px-0 lg:pl-5 pb-5 shrink-0 box-border h-auto lg:h-[calc(100vh-110px)] overflow-y-auto">
      {/* Dropdown Filters Panel */}
      <div className="glass-panel p-6 flex flex-col gap-5 rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-gradient text-lg font-bold tracking-tight">Select Region</h2>
          {(selectedState || selectedDistrict) && (
            <button 
              onClick={resetAll} 
              className="bg-white/5 border border-white/8 py-1.5 px-3 rounded-lg text-txt-secondary hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-xs cursor-pointer flex items-center transition-all duration-200" 
              title="Clear selection"
            >
              <Trash2 size={15} className="mr-1.5" />
              Reset
            </button>
          )}
        </div>

        {/* State Selector */}
        <div className="relative flex flex-col gap-2" ref={stateRef}>
          <label className="text-[10px] font-semibold text-txt-muted uppercase tracking-[0.08em]">State / UT</label>
          <div 
            className="w-full py-3 px-4 bg-panel-input border border-white/8 rounded-lg text-txt-main text-sm flex justify-between items-center cursor-pointer hover:border-glow-secondary focus:border-glow-primary transition-all duration-150" 
            onClick={() => {
              setStateOpen(!stateOpen);
              setDistrictOpen(false);
            }}
          >
            <span className={selectedState ? "text-txt-main font-medium" : "text-txt-muted"}>
              {selectedState ? selectedState.name : "Select a State..."}
            </span>
            <ChevronDown size={18} className="transition-transform duration-200" style={{ transform: stateOpen ? "rotate(180deg)" : "rotate(0)" }} />
          </div>

          {stateOpen && (
            <div className="glass-panel absolute top-[calc(100%+6px)] left-0 w-full z-50 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#0a0d1a] rounded-xl">
              <div className="flex items-center bg-white/3 border border-white/8 rounded-md py-2 px-3 mb-2">
                <Search size={16} className="text-txt-muted mr-2" />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="border-none bg-transparent text-txt-main text-sm w-full outline-none font-body"
                  autoFocus
                />
              </div>
              <div className="max-h-[220px] overflow-y-auto">
                {filteredStates.length > 0 ? (
                  filteredStates.map((state) => (
                    <div
                      key={state.id}
                      onClick={() => handleStateClick(state)}
                      className={`flex items-center py-2.5 px-3 rounded-md text-sm cursor-pointer transition-all duration-150 ${
                        selectedState?.id === state.id 
                          ? "bg-gradient-to-r from-glow-primary to-glow-secondary text-txt-dark font-semibold" 
                          : "text-txt-secondary hover:bg-white/4 hover:text-txt-main"
                      }`}
                    >
                      <Globe2 size={15} className="mr-2.5 opacity-70 shrink-0" />
                      {state.name}
                    </div>
                  ))
                ) : (
                  <div className="py-3 text-sm text-txt-muted text-center">No states found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* District Selector */}
        <div className="relative flex flex-col gap-2" ref={districtRef}>
          <label className="text-[10px] font-semibold text-txt-muted uppercase tracking-[0.08em]">District</label>
          <div 
            className="w-full py-3 px-4 bg-panel-input border border-white/8 rounded-lg text-txt-main text-sm flex justify-between items-center cursor-pointer transition-all duration-150"
            style={{ 
              opacity: selectedState ? 1 : 0.55, 
              cursor: selectedState ? "pointer" : "not-allowed" 
            }}
            onClick={() => {
              if (!selectedState) return;
              setDistrictOpen(!districtOpen);
              setStateOpen(false);
            }}
          >
            <span className={selectedDistrict ? "text-txt-main font-medium" : "text-txt-muted"}>
              {selectedDistrict ? selectedDistrict.name : selectedState ? "Select a District..." : "Select state first..."}
            </span>
            <ChevronDown size={18} className="transition-transform duration-200" style={{ transform: districtOpen ? "rotate(180deg)" : "rotate(0)" }} />
          </div>

          {districtOpen && selectedState && (
            <div className="glass-panel absolute top-[calc(100%+6px)] left-0 w-full z-50 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#0a0d1a] rounded-xl">
              <div className="flex items-center bg-white/3 border border-white/8 rounded-md py-2 px-3 mb-2">
                <Search size={16} className="text-txt-muted mr-2" />
                <input
                  type="text"
                  placeholder="Search districts..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="border-none bg-transparent text-txt-main text-sm w-full outline-none font-body"
                  autoFocus
                />
              </div>
              <div className="max-h-[220px] overflow-y-auto">
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleDistrictClick(district)}
                      className={`flex items-center py-2.5 px-3 rounded-md text-sm cursor-pointer transition-all duration-150 ${
                        selectedDistrict?.name === district.name 
                          ? "bg-gradient-to-r from-glow-primary to-glow-secondary text-txt-dark font-semibold" 
                          : "text-txt-secondary hover:bg-white/4 hover:text-txt-main"
                      }`}
                    >
                      <MapPin size={15} className="mr-2.5 opacity-70 shrink-0" />
                      {district.name}
                    </div>
                  ))
                ) : (
                  <div className="py-3 text-sm text-txt-muted text-center">No districts found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Display Panel */}
      <div className="glass-panel p-6 grow flex flex-col rounded-2xl animate-fade-in">
        {!selectedState ? (
          <div className="flex flex-col items-center justify-center grow opacity-70 py-10 lg:py-0">
            <Globe2 size={40} className="text-txt-muted mb-4 animate-pulse" />
            <h3 className="text-base font-semibold mb-2">No Region Selected</h3>
            <p className="text-txt-muted text-xs text-center max-w-[280px]">
              Please select a State or UT from the filters above to load geographic statistics and maps overview.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Header displaying state details */}
            <div className="border-b border-white/5 pb-4">
              <span className="text-[10px] text-glow-secondary font-bold tracking-[0.15em]">STATE</span>
              <h2 className="text-2xl font-extrabold mb-2.5 tracking-tight">{selectedState.name}</h2>
              <p className="text-sm text-txt-secondary leading-relaxed">{selectedState.description}</p>
            </div>

            {/* State Grid Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-3 flex gap-2.5 items-center rounded-xl">
                <Users size={16} className="text-glow-secondary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-txt-muted font-medium uppercase tracking-wide">Population</span>
                  <span className="text-sm font-bold text-txt-main">{selectedState.population}</span>
                </div>
              </div>
              <div className="glass-card p-3 flex gap-2.5 items-center rounded-xl">
                <Globe2 size={16} className="text-glow-secondary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-txt-muted font-medium uppercase tracking-wide">Area (sq km)</span>
                  <span className="text-sm font-bold text-txt-main">{selectedState.area}</span>
                </div>
              </div>
              <div className="glass-card p-3 flex gap-2.5 items-center rounded-xl">
                <BookOpen size={16} className="text-glow-secondary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-txt-muted font-medium uppercase tracking-wide">Literacy</span>
                  <span className="text-sm font-bold text-txt-main">{selectedState.literacy}</span>
                </div>
              </div>
              <div className="glass-card p-3 flex gap-2.5 items-center rounded-xl">
                <MapPin size={16} className="text-glow-secondary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-txt-muted font-medium uppercase tracking-wide">Capital</span>
                  <span className="text-sm font-bold text-txt-main">{selectedState.capital}</span>
                </div>
              </div>
            </div>

            {/* District Specific Info */}
            {selectedDistrict ? (
              <div className="border-t border-white/5 pt-5 flex flex-col gap-3.5 animate-fade-in">
                <div className="flex items-center gap-2">
                  <ArrowRight size={16} className="text-glow-secondary" />
                  <span className="text-[10px] text-glow-primary font-bold tracking-wider">DISTRICT DETAILED EXPLORER</span>
                </div>
                <h3 className="text-xl font-bold m-0">{selectedDistrict.name}</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card p-3 flex gap-2.5 items-center rounded-xl">
                    <Users size={16} className="text-glow-primary shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-txt-muted font-medium uppercase tracking-wide">District Pop.</span>
                      <span className="text-sm font-bold text-txt-main">{selectedDistrict.population}</span>
                    </div>
                  </div>
                  <div className="glass-card p-3 flex gap-2.5 items-center rounded-xl">
                    <Globe2 size={16} className="text-glow-primary shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-txt-muted font-medium uppercase tracking-wide">District Area</span>
                      <span className="text-sm font-bold text-txt-main">{selectedDistrict.area} sq km</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-3.5 border-l-2 border-glow-primary flex flex-col gap-1.5 rounded-r-xl">
                  <span className="text-[10px] text-txt-muted font-semibold uppercase">Key Features & Highlights</span>
                  <p className="text-xs text-txt-secondary leading-relaxed">{selectedDistrict.features}</p>
                </div>
              </div>
            ) : (
              <div className="glass-card p-3.5 flex gap-2.5 items-center rounded-xl">
                <MapPin size={18} className="text-glow-secondary shrink-0" />
                <span className="text-xs text-txt-secondary leading-relaxed">
                  Select a district from the dropdown above to view localized features, highlights, and population metrics.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
