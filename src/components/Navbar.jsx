import React from "react";
import { Compass, Key, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Navbar({ onOpenKeyModal, isKeySet }) {
  return (
    <nav className="glass-panel" style={styles.nav}>
      <div style={styles.brandContainer}>
        <div style={styles.logoCircle}>
          <Compass size={24} className="pulse-glow-secondary" style={{ color: "var(--secondary-glow)" }} />
        </div>
        <div style={styles.brandText}>
          <span style={styles.brandTitle} className="text-gradient-white">GeoQuery</span>
          <span style={styles.brandSubTitle}>ESR MAP EXPLORER</span>
        </div>
      </div>

      <div style={styles.navLinks}>
        <a href="#explorer" style={{ ...styles.link, ...styles.activeLink }}>Explorer</a>
        <a href="#demographics" style={styles.link}>Demographics</a>
        <a href="#analytics" style={styles.link}>Analytics</a>
      </div>

      <div style={styles.actions}>
        {isKeySet ? (
          <div style={{ ...styles.badge, ...styles.successBadge }} title="Google Maps API is active">
            <CheckCircle2 size={14} style={{ marginRight: "6px" }} />
            <span style={styles.badgeText}>G-Maps Active</span>
          </div>
        ) : (
          <div style={{ ...styles.badge, ...styles.warnBadge }} title="Running on local offline fallback map">
            <AlertCircle size={14} style={{ marginRight: "6px" }} />
            <span style={styles.badgeText}>Simulated Radar</span>
          </div>
        )}

        <button 
          onClick={onOpenKeyModal} 
          style={styles.keyBtn} 
          title="Configure API Key"
          className="glass-card"
        >
          <Key size={16} style={{ color: isKeySet ? "var(--secondary-glow)" : "var(--text-muted)" }} />
          <span style={styles.keyBtnText}>Configure Maps</span>
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 28px",
    margin: "16px 20px 0 20px",
    borderRadius: "16px",
    position: "relative",
    zIndex: 100,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logoCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
  },
  brandTitle: {
    fontSize: "1.4rem",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    lineHeight: "1.2",
    fontFamily: "var(--font-title)",
  },
  brandSubTitle: {
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    color: "var(--text-muted)",
    fontWeight: "700",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  link: {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "var(--transition-fast)",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid transparent",
  },
  activeLink: {
    color: "var(--text-main)",
    background: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "600",
    backdropFilter: "blur(4px)",
  },
  successBadge: {
    background: "rgba(16, 185, 129, 0.1)",
    border: "1px solid rgba(16, 185, 129, 0.25)",
    color: "var(--success)",
  },
  warnBadge: {
    background: "rgba(187, 95, 48, 0.08)",
    border: "1px solid rgba(187, 95, 48, 0.2)",
    color: "var(--secondary-glow)",
  },
  badgeText: {
    letterSpacing: "0.02em",
  },
  keyBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-glow)",
    color: "var(--text-main)",
    fontSize: "0.85rem",
    fontWeight: "500",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "var(--transition-fast)",
  },
  keyBtnText: {
    // Media query is in CSS, here we keep it as standard text
  },
};
