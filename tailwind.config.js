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
        lg: ["var(--typo-lg-size)", { lineHeight: "var(--typo-lg-lineheight)" }],
        sm: ["var(--typo-sm-size)", { lineHeight: "var(--typo-sm-lineheight)" }],
        button: ["var(--typo-button-size)", { lineHeight: "var(--typo-button-lineheight)" }],
      },
      fontFamily: {
        primary: [
          "Inter",
          "Pretendard",
          "Noto Sans KR",
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
    },
  },
  plugins: [],
};
