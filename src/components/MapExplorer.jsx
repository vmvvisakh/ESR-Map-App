import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Compass, ShieldCheck, MapPin, Loader2, Navigation, Terminal } from "lucide-react";

// Google Maps Custom Dark Styling System
const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0b0e1a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b0e1a" }, { weight: 2 }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5c698a" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#222a45" }, { weight: 1.5 }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4c3a9e" }, { weight: 2 }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#0f1324" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#161c33" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7983a3" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1a223d" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#111626" }],
  },
  {
    featureType: "road.labels.text.fill",
    stylers: [{ color: "#6a799c" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#241f47" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#362f6b" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#060914" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3d4b70" }],
  },
];

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

export default function MapExplorer({
  apiKey,
  selectedState,
  selectedDistrict,
  onOpenKeyModal
}) {
  // Simulated radar console states
  const [radarLat, setRadarLat] = useState(20.5937);
  const [radarLng, setRadarLng] = useState(78.9629);
  const [consoleLogs, setConsoleLogs] = useState([
    "Initializing GeoQuery GIS terminal...",
    "Local server connected. Ready for API stream.",
  ]);

  // Handle coordinates animation in the radar fallback
  useEffect(() => {
    const targetLat = selectedDistrict ? selectedDistrict.lat : (selectedState ? selectedState.lat : 20.5937);
    const targetLng = selectedDistrict ? selectedDistrict.lng : (selectedState ? selectedState.lng : 78.9629);
    
    // Add logs
    const newLogs = [];
    if (selectedState) {
      newLogs.push(`>> Target State updated: ${selectedState.name}`);
      newLogs.push(`>> Coordinating vector lock: [${selectedState.lat.toFixed(4)}, ${selectedState.lng.toFixed(4)}]`);
    }
    if (selectedDistrict) {
      newLogs.push(`>> Target District acquired: ${selectedDistrict.name}`);
      newLogs.push(`>> Sector triangulation: [${selectedDistrict.lat.toFixed(4)}, ${selectedDistrict.lng.toFixed(4)}]`);
    }
    if (!selectedState && !selectedDistrict) {
      newLogs.push(">> Navigation reset to home vector");
    }

    setConsoleLogs(prev => [...prev, ...newLogs].slice(-7));

    // Smoothly animate radar coordinates readout
    let currentStep = 0;
    const steps = 15;
    const latStart = radarLat;
    const lngStart = radarLng;

    const interval = setInterval(() => {
      currentStep++;
      const ratio = currentStep / steps;
      setRadarLat(latStart + (targetLat - latStart) * ratio);
      setRadarLng(lngStart + (targetLng - lngStart) * ratio);
      
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [selectedState, selectedDistrict]);

  const targetLat = selectedDistrict ? selectedDistrict.lat : (selectedState ? selectedState.lat : 20.5937);
  const targetLng = selectedDistrict ? selectedDistrict.lng : (selectedState ? selectedState.lng : 78.9629);
  const targetZoom = selectedDistrict ? selectedDistrict.zoom : (selectedState ? selectedState.zoom : 5);

  const mapOptions = {
    styles: darkMapStyles,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
  };

  return (
    <div style={styles.container}>
      {apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: targetLat, lng: targetLng }}
            zoom={targetZoom}
            options={mapOptions}
          >
            {selectedState && (
              <Marker
                position={{ lat: targetLat, lng: targetLng }}
                title={selectedDistrict ? selectedDistrict.name : selectedState.name}
              />
            )}
          </GoogleMap>
        </LoadScript>
      ) : (
        /* Fallback Radar Visual Console */
        <div className="dark-map-fallback" style={styles.fallbackCanvas}>
          <div className="grid-overlay" />
          
          {/* Radar Radar Tracker */}
          <div className="radar-sweep" />

          {/* Compass Icon */}
          <div style={styles.targetFinder}>
            <div style={styles.crosshairsHorizontal} />
            <div style={styles.crosshairsVertical} />
            <div style={styles.outerTargetCircle}>
              <div style={styles.innerTargetCircle}>
                <Navigation 
                  size={24} 
                  style={{
                    color: selectedState ? "var(--secondary-glow)" : "rgba(255,255,255,0.2)",
                    transform: `rotate(${selectedState ? (radarLat * 15 + radarLng * 8) % 360 : 45}deg)`,
                    transition: "transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)"
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Coordinate Readout Drawer */}
          <div className="glass-panel" style={styles.readoutDrawer}>
            <div style={styles.readoutHeader}>
              <Compass size={16} style={{ color: "var(--secondary-glow)" }} />
              <span style={styles.readoutTitle}>GIS RADAR OVERLAY</span>
            </div>
            
            <div style={styles.coordRow}>
              <div style={styles.coordBox}>
                <span style={styles.coordLabel}>LATITUDE</span>
                <span style={styles.coordVal}>{radarLat.toFixed(5)}° N</span>
              </div>
              <div style={styles.coordBox}>
                <span style={styles.coordLabel}>LONGITUDE</span>
                <span style={styles.coordVal}>{radarLng.toFixed(5)}° E</span>
              </div>
            </div>

            <div style={styles.activeLocation}>
              <span style={styles.locLabel}>LOCK TARGET:</span>
              <span style={styles.locVal}>
                {selectedDistrict 
                  ? `${selectedDistrict.name.toUpperCase()}, ${selectedState.name.toUpperCase()}`
                  : selectedState 
                    ? selectedState.name.toUpperCase() 
                    : "ALL-INDIA DOMAIN"}
              </span>
            </div>
          </div>

          {/* Terminal log panel */}
          <div className="glass-card" style={styles.terminalPanel}>
            <div style={styles.terminalHeader}>
              <Terminal size={14} style={{ color: "var(--primary-glow)", marginRight: "6px" }} />
              <span>gis_console_logs</span>
            </div>
            <div style={styles.terminalBody}>
              {consoleLogs.map((log, idx) => (
                <div key={idx} style={styles.terminalLine}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Banner message suggesting Google Maps Key */}
          <div className="glass-panel animate-fade-in" style={styles.setupBanner}>
            <p style={styles.bannerText}>
              Official satellite layers are disabled. Input a Google Maps API Key to activate.
            </p>
            <button onClick={onOpenKeyModal} style={styles.bannerBtn}>
              Setup Key
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    height: "calc(100vh - 110px)",
    position: "relative",
    padding: "0 20px 20px 0",
    boxSizing: "border-box",
    "@media (max-width: 1024px)": {
      height: "450px",
      width: "100%",
      padding: "0 20px 20px 20px",
    },
  },
  fallbackCanvas: {
    width: "100%",
    height: "100%",
    borderRadius: "16px",
    border: "1px solid var(--border-glow)",
    boxShadow: "var(--shadow-neon)",
    overflow: "hidden",
    position: "relative",
  },
  targetFinder: {
    position: "relative",
    width: "160px",
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    marginBottom: "20px",
  },
  crosshairsHorizontal: {
    position: "absolute",
    width: "200px",
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(187, 95, 48, 0.4), transparent)",
  },
  crosshairsVertical: {
    position: "absolute",
    height: "200px",
    width: "1px",
    background: "linear-gradient(180deg, transparent, rgba(187, 95, 48, 0.4), transparent)",
  },
  outerTargetCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "1px dashed rgba(187, 95, 48, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerTargetCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    border: "1px solid rgba(187, 95, 48, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(10, 14, 26, 0.4)",
    boxShadow: "inset 0 0 15px rgba(187, 95, 48, 0.1)",
  },
  readoutDrawer: {
    padding: "16px 24px",
    position: "absolute",
    top: "24px",
    right: "24px",
    width: "280px",
    zIndex: 5,
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    background: "rgba(14, 18, 36, 0.75)",
  },
  readoutHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "8px",
  },
  readoutTitle: {
    fontSize: "0.7rem",
    fontWeight: "700",
    letterSpacing: "0.1em",
    color: "var(--text-secondary)",
  },
  coordRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "12px",
  },
  coordBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  coordLabel: {
    fontSize: "0.6rem",
    color: "var(--text-muted)",
    fontWeight: "600",
  },
  coordVal: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "var(--text-main)",
    fontFamily: "monospace",
  },
  activeLocation: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
    borderTop: "1px dashed rgba(255, 255, 255, 0.05)",
  },
  locLabel: {
    fontSize: "0.6rem",
    color: "var(--secondary-glow)",
    fontWeight: "700",
  },
  locVal: {
    fontSize: "0.82rem",
    fontWeight: "700",
    color: "var(--text-main)",
    letterSpacing: "0.02em",
  },
  terminalPanel: {
    position: "absolute",
    bottom: "24px",
    left: "24px",
    width: "360px",
    zIndex: 5,
    background: "rgba(6, 8, 16, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    padding: "12px",
    fontFamily: "monospace",
    fontSize: "0.75rem",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  terminalHeader: {
    display: "flex",
    alignItems: "center",
    color: "var(--text-muted)",
    marginBottom: "8px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
    paddingBottom: "4px",
  },
  terminalBody: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    color: "var(--success)",
    opacity: 0.85,
  },
  terminalLine: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  setupBanner: {
    position: "absolute",
    bottom: "24px",
    right: "24px",
    padding: "12px 18px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    zIndex: 5,
    background: "rgba(187, 95, 48, 0.08)",
    border: "1px solid rgba(187, 95, 48, 0.2)",
    maxWidth: "340px",
  },
  bannerText: {
    fontSize: "0.78rem",
    color: "var(--text-secondary)",
    lineHeight: "1.4",
  },
  bannerBtn: {
    padding: "8px 12px",
    background: "var(--gradient-neon)",
    border: "none",
    borderRadius: "6px",
    color: "var(--text-dark)",
    fontWeight: "700",
    fontSize: "0.75rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 10px rgba(187, 95, 48, 0.2)",
    transition: "all 0.2s",
  },
};
