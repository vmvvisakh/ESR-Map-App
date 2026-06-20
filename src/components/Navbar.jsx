import React from "react";
import { Compass, Key, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Navbar({ isKeySet }) {
  return (
    <nav className="glass-panel flex justify-between items-center py-2.5 px-4 md:py-3.5 md:px-7 my-3 mx-3 md:my-4 md:mx-5 rounded-2xl relative z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <div className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full bg-white/4 border border-white/8 flex items-center justify-center">
          <Compass
            size={20}
            className="animate-pulse"
            style={{ color: "var(--color-glow-secondary)" }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-gradient-white text-base sm:text-xl font-extrabold font-title tracking-tight leading-[1.2]">
            GeoQuery
          </span>
          <span className="text-[8px] sm:text-[10px] tracking-[0.2em] text-txt-muted font-bold">
            ESR MAP EXPLORER
          </span>
        </div>
      </div>

      <div className="hidden md:flex gap-6 items-center">
        <a
          href="#explorer"
          className="text-txt-main bg-white/4 border border-white/6 py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-150"
        >
          Explorer
        </a>
        <a
          href="#demographics"
          className="text-txt-secondary hover:text-txt-main border border-transparent py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-150"
        >
          Demographics
        </a>
        <a
          href="#analytics"
          className="text-txt-secondary hover:text-txt-main border border-transparent py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-150"
        >
          Analytics
        </a>
      </div>

      <div className="flex items-center gap-4">
        {isKeySet ? (
          <div
            className="flex items-center py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-[4px] bg-emerald-500/10 border border-emerald-500/25 text-success tracking-wide"
            title="Google Maps API is active"
          >
            <CheckCircle2 size={12} className="mr-1 sm:mr-1.5 shrink-0" />
            <span>G-Maps Active</span>
          </div>
        ) : (
          <div
            className="flex items-center py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-[4px] bg-glow-secondary/8 border border-glow-secondary/20 text-glow-secondary tracking-wide"
            title="Running on local offline fallback map"
          >
            <AlertCircle size={12} className="mr-1 sm:mr-1.5 shrink-0" />
            <span>Simulated Radar</span>
          </div>
        )}
      </div>
    </nav>
  );
}
