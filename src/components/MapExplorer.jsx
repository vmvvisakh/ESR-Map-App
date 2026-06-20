import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Compass, Navigation, Terminal } from "lucide-react";

// Google Maps Custom Dark Styling System
const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0b0e1a" }] },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#0b0e1a" }, { weight: 2 }],
  },
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
}) {
  // Simulated radar console states
  const [radarLat, setRadarLat] = useState(37.0902);
  const [radarLng, setRadarLng] = useState(-95.7129);
  const [consoleLogs, setConsoleLogs] = useState([
    "Initializing GeoQuery GIS terminal...",
    "Local server connected. Ready for API stream.",
  ]);

  // Handle coordinates animation in the radar fallback
  useEffect(() => {
    const targetLat = selectedDistrict
      ? selectedDistrict.lat
      : selectedState
        ? selectedState.lat
        : 37.0902;
    const targetLng = selectedDistrict
      ? selectedDistrict?.lng
      : selectedState
        ? selectedState?.lng
        : -95.7129;

    // Add logs
    const newLogs = [];
    if (selectedState) {
      newLogs.push(`>> Target State updated: ${selectedState?.name}`);
      newLogs.push(
        `>> Coordinating vector lock: [${selectedState?.lat?.toFixed(4)}, ${selectedState?.lng?.toFixed(4)}]`,
      );
    }
    if (selectedDistrict) {
      newLogs.push(`>> Target Ciyy acquired: ${selectedDistrict?.name}`);
      newLogs.push(
        `>> Sector triangulation: [${selectedDistrict?.lat?.toFixed(4)}, ${selectedDistrict?.lng?.toFixed(4)}]`,
      );
    }
    if (!selectedState && !selectedDistrict) {
      newLogs.push(">> Navigation reset to home vector");
    }

    setConsoleLogs((prev) => [...prev, ...newLogs].slice(-7));

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

  const targetLat = selectedDistrict
    ? selectedDistrict?.lat
    : selectedState
      ? selectedState?.lat
      : 37.0902;
  const targetLng = selectedDistrict
    ? selectedDistrict?.lng
    : selectedState
      ? selectedState?.lng
      : -95.7129;
  const targetZoom = selectedDistrict
    ? selectedDistrict?.zoom
    : selectedState
      ? selectedState?.zoom
      : 4;

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
    <div className="grow h-[calc(100vh-110px)] relative px-5 lg:px-0 lg:pr-5 pb-5 shrink-0 box-border w-full lg:w-auto lg:h-[calc(100vh-110px)]">
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
                title={
                  selectedDistrict
                    ? selectedDistrict?.name
                    : selectedState?.name
                }
              />
            )}
          </GoogleMap>
        </LoadScript>
      ) : (
        /* Fallback Radar Visual Console */
        <div className="dark-map-fallback w-full h-full rounded-2xl border border-white/8 shadow-neon overflow-hidden relative flex flex-col items-center justify-center">
          <div className="grid-overlay" />

          {/* Radar Radar Tracker */}
          <div className="radar-sweep" />

          {/* Compass Icon */}
          <div className="relative w-40 h-40 flex items-center justify-center z-10 mb-5">
            <div className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#bb5f30]/40 to-transparent" />
            <div className="absolute h-[200px] w-[1px] bg-gradient-to-b from-transparent via-[#bb5f30]/40 to-transparent" />
            <div className="w-[120px] h-[120px] rounded-full border border-dashed border-[#bb5f30]/30 flex items-center justify-center">
              <div className="w-[70px] h-[70px] rounded-full border border-[#bb5f30]/50 flex items-center justify-center bg-[#0a0e1a]/40 shadow-[inset_0_0_15px_rgba(187,95,48,0.1)]">
                <Navigation
                  size={24}
                  style={{
                    color: selectedState
                      ? "var(--color-glow-secondary)"
                      : "rgba(255,255,255,0.2)",
                    transform: `rotate(${selectedState ? (radarLat * 15 + radarLng * 8) % 360 : 45}deg)`,
                    transition: "transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Coordinate Readout Drawer */}
          <div className="glass-panel p-4 px-6 absolute top-6 right-6 w-70 z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#0e1224]/75 rounded-2xl">
            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
              <Compass size={16} className="text-glow-secondary" />
              <span className="text-[10px] font-bold tracking-widest text-txt-secondary">
                GIS RADAR OVERLAY
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex-1 flex flex-col">
                <span className="text-[9px] text-txt-muted font-bold">
                  LATITUDE
                </span>
                <span className="text-[15px] font-extrabold text-txt-main font-mono">
                  {Math.abs(radarLat).toFixed(5)}° {radarLat >= 0 ? "N" : "S"}
                </span>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[9px] text-txt-muted font-bold">
                  LONGITUDE
                </span>
                <span className="text-[15px] font-extrabold text-txt-main font-mono">
                  {Math.abs(radarLng).toFixed(5)}° {radarLng >= 0 ? "E" : "W"}
                </span>
              </div>
            </div>

            <div className="flex flex-col pt-2.5 border-t border-dashed border-white/5">
              <span className="text-[9px] text-glow-secondary font-bold">
                LOCK TARGET:
              </span>
              <span className="text-[13px] font-bold text-txt-main tracking-wide">
                {selectedDistrict
                  ? `${selectedDistrict?.name?.toUpperCase()}, ${selectedState?.name?.toUpperCase()}`
                  : selectedState
                    ? selectedState?.name?.toUpperCase()
                    : "ALL-USA DOMAIN"}
              </span>
            </div>
          </div>

          {/* Terminal log panel */}
          <div className="glass-card absolute bottom-6 left-6 w-90 z-10 bg-[#060810]/80 border border-white/4 p-3 font-mono text-[11px] rounded-xl hidden md:block">
            <div className="flex items-center text-txt-muted mb-2 border-b border-white/3 pb-1">
              <Terminal size={14} className="text-glow-primary mr-1.5" />
              <span>gis_console_logs</span>
            </div>
            <div className="flex flex-col gap-1 text-success opacity-85">
              {consoleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Banner message suggesting Google Maps Key */}
          <div className="glass-panel absolute bottom-6 right-6 p-3 px-4.5 flex items-center gap-3.5 z-10 bg-[#bb5f30]/8 border border-[#bb5f30]/20 max-w-[340px] rounded-xl animate-fade-in">
            <p className="text-xs text-txt-secondary leading-relaxed">
              Official satellite layers are disabled. Add
              VITE_GOOGLE_MAPS_API_KEY in .env.local to activate.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
