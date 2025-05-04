/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        black: '#000000',
        white: '#FCFCFC',
        wauGreen: '#00ACA9',
        wauPurple: '#403C90',
      },
      maxWidth: {
        '8xl': '1600px',
      },
      fontSize: {
        10: '10px',
        35: '35px',
        53: '53px',
      },
    },
  },
  plugins: [],
};
