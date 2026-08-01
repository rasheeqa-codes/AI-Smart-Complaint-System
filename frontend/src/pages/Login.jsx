import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API = 'https://ai-smart-complaint-system-6s5k.onrender.com'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
      const response = await axios.post(`${API}/api/auth/login`, {
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
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f4f8'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="https://skasc.ac.in/wp-content/uploads/2025/02/skasc-logo.png"
            alt="SKASC Logo"
            style={{ height: '60px', marginBottom: '12px' }}
            onError={(e) => e.target.style.display = 'none'}
          />
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e3a5f', marginBottom: '4px' }}>
            SKASC Voice
          </h1>
          <p style={{ color: '#777', fontSize: '13px' }}>
            Sri Krishna Arts and Science College
          </p>
          <p style={{ color: '#999', fontSize: '12px' }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            color: '#991b1b',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            color: '#333',
            fontSize: '14px'
          }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@skasc.ac.in"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1.5px solid #ddd',
              fontSize: '15px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            color: '#333',
            fontSize: '14px'
          }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%',
                padding: '12px',
                paddingRight: '50px',
                borderRadius: '8px',
                border: '1.5px solid #ddd',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#777',
                padding: '0',
                lineHeight: '1'
              }}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: loading ? '#93c5fd' : '#1e3a5f',
            color: 'white',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '700',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
          color: '#999'
        }}>
          SKASC Voice — AI-Powered Grievance System
        </p>
      </div>
    </div>
  )
}

export default Login