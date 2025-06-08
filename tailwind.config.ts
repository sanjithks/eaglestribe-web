/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#E9E9E9',      // Light Gray
        'foreground': '#FDF7F0',      // Off-White
        'primary-red': '#9A2A2A',        // Deep Red
        'secondary-brown': '#7A553A',    // Rich Brown
        'dark-charcoal': '#4A4A4A',      // Dark Gray
      },
    },
  },
  plugins: [],
}