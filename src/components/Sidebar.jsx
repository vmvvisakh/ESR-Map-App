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
    <div style={styles.sidebar}>
      {/* Dropdown Filters Panel */}
      <div className="glass-panel" style={styles.filterSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="text-gradient">Select Region</h2>
          {(selectedState || selectedDistrict) && (
            <button onClick={resetAll} style={styles.resetBtn} title="Clear selection">
              <Trash2 size={15} style={{ marginRight: "6px" }} />
              Reset
            </button>
          )}
        </div>

        {/* State Selector */}
        <div style={styles.selectorGroup} ref={stateRef}>
          <label style={styles.label}>State / UT</label>
          <div 
            className="custom-select-trigger" 
            onClick={() => {
              setStateOpen(!stateOpen);
              setDistrictOpen(false);
            }}
          >
            <span style={selectedState ? styles.selectedVal : styles.placeholderVal}>
              {selectedState ? selectedState.name : "Select a State..."}
            </span>
            <ChevronDown size={18} style={{ transform: stateOpen ? "rotate(180deg)" : "rotate(0)" }} />
          </div>

          {stateOpen && (
            <div className="glass-panel" style={styles.dropdownList}>
              <div style={styles.searchBoxContainer}>
                <Search size={16} style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={styles.searchInput}
                  autoFocus
                />
              </div>
              <div style={styles.listScroll}>
                {filteredStates.length > 0 ? (
                  filteredStates.map((state) => (
                    <div
                      key={state.id}
                      onClick={() => handleStateClick(state)}
                      style={{
                        ...styles.listItem,
                        ...(selectedState?.id === state.id ? styles.listItemSelected : {})
                      }}
                    >
                      <Globe2 size={15} style={{ marginRight: "10px", opacity: 0.7 }} />
                      {state.name}
                    </div>
                  ))
                ) : (
                  <div style={styles.noResults}>No states found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* District Selector */}
        <div style={styles.selectorGroup} ref={districtRef}>
          <label style={styles.label}>District</label>
          <div 
            className="custom-select-trigger"
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
            <span style={selectedDistrict ? styles.selectedVal : styles.placeholderVal}>
              {selectedDistrict ? selectedDistrict.name : selectedState ? "Select a District..." : "Select state first..."}
            </span>
            <ChevronDown size={18} style={{ transform: districtOpen ? "rotate(180deg)" : "rotate(0)" }} />
          </div>

          {districtOpen && selectedState && (
            <div className="glass-panel" style={styles.dropdownList}>
              <div style={styles.searchBoxContainer}>
                <Search size={16} style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search districts..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={styles.searchInput}
                  autoFocus
                />
              </div>
              <div style={styles.listScroll}>
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleDistrictClick(district)}
                      style={{
                        ...styles.listItem,
                        ...(selectedDistrict?.name === district.name ? styles.listItemSelected : {})
                      }}
                    >
                      <MapPin size={15} style={{ marginRight: "10px", opacity: 0.7 }} />
                      {district.name}
                    </div>
                  ))
                ) : (
                  <div style={styles.noResults}>No districts found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Display Panel */}
      <div className="glass-panel animate-fade-in" style={styles.infoSection}>
        {!selectedState ? (
          <div style={styles.emptyState}>
            <Globe2 size={40} style={{ color: "var(--text-muted)", marginBottom: "16px" }} />
            <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600" }}>No Region Selected</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center" }}>
              Please select a State or UT from the filters above to load geographic statistics and maps overview.
            </p>
          </div>
        ) : (
          <div style={styles.infoContent}>
            {/* Header displaying state details */}
            <div style={styles.infoTitleBlock}>
              <span style={styles.infoTag}>STATE</span>
              <h2 style={styles.infoName}>{selectedState.name}</h2>
              <p style={styles.infoDesc}>{selectedState.description}</p>
            </div>

            {/* State Grid Metrics */}
            <div style={styles.metricsGrid}>
              <div className="glass-card" style={styles.metricCard}>
                <Users size={16} style={styles.metricIcon} />
                <div style={styles.metricText}>
                  <span style={styles.metricLabel}>Population</span>
                  <span style={styles.metricValue}>{selectedState.population}</span>
                </div>
              </div>
              <div className="glass-card" style={styles.metricCard}>
                <Globe2 size={16} style={styles.metricIcon} />
                <div style={styles.metricText}>
                  <span style={styles.metricLabel}>Area (sq km)</span>
                  <span style={styles.metricValue}>{selectedState.area}</span>
                </div>
              </div>
              <div className="glass-card" style={styles.metricCard}>
                <BookOpen size={16} style={styles.metricIcon} />
                <div style={styles.metricText}>
                  <span style={styles.metricLabel}>Literacy</span>
                  <span style={styles.metricValue}>{selectedState.literacy}</span>
                </div>
              </div>
              <div className="glass-card" style={styles.metricCard}>
                <MapPin size={16} style={styles.metricIcon} />
                <div style={styles.metricText}>
                  <span style={styles.metricLabel}>Capital</span>
                  <span style={styles.metricValue}>{selectedState.capital}</span>
                </div>
              </div>
            </div>

            {/* District Specific Info */}
            {selectedDistrict ? (
              <div style={styles.districtBlock} className="animate-fade-in">
                <div style={styles.districtHeader}>
                  <ArrowRight size={16} style={{ color: "var(--secondary-glow)" }} />
                  <span style={styles.districtTag}>DISTRICT DETAILED EXPLORER</span>
                </div>
                <h3 style={styles.districtName}>{selectedDistrict.name}</h3>

                <div style={styles.metricsGrid}>
                  <div className="glass-card" style={styles.metricCard}>
                    <Users size={16} style={{ ...styles.metricIcon, color: "var(--primary-glow)" }} />
                    <div style={styles.metricText}>
                      <span style={styles.metricLabel}>District Pop.</span>
                      <span style={styles.metricValue}>{selectedDistrict.population}</span>
                    </div>
                  </div>
                  <div className="glass-card" style={styles.metricCard}>
                    <Globe2 size={16} style={{ ...styles.metricIcon, color: "var(--primary-glow)" }} />
                    <div style={styles.metricText}>
                      <span style={styles.metricLabel}>District Area</span>
                      <span style={styles.metricValue}>{selectedDistrict.area} sq km</span>
                    </div>
                  </div>
                </div>

                <div style={styles.featuresBox} className="glass-card">
                  <span style={styles.featuresLabel}>Key Features & Highlights</span>
                  <p style={styles.featuresText}>{selectedDistrict.features}</p>
                </div>
              </div>
            ) : (
              <div style={styles.districtPrompt} className="glass-card">
                <MapPin size={18} style={{ color: "var(--secondary-glow)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
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

const styles = {
  sidebar: {
    width: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "0 0 20px 20px",
    flexShrink: 0,
    boxSizing: "border-box",
    height: "calc(100vh - 110px)",
    overflowY: "auto",
  },
  filterSection: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    letterSpacing: "-0.01em",
  },
  resetBtn: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "6px 12px",
    borderRadius: "8px",
    color: "var(--text-secondary)",
    fontSize: "0.8rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s",
  },
  selectorGroup: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  selectedVal: {
    color: "var(--text-main)",
    fontWeight: "500",
  },
  placeholderVal: {
    color: "var(--text-muted)",
  },
  dropdownList: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    width: "100%",
    zIndex: 99,
    padding: "8px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    background: "hsl(var(--bg-dark-base), 35%, 8%)",
  },
  searchBoxContainer: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-glow)",
    borderRadius: "6px",
    padding: "8px 12px",
    marginBottom: "8px",
  },
  searchIcon: {
    color: "var(--text-muted)",
    marginRight: "8px",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    color: "var(--text-main)",
    fontSize: "0.85rem",
    width: "100%",
    outline: "none",
    fontFamily: "var(--font-body)",
  },
  listScroll: {
    maxHeight: "220px",
    overflowY: "auto",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    cursor: "pointer",
    color: "var(--text-secondary)",
    transition: "all 0.15s ease",
  },
  listItemSelected: {
    background: "var(--gradient-neon)",
    color: "var(--text-dark)",
    fontWeight: "600",
  },
  noResults: {
    padding: "12px",
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    textAlign: "center",
  },
  infoSection: {
    padding: "24px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    opacity: 0.7,
  },
  infoContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  infoTitleBlock: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "16px",
  },
  infoTag: {
    fontSize: "0.65rem",
    color: "var(--secondary-glow)",
    fontWeight: "700",
    letterSpacing: "0.15em",
  },
  infoName: {
    fontSize: "1.6rem",
    fontWeight: "800",
    marginBottom: "10px",
    letterSpacing: "-0.01em",
  },
  infoDesc: {
    fontSize: "0.88rem",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },
  metricCard: {
    padding: "12px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  metricIcon: {
    color: "var(--secondary-glow)",
    opacity: 0.9,
    flexShrink: 0,
  },
  metricText: {
    display: "flex",
    flexDirection: "column",
  },
  metricLabel: {
    fontSize: "0.68rem",
    color: "var(--text-muted)",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  },
  metricValue: {
    fontSize: "0.88rem",
    fontWeight: "700",
    color: "var(--text-main)",
  },
  districtBlock: {
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  districtHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  districtTag: {
    fontSize: "0.65rem",
    color: "var(--primary-glow)",
    fontWeight: "700",
    letterSpacing: "0.1em",
  },
  districtName: {
    fontSize: "1.3rem",
    fontWeight: "700",
    margin: 0,
  },
  featuresBox: {
    padding: "14px",
    borderLeft: "2px solid var(--primary-glow)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  featuresLabel: {
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  featuresText: {
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
    lineHeight: "1.45",
  },
  districtPrompt: {
    padding: "14px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
};
