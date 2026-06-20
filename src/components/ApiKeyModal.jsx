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
    <div style={styles.overlay}>
      <div className="glass-panel animate-fade-in" style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.titleContainer}>
            <Key size={20} className="text-gradient" style={{ marginRight: "10px" }} />
            <h2 style={styles.title}>Google Maps API Key</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={styles.form}>
          <p style={styles.subtitle}>
            Enter your Google Maps JavaScript API key to load official satellite, street, and terrain layers.
          </p>

          <div style={styles.inputContainer}>
            <input
              type={showKey ? "text" : "password"}
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              style={styles.eyeBtn}
              aria-label={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div style={styles.tipBox} className="glass-card">
            <ShieldCheck size={18} style={{ color: "var(--secondary-glow)", flexShrink: 0, marginTop: "2px" }} />
            <div style={styles.tipText}>
              <strong>Fallback Active:</strong> If you don't have a key, you can close this modal! The app will automatically run a simulated GIS radar tracking overlay so you can still select and explore all Indian States and Districts.
            </div>
          </div>

          <div style={styles.btnRow}>
            {apiKey && (
              <button type="button" onClick={handleClear} style={styles.clearBtn}>
                Clear Key
              </button>
            )}
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.saveBtn}>
              Save and Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    backgroundColor: "rgba(6, 8, 16, 0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  modal: {
    width: "100%",
    maxWidth: "500px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(187, 95, 48, 0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    paddingBottom: "16px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "1.3rem",
    margin: 0,
    fontWeight: "600",
    letterSpacing: "-0.01em",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "var(--text-muted)",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s, background-color 0.2s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "12px 48px 12px 14px",
    background: "rgba(10, 14, 26, 0.6)",
    border: "1px solid var(--border-glow)",
    borderRadius: "8px",
    color: "var(--text-main)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  },
  eyeBtn: {
    position: "absolute",
    right: "14px",
    background: "none",
    border: "none",
    color: "var(--text-muted)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
  },
  tipBox: {
    padding: "14px",
    display: "flex",
    gap: "12px",
    borderLeft: "3px solid var(--secondary-glow)",
    fontSize: "0.85rem",
    lineHeight: "1.45",
  },
  tipText: {
    color: "var(--text-secondary)",
  },
  btnRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
  },
  clearBtn: {
    marginRight: "auto",
    padding: "10px 16px",
    background: "rgba(235, 64, 52, 0.1)",
    border: "1px solid rgba(235, 64, 52, 0.3)",
    borderRadius: "8px",
    color: "rgba(235, 64, 52, 0.9)",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  cancelBtn: {
    padding: "10px 18px",
    background: "none",
    border: "1px solid var(--border-glow)",
    borderRadius: "8px",
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  saveBtn: {
    padding: "10px 20px",
    background: "var(--gradient-neon)",
    border: "none",
    borderRadius: "8px",
    color: "var(--text-dark)",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(187, 95, 48, 0.3)",
    transition: "all 0.2s",
  },
};
