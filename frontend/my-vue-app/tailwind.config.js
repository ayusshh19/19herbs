

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      lightuse:"#B2DD68",
      darkuse:"#1B5D04",
      upperbar:"#4d7c0f",
      white:"#FFFFFF",
      black:"#0000",
      red:"#FF0000",
      "red-300" :"#f87171",
      "gray-50":"#d9f99d",
      "gray-700":"#1B5D04",
      "gray-900":"#1B5D04",
    },
    extend: {},
  },
  plugins: [],
});