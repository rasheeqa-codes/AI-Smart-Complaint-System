import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { submitComplaint } from '../services/complaintService'

function SubmitComplaint() {
  const { user } = useAuth()
  const [description, setDescription] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [listening, setListening] = useState(false)

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice not supported. Please use Chrome.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-IN'
    recognition.start()
    setListening(true)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setDescription(prev => prev + ' ' + transcript)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
  }

  const handleSubmit = async () => {
    if (!description || description.trim().length < 10) {
      setError('Please describe your complaint in at least 10 characters.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await submitComplaint({
        description,
        is_anonymous: anonymous,
        student_id: anonymous ? null : user?.id,
        student_name: anonymous ? null : user?.name,
        voice_input_used: false
      })
      setResult(data)
      setDescription('')
      setAnonymous(false)
    } catch (err) {
      setError('Failed to submit complaint. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '40px',
      backgroundColor: 'white', borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>

      <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#1e3a5f' }}>
        Submit a Complaint
      </h2>
      <p style={{ textAlign: 'center', color: '#777', marginBottom: '30px', fontSize: '14px' }}>
        Sri Krishna Arts and Science College — SKASC Voice
      </p>

      {result && (
        <div style={{ backgroundColor: '#d1fae5', padding: '20px',
          borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ color: '#065f46', marginBottom: '10px' }}>
            ✅ Complaint Submitted Successfully!
          </h3>
          <p><strong>Complaint ID:</strong> {result.complaint_id}</p>
          <p><strong>Category:</strong> {result.ai_analysis?.category}</p>
          <p><strong>Priority:</strong> {result.ai_analysis?.priority}</p>
          <p><strong>AI Summary:</strong> {result.ai_analysis?.summary}</p>
          <p style={{ fontSize: '13px', color: '#555', marginTop: '10px' }}>
            Save your Complaint ID to track status later.
          </p>
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#fee2e2', padding: '15px',
          borderRadius: '8px', marginBottom: '20px', color: '#991b1b' }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px',
          fontWeight: '600', color: '#1e3a5f' }}>
          Describe Your Complaint
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your complaint clearly. Include details like location, duration, and impact..."
          rows={6}
          style={{ width: '100%', padding: '12px', borderRadius: '8px',
            border: '1px solid #ddd', fontSize: '15px',
            resize: 'vertical', lineHeight: '1.5',
            boxSizing: 'border-box' }}
        />
        <button
          onClick={startVoice}
          style={{ marginTop: '8px', padding: '8px 16px',
            backgroundColor: listening ? '#ef4444' : '#6366f1',
            color: 'white', borderRadius: '8px', fontSize: '14px',
            border: 'none', cursor: 'pointer' }}>
          {listening ? '🔴 Listening... Speak now' : '🎤 Use Voice Input'}
        </button>
      </div>

      <div style={{ marginBottom: '25px', display: 'flex',
        alignItems: 'center', gap: '10px' }}>
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          id="anonymous"
          style={{ width: '18px', height: '18px' }}
        />
        <label htmlFor="anonymous" style={{ fontWeight: '500', color: '#333' }}>
          Submit Anonymously (your identity will be hidden from staff)
        </label>
      </div>

      {!anonymous && user && (
        <div style={{ marginBottom: '20px', padding: '10px 14px',
          backgroundColor: '#f0f4f8', borderRadius: '8px',
          fontSize: '13px', color: '#555' }}>
          Submitting as: <strong>{user.name}</strong>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: '100%', padding: '14px',
          backgroundColor: loading ? '#93c5fd' : '#2563eb',
          color: 'white', borderRadius: '8px',
          fontSize: '16px', fontWeight: '600',
          border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
        {loading ? '⏳ Submitting & Analyzing...' : 'Submit Complaint'}
      </button>
    </div>
  )
}

export default SubmitComplaint