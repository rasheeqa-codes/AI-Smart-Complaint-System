import axios from 'axios'

const API = 'https://ai-smart-complaint-system-6s5k.onrender.com/api'
export const submitComplaint = async (complaintData) => {
  const response = await axios.post(`${API}/complaints/submit`, complaintData)
  return response.data
}

export const trackComplaint = async (complaintId) => {
  const response = await axios.get(`${API}/complaints/track/${complaintId}`)
  return response.data
}

export const getAllComplaints = async () => {
  const response = await axios.get(`${API}/complaints/all`)
  return response.data
}