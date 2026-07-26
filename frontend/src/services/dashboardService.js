import axios from 'axios'

const API = 'http://127.0.0.1:8000/api'

export const getAllComplaints = async () => {
  const response = await axios.get(`${API}/complaints/all`)
  return response.data
}