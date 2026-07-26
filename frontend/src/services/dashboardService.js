import axios from 'axios'

const API = 'https://ai-smart-complaint-system-6s5k.onrender.com/api'
export const getAllComplaints = async () => {
  const response = await axios.get(`${API}/complaints/all`)
  return response.data
}