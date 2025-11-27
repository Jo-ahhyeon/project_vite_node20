/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "420px",  // Mobile
      md: "768px",  // Tablet
      lg: "1080px", // Laptop
      xl: "1450px", // Desktop
    },
    maxWidth: {
        'container-xl': '1650px',
        'container-lg': '1450px',
        'container-md': '1200px',
      },
    extend: {
      colors: {
        "main-primary": "var(--main-primary)",
        "serve-color": "var(--serve-color)",
        "serve-color2": "var(--serve-color2)",
        "black": "var(--text-black)",
        "white": "var(--text-white)",
      },
      spacing: {
        xl: "var(--spacing-xl)",
        lg: "var(--spacing-lg)",
        md: "var(--spacing-md)",
        sm: "var(--spacing-sm)",
      },
      letterSpacing: {
        tighter: '-0.5px',
        tight: '-0.25px',
        normal: '0',
        wide: '1px',
        wider: '2px',
        widest: '4px',
        hero: '6px', // 너가 원하는 값으로 커스텀
      },
      borderRadius: {
        30: "var(--radius-30)",
        50: "var(--radius-50)",
      },
      borderWidth: {
        DEFAULT: "var(--border-w)",
      },
      fontSize: {
        title: ["var(--typo-title-size)", { lineHeight: "var(--typo-title-lineheight)" }],
        sub: ["var(--typo-sub-size)", { lineHeight: "var(--typo-sub-lineheight)" }],
        xl: ["var(--typo-xl-size)", { lineHeight: "var(--typo-xl-lineheight)" }],
        lg: ["var(--typo-lg-size)", { lineHeight: "var(--typo-lg-lineheight)" }],
        sm: ["var(--typo-sm-size)", { lineHeight: "var(--typo-sm-lineheight)" }],
        button: ["var(--typo-button-size)", { lineHeight: "var(--typo-button-lineheight)" }],
      },
      fontFamily: {
        primary: [
          "Inter",
          "Pretendard",
          "sans-serif",
        ],
        body: ["var(--font-body-family)", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      keyframes: {
        rolling: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        rolling: "rolling 100s linear infinite",
      },
    },
  },
  plugins: [],
};
