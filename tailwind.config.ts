import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    },
    colors: {
      blue: "#219EF4",
      //blue: '#1fb6ff',
      blueHover: "#3391ff",
      fab4: "#30c0d4",
      orange: "#F47721",
      orangeHover: "#D75E0B",
      orangeComp: "#219EF4",
      green: "#13ce66",
      gray: "#8492a6",
      white: "#ffffff",
      black: "#000000",
      red: "#e1341e",
      transparent: "transparent",
      light: "#f9f9f9 ", //grey
      lightHover: "#e0e0e0",
      analogueBlue: "#0900ff"
    },
    fontFamily: {
      sans: ["sans-serif", "sans-serif"],
      serif: ["Georgia", "serif"],
      mono: ["Menlo", "monospace"],
      comfortaa: ["var(--font-comfortaa)", "sans-serif"],
      poppins: ["var(--font-poppins)", "sans-serif"],
      lexend: ["var(--font-lexend)", "sans-serif"],
      arial: ["Arial", "sans-serif"],
      helvetica: ["Helvetica", "sans-serif"]
    },
    screens: {
      footerXM: "402px",
      lgMenu: "462px",
      xs: "480px",
      footerSM: "620px",
      sm: "640px",
      md: "768px",
      nav: "850px",
      ml: "896px",
      lg: "1024px",
      jobs: "1180px",
      xl: "1280px",
      mycommunity: "1520px",
      mycommunityGrid: "1550px",
      xxl: "1600px"
    }
  },
  plugins: []
};
export default config;
