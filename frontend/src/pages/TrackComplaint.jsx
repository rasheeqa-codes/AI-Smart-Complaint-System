import { useState } from 'react'
import { trackComplaint } from '../services/complaintService'

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!complaintId) {
      setError('Please enter a Complaint ID.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await trackComplaint(complaintId)
      setResult(data)
    } catch (err) {
      setError('Complaint not found. Please check your Complaint ID.')
    }
    setLoading(false)
  }

  const getStatusColor = (status) => {
    if (status === 'Resolved') return '#d1fae5'
    if (status === 'Escalated to Principal') return '#fee2e2'
    if (status === 'Escalated to HOD') return '#fef3c7'
    return '#dbeafe'
  }

  return (
    <div style={{ maxWidth: '500px', margin: '60px auto', padding: '40px',
      backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1e3a5f' }}>
        Track Your Complaint
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Enter Complaint ID
        </label>
        <input
          type="text"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
          placeholder="e.g. CMP-2026-0001"
          style={{ width: '100%', padding: '10px', borderRadius: '8px',
            border: '1px solid #ddd', fontSize: '16px' }}
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleTrack}
        disabled={loading}
        style={{ width: '100%', marginBottom: '20px' }}>
        {loading ? 'Searching...' : 'Track Complaint'}
      </button>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', padding: '15px',
          borderRadius: '8px', color: '#991b1b' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ backgroundColor: getStatusColor(result.status),
          padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '15px', color: '#1e3a5f' }}>Complaint Details</h3>
          <p><strong>Complaint ID:</strong> {result.complaint_id}</p>
          <p><strong>Title:</strong> {result.title}</p>
          <p><strong>Category:</strong> {result.category}</p>
          <p><strong>Priority:</strong> {result.priority}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>AI Summary:</strong> {result.ai_summary}</p>
          <p><strong>Submitted:</strong> {new Date(result.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

export default TrackComplaint