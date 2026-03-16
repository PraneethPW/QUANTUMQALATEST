import axios from "axios"

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://quantumqalatest-production.up.railway.app"

const API = axios.create({
  baseURL: API_BASE,
})

export default API