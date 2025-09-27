// Cosmic theme configuration for Cosmos Connect
export const cosmicTheme = {
  colors: {
    // Primary cosmic colors
    cosmic: {
      black: "#0a0a0f",
      darkBlue: "#1a1a2e",
      neonBlue: "#00d4ff",
      neonPurple: "#b347d9",
      neonPink: "#ff006e",
      starWhite: "#ffffff",
      cosmicGray: "#2a2a3e",
    },
    // Gradient combinations
    gradients: {
      cosmic: "linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 100%)",
      neonBlue: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
      neonPurple: "linear-gradient(135deg, #b347d9 0%, #8b2cb8 100%)",
      aurora: "linear-gradient(135deg, #00d4ff 0%, #b347d9 50%, #ff006e 100%)",
    },
  },
  animations: {
    glow: "glow 2s ease-in-out infinite alternate",
    float: "float 3s ease-in-out infinite",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
}

// Custom CSS animations for cosmic effects
export const cosmicAnimations = `
  @keyframes glow {
    from { box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor; }
    to { box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`
