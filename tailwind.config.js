/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', ' /src/**/**/*.tsx', './dist/*.html'],
  theme: {
    extend: {
      bg: {
        backgroundColor: 'bg-sky-300 dark:bg-slate-900',
        color: 'dark:text-amber-100 text-amber-800',
      },
    },
  },
  plugins: [],
};
