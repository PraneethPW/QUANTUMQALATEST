import axios from "axios"

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000"
      : "https://quantumqalatest-production.up.railway.app"
})

export default API