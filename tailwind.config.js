/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        'beeback': '#232323',
        'beebg': '#222222',
        'beetxt': '#595959',
        'beehd': '#FFC808',
        'beepurple': '#7F47FF',
        'beered': '#F83377',
        'beecyan': '#00D1D4',
        'beeorange': '#FA8D20',
      },
      fontFamily: {
        'AVENIR-L': ['AVENIR-L'],
        'AVENIR-M': ['AVENIR-M'],
        'AVENIR-H': ['AVENIR-H'],
        'AVENIR-BOOK': ['AVENIR-BOOK'],
        'AVENIR-BLACK': ['AVENIR-BLACK'],
        'AVENIR-35L': ['AVENIR-35L'],
        'AVENIR-ROMAN': ['AVENIR-ROMAN'],
        'ZAIO': ['ZAIO'],
      }
    },
  },
  plugins: [],
}

