import axios from "axios"

const API = axios.create({
  baseURL: "https://quantumqalatest-production.up.railway.app"
})

export default API