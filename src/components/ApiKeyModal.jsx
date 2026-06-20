import React, { useState } from "react";
import { X, Key, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveKey }) {
  const [keyInput, setKeyInput] = useState(apiKey || "");
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    onClose();
  };

  const handleClear = () => {
    setKeyInput("");
    onSaveKey("");
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#060810]/85 backdrop-blur-[8px] flex items-center justify-center p-5">
      <div className="glass-panel animate-fade-in w-full max-w-[500px] p-7 flex flex-col gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(187,95,48,0.05)] rounded-2xl">
        <div className="flex justify-between items-center border-b border-white/6 pb-4">
          <div className="flex items-center">
            <Key size={20} className="text-gradient mr-2.5" />
            <h2 className="text-xl font-semibold tracking-tight m-0">Google Maps API Key</h2>
          </div>
          <button 
            className="bg-transparent border-none text-txt-muted hover:text-txt-main hover:bg-white/5 cursor-pointer p-1.5 rounded-full flex items-center justify-center transition-all duration-200" 
            onClick={onClose} 
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <p className="text-sm text-txt-secondary leading-relaxed">
            Enter your Google Maps JavaScript API key to load official satellite, street, and terrain layers.
          </p>

          <div className="relative flex items-center">
            <input
              type={showKey ? "text" : "password"}
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full py-3 pr-12 pl-3.5 bg-[#0a0e1a]/60 border border-white/8 rounded-lg text-txt-main text-sm font-body outline-none focus:border-glow-primary transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3.5 bg-transparent border-none text-txt-muted hover:text-txt-main cursor-pointer flex items-center justify-center p-1"
              aria-label={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="p-3.5 flex gap-3 border-l-2 border-glow-secondary text-xs leading-relaxed rounded-lg glass-card">
            <ShieldCheck size={18} className="text-glow-secondary shrink-0 mt-0.5" />
            <div className="text-txt-secondary">
              <strong>Fallback Active:</strong> If you don't have a key, you can close this modal! The app will automatically run a simulated GIS radar tracking overlay so you can still select and explore all Indian States and Districts.
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            {apiKey && (
              <button 
                type="button" 
                onClick={handleClear} 
                className="mr-auto py-2.5 px-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 text-sm cursor-pointer transition-all duration-200"
              >
                Clear Key
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose} 
              className="py-2.5 px-4.5 bg-transparent border border-white/8 rounded-lg text-txt-secondary hover:bg-white/5 hover:text-txt-main text-sm cursor-pointer transition-all duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="py-2.5 px-5 bg-gradient-to-r from-glow-primary to-glow-secondary border-none rounded-lg text-txt-dark font-semibold text-sm cursor-pointer shadow-[0_4px_14px_rgba(187,95,48,0.3)] hover:brightness-110 transition-all duration-200"
            >
              Save and Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
