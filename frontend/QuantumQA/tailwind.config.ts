import type { Config } from "tailwindcss"

export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#00F5FF",
        secondary:"#7C3AED"
      }
    }
  },
  plugins: []
} satisfies Config