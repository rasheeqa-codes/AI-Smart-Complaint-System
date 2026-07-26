import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getAllComplaints } from '../services/dashboardService'
import axios from 'axios'

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchComplaints()
  }, [user])

  const fetchComplaints = async () => {
    setLoading(true)
    try {
      const data = await getAllComplaints()
      setComplaints(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const updateStatus = async (complaintId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/complaints/update-status/${complaintId}?status=${newStatus}`
      )
      fetchComplaints()
    } catch (err) {
      console.error('Status update failed:', err)
    }
  }

  const deleteComplaint = async (complaintId) => {
    const confirmed = window.confirm('Are you sure you want to delete this complaint?')
    if (!confirmed) return
    try {
      await axios.delete(`http://127.0.0.1:8000/api/complaints/delete/${complaintId}`)
      fetchComplaints()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const getPriorityColor = (priority) => {
    if (priority === 'High') return '#fee2e2'
    if (priority === 'Medium') return '#fef3c7'
    return '#d1fae5'
  }

  const getStatusColor = (status) => {
    if (status === 'Resolved') return '#10b981'
    if (status === 'Escalated to Principal') return '#dc2626'
    if (status === 'Escalated to HOD') return '#f59e0b'
    return '#3b82f6'
  }

  const filteredComplaints = complaints.filter((c) => {
    if (user.role === 'staff') {
      if (!['Submitted', 'Analyzing', 'Routed', 'In Progress'].includes(c.status)) return false
    }
    if (user.role === 'hod') {
      if (!['Escalated to HOD', 'Escalated to Principal', 'In Progress', 'Routed'].includes(c.status)) return false
    }
    if (user.role === 'principal') {
      if (!['Escalated to Principal'].includes(c.status)) return false
    }
    if (search && !c.description?.toLowerCase().includes(search.toLowerCase()) &&
      !c.complaint_id?.toLowerCase().includes(search.toLowerCase())) return false
    if (filterCategory !== 'All' && c.category !== filterCategory) return false
    if (filterPriority !== 'All' && c.priority !== filterPriority) return false
    return true
  })

  const analytics = {
    total: complaints.length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    highPriority: complaints.filter(c => c.priority === 'High').length,
    escalated: complaints.filter(c => c.status?.includes('Escalated')).length
  }

  const getRoleTitle = () => {
    if (user.role === 'staff') return `Staff Dashboard — ${user.name}`
    if (user.role === 'hod') return `HOD Dashboard — ${user.name}`
    if (user.role === 'principal') return `Principal Dashboard — ${user.name}`
    return 'Dashboard'
  }

  if (!user) return null

  return (
    <div style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto' }}>

      <h2 style={{ color: '#1e3a5f', marginBottom: '5px' }}>
        {getRoleTitle()}
      </h2>
      <p style={{ color: '#777', marginBottom: '25px', fontSize: '14px' }}>
        Sri Krishna Arts and Science College — SKASC Voice
      </p>

      {['principal', 'hod'].includes(user.role) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px', marginBottom: '25px' }}>
          {[
            { label: 'Total', value: analytics.total, color: '#dbeafe', text: '#1e3a5f' },
            { label: 'Resolved', value: analytics.resolved, color: '#d1fae5', text: '#065f46' },
            { label: 'High Priority', value: analytics.highPriority, color: '#fee2e2', text: '#991b1b' },
            { label: 'Escalated', value: analytics.escalated, color: '#fef3c7', text: '#92400e' },
          ].map((card) => (
            <div key={card.label} style={{ backgroundColor: card.color,
              padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '30px', fontWeight: '800', color: card.text }}>
                {card.value}
              </div>
              <div style={{ color: '#555', fontSize: '13px', fontWeight: '500' }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px',
            border: '1.5px solid #ddd', fontSize: '14px', minWidth: '200px' }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px',
            border: '1.5px solid #ddd', fontSize: '14px' }}>
          <option>All</option>
          <option>Academic</option>
          <option>Infrastructure</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Harassment</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px',
            border: '1.5px solid #ddd', fontSize: '14px' }}>
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <h3 style={{ marginBottom: '15px', color: '#1e3a5f', fontSize: '16px' }}>
        {user.role === 'staff' && '📋 Complaints Assigned to Department'}
        {user.role === 'hod' && '📋 Department Complaints + Escalations'}
        {user.role === 'principal' && '🚨 Escalated Complaints Only'}
        {' '}
        <span style={{ color: '#777', fontWeight: '400', fontSize: '14px' }}>
          ({filteredComplaints.length} complaints)
        </span>
      </h3>

      {loading && <p style={{ color: '#777' }}>Loading complaints...</p>}

      {!loading && filteredComplaints.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#777' }}>
          <p style={{ fontSize: '40px' }}>📭</p>
          <p>No complaints found.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredComplaints.map((c) => (
          <div key={c.id} style={{
            backgroundColor: getPriorityColor(c.priority),
            padding: '20px', borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            borderLeft: `5px solid ${c.priority === 'High' ? '#dc2626' : c.priority === 'Medium' ? '#f59e0b' : '#10b981'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: '#1e3a5f', fontSize: '15px' }}>
                {c.complaint_id}
              </span>
              <span style={{
                backgroundColor: getStatusColor(c.status),
                color: 'white', padding: '4px 12px',
                borderRadius: '20px', fontSize: '12px', fontWeight: '600'
              }}>
                {c.status}
              </span>
            </div>

            <p style={{ color: '#333', marginBottom: '10px', fontSize: '14px' }}>
              {c.description}
            </p>

            <div style={{ display: 'flex', gap: '10px',
              marginBottom: '10px', flexWrap: 'wrap' }}>

              {user.role === 'staff' && c.status === 'Routed' && (
                <button
                  onClick={() => updateStatus(c.complaint_id, 'In Progress')}
                  style={{ padding: '6px 14px', backgroundColor: '#3b82f6',
                    color: 'white', borderRadius: '6px', fontSize: '13px',
                    fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                  ▶ Mark In Progress
                </button>
              )}

              {user.role === 'staff' && c.status === 'In Progress' && (
                <button
                  onClick={() => updateStatus(c.complaint_id, 'Resolved')}
                  style={{ padding: '6px 14px', backgroundColor: '#10b981',
                    color: 'white', borderRadius: '6px', fontSize: '13px',
                    fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                  ✅ Mark Resolved
                </button>
              )}

              {user.role === 'hod' && (
                <button
                  onClick={() => updateStatus(c.complaint_id, 'Resolved')}
                  style={{ padding: '6px 14px', backgroundColor: '#10b981',
                    color: 'white', borderRadius: '6px', fontSize: '13px',
                    fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                  ✅ Mark Resolved
                </button>
              )}

              {user.role === 'principal' && (
                <button
                  onClick={() => updateStatus(c.complaint_id, 'Resolved')}
                  style={{ padding: '6px 14px', backgroundColor: '#10b981',
                    color: 'white', borderRadius: '6px', fontSize: '13px',
                    fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                  ✅ Mark Resolved
                </button>
              )}

              {user.role === 'staff' && (
                <button
                  onClick={() => deleteComplaint(c.complaint_id)}
                  style={{ padding: '6px 14px', backgroundColor: '#ef4444',
                    color: 'white', borderRadius: '6px', fontSize: '13px',
                    fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                  🗑️ Delete
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', fontSize: '13px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: 'white', padding: '3px 10px',
                borderRadius: '6px', fontWeight: '500' }}>
                📁 {c.category}
              </span>
              <span style={{ backgroundColor: 'white', padding: '3px 10px',
                borderRadius: '6px', fontWeight: '500' }}>
                ⚡ {c.priority}
              </span>
              <span style={{ backgroundColor: 'white', padding: '3px 10px',
                borderRadius: '6px', fontWeight: '500' }}>
                🤖 {c.ai_summary}
              </span>
              <span style={{ backgroundColor: 'white', padding: '3px 10px',
                borderRadius: '6px', fontWeight: '500', color: '#777' }}>
                🕐 {new Date(c.created_at).toLocaleDateString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard