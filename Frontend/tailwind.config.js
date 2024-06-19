/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBg: '#F0ECE5',
        formbg:'#B6BBC4',
        buttonHover:'#222831'
      }
    },
  },
  plugins: [],
};
