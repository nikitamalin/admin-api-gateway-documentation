import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    blue: "#0076ff",
    blueHover: "#3391FF",
    green: "#13ce66",
    white: "#ffffff",
    red: "#E1341E",
    transparent: "transparent",
    light: "#F6F6F6 ", //grey
    darkBlue: "#004f98", // USAFA Blue
    switchBlueScheme: {
      500: "#0076ff"
    }
  },
  fonts: {
    heading: "Arial, serif",
    body: "var(--font-lexend), sans-serif",
    mono: "Menlo, monospace"
  },
  breakpoints: {
    footerXM: "402px",
    footerMS: "580px",
    footerSM: "620px",
    sm: "640px",
    md: "768px",
    nav: "850px",
    ml: "896px",
    lg: "1024px",
    xl: "1280px",
    mycommunity: "1375px",
    xxl: "1600px"
  },

  Popover: {
    variants: {
      responsive: {
        popper: {
          maxWidth: "unset",
          width: "unset"
        }
      }
    }
  },
  fontSizes: {
    menuSize: "lg"
  },
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
  shadows: {
    footerInner:
      "0px -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
    lessonShadowSM: "drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))",
    lessonShadowMD:
      "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
    lessonShadowLG:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  }
});

export default theme;
