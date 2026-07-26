import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getRoleBadgeColor = (role) => {
    if (role === 'principal') return '#7c3aed'
    if (role === 'hod') return '#dc2626'
    if (role === 'staff') return '#059669'
    return '#2563eb'
  }

  return (
    <nav style={{
      backgroundColor: '#1e3a5f',
      padding: '10px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src="https://skasc.ac.in/wp-content/uploads/2025/02/skasc-logo.png"
          alt="SKASC Logo"
          style={{ height: '48px', width: 'auto' }}
          onError={(e) => e.target.style.display = 'none'}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ color: '#f59e0b', fontSize: '20px', fontWeight: '800' }}>SKASC</span>
            <span style={{ color: 'white', fontSize: '20px', fontWeight: '400' }}>Voice</span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '10px' }}>
            Sri Krishna Arts and Science College
          </div>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/track" style={{ color: 'white', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>
          Track
        </Link>

        {user && user.role === 'student' && (
          <Link to="/submit" style={{ color: 'white', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>
            Submit Complaint
          </Link>
        )}

        {!user && (
          <Link to="/login" style={{ color: 'white', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>
            Submit Complaint
          </Link>
        )}

        {user && ['staff', 'hod', 'principal'].includes(user.role) && (
          <Link to="/dashboard" style={{ color: 'white', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>
            Dashboard
          </Link>
        )}

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{user.name}</div>
              <div style={{
                backgroundColor: getRoleBadgeColor(user.role),
                color: 'white', fontSize: '10px',
                padding: '2px 8px', borderRadius: '10px',
                textTransform: 'uppercase', fontWeight: '700'
              }}>
                {user.role}
              </div>
            </div>
            <button onClick={handleLogout} style={{
              padding: '7px 16px', backgroundColor: '#ef4444',
              color: 'white', borderRadius: '8px', fontSize: '13px',
              fontWeight: '600', border: 'none', cursor: 'pointer'
            }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button style={{
              padding: '8px 18px', backgroundColor: '#f59e0b',
              color: '#1e3a5f', borderRadius: '8px', fontSize: '14px',
              fontWeight: '700', border: 'none', cursor: 'pointer'
            }}>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar