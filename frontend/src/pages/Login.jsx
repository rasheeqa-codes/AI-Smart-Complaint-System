import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('https://ai-smart-complaint-system-6s5k.onrender.com/api/auth/login', {
        email,
        password
      })
      login(response.data.user)
      const role = response.data.user.role
      if (role === 'student') navigate('/')
      else navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '40px',
        backgroundColor: 'white', borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e3a5f', marginBottom: '4px' }}>
            SKASC Voice
          </h1>
          <p style={{ color: '#777', fontSize: '14px' }}>
            Sri Krishna Arts and Science College
          </p>
          <p style={{ color: '#999', fontSize: '13px' }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', padding: '12px',
            borderRadius: '8px', marginBottom: '20px', color: '#991b1b',
            fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px',
            fontWeight: '600', color: '#333', fontSize: '14px' }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@skasc.ac.in"
            style={{ width: '100%', padding: '12px', borderRadius: '8px',
              border: '1.5px solid #ddd', fontSize: '15px' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '6px',
            fontWeight: '600', color: '#333', fontSize: '14px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '12px', borderRadius: '8px',
              border: '1.5px solid #ddd', fontSize: '15px' }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '14px',
            backgroundColor: loading ? '#93c5fd' : '#1e3a5f',
            color: 'white', borderRadius: '8px',
            fontSize: '16px', fontWeight: '700',
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div style={{ marginTop: '20px', padding: '15px',
          backgroundColor: '#f8fafc', borderRadius: '8px', fontSize: '13px' }}>
          <p style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Test Accounts:</p>
          <p>👤 student@skasc.ac.in / student123</p>
          <p>👤 staff@skasc.ac.in / staff123</p>
          <p>👤 hod@skasc.ac.in / hod123</p>
          <p>👤 principal@skasc.ac.in / principal123</p>
        </div>
      </div>
    </div>
  )
}

export default Login