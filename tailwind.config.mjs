/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        // primary: 'theme("colors.blue.800")',
        primary: "#133687",
        danger: "#ef4a00",
        warning: "#ff9f29",
        success: "#45b369",
        secondaty: "#6c757d;",
        info: "#2563EB",
      },
      fontSize: {
        // Headings
        h1: "60px",
        h2: "48px",
        h3: "36px",
        h4: "30px",
        h5: "24px",
        h6: "20px",

        // Text Sizes
        "body-lg": "18px",
        "body-md": "16px",
        "body-sm": "14px",
        "body-xs": "12px",
      },
    },
  },
  plugins: [],
};
