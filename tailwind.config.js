/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  fontFamily: {
    sans: ["Inter", "sans-serif"],
  },
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#F2F1FF",
          200: "#7D71FF",
          300: "#6E61FF",
        },
        black: "#1A1A1A",
        red: {
          50: "#FADBDA",
          100: "#E30613",
        },
      },
    },
  },
  plugins: [],
};
