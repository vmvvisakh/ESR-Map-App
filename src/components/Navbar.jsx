import React from "react";
import { Compass, Key, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Navbar({ onOpenKeyModal, isKeySet }) {
  return (
    <nav className="glass-panel flex justify-between items-center py-3.5 px-7 my-4 mx-5 rounded-2xl relative z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3.5">
        <div className="w-[42px] h-[42px] rounded-full bg-white/4 border border-white/8 flex items-center justify-center">
          <Compass size={24} className="animate-pulse" style={{ color: "var(--color-glow-secondary)" }} />
        </div>
        <div className="flex flex-col">
          <span className="text-gradient-white text-xl font-extrabold font-title tracking-tight leading-[1.2]">
            GeoQuery
          </span>
          <span className="text-[10px] tracking-[0.2em] text-txt-muted font-bold">
            ESR MAP EXPLORER
          </span>
        </div>
      </div>

      <div className="hidden md:flex gap-6 items-center">
        <a href="#explorer" className="text-txt-main bg-white/4 border border-white/6 py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-150">
          Explorer
        </a>
        <a href="#demographics" className="text-txt-secondary hover:text-txt-main border border-transparent py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-150">
          Demographics
        </a>
        <a href="#analytics" className="text-txt-secondary hover:text-txt-main border border-transparent py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-150">
          Analytics
        </a>
      </div>

      <div className="flex items-center gap-4">
        {isKeySet ? (
          <div className="flex items-center py-1.5 px-3 rounded-full text-xs font-semibold backdrop-blur-[4px] bg-emerald-500/10 border border-emerald-500/25 text-success tracking-wide" title="Google Maps API is active">
            <CheckCircle2 size={14} className="mr-1.5" />
            <span>G-Maps Active</span>
          </div>
        ) : (
          <div className="flex items-center py-1.5 px-3 rounded-full text-xs font-semibold backdrop-blur-[4px] bg-glow-secondary/8 border border-glow-secondary/20 text-glow-secondary tracking-wide" title="Running on local offline fallback map">
            <AlertCircle size={14} className="mr-1.5" />
            <span>Simulated Radar</span>
          </div>
        )}

        <button 
          onClick={onOpenKeyModal} 
          className="glass-card flex items-center gap-2 py-2 px-3.5 text-txt-main hover:border-white/20 text-xs font-medium rounded-lg cursor-pointer transition-all duration-150"
          title="Configure API Key"
        >
          <Key size={16} style={{ color: isKeySet ? "var(--color-glow-secondary)" : "var(--color-txt-muted)" }} />
          <span className="hidden sm:inline">Configure Maps</span>
        </button>
      </div>
    </nav>
  );
}
