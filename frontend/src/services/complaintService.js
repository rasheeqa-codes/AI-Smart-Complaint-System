import axios from 'axios'

const API = 'http://127.0.0.1:8000/api'

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