import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://quantumqalatest-production.up.railway.app"
})

export default API