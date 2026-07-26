import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()

  const stats = [
    { number: '9000+', label: 'Students' },
    { number: '400+', label: 'Faculty' },
    { number: '50+', label: 'Programmes' },
    { number: '25000+', label: 'Graduates' },
  ]

  const features = [
    { icon: '🤖', title: 'AI Classification', desc: 'Complaints are automatically categorized and prioritized using NLP' },
    { icon: '🎤', title: 'Voice Input', desc: 'Submit complaints by speaking — no typing needed' },
    { icon: '🔒', title: 'Anonymous Option', desc: 'Submit sensitive complaints without revealing your identity' },
    { icon: '⚡', title: 'Auto Escalation', desc: 'Unresolved complaints automatically reach HOD and Principal' },
    { icon: '📊', title: 'Live Dashboard', desc: 'Staff, HOD and Principal track all complaints in real time' },
    { icon: '🔍', title: 'Track Status', desc: 'Check your complaint status anytime using your Complaint ID' },
  ]

  const events = [
    { title: "Freshers' Day 2026", img: "https://skasc.ac.in/wp-content/uploads/2023/10/Freshers-Day-2026.jpg" },
    { title: "College Day 2026", img: "https://skasc.ac.in/wp-content/uploads/2023/10/College-Day-2026-SKASC.jpg" },
    { title: "Alumni Meet 2026", img: "https://skasc.ac.in/wp-content/uploads/2023/10/Alumni-Meet-2026-SKASC.jpg" },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
        padding: '80px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img
          src="https://skasc.ac.in/wp-content/uploads/2025/02/skasc-logo.png"
          alt="SKASC Logo"
          style={{ height: '80px', width: 'auto', marginBottom: '20px' }}
          onError={(e) => e.target.style.display = 'none'}
        />
        <h1 style={{ color: 'white', fontSize: '42px', fontWeight: '800', marginBottom: '10px' }}>
          <span style={{ color: '#f59e0b' }}>SKASC</span> Voice
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '18px', marginBottom: '8px' }}>
          Sri Krishna Arts and Science College
        </p>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>
          Kuniamuthur, Coimbatore — An Autonomous Institution Affiliated to Bharathiar University
        </p>
        <p style={{ color: '#e2e8f0', fontSize: '16px', maxWidth: '600px',
          margin: '0 auto 40px', lineHeight: '1.7' }}>
          AI-Powered Smart Complaint and Escalation System — Submit, Track and Resolve
          grievances transparently and efficiently.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user && user.role === 'student' ? (
            <Link to="/submit">
              <button style={{ padding: '14px 32px', backgroundColor: '#f59e0b',
                color: '#1e3a5f', borderRadius: '10px', fontSize: '16px',
                fontWeight: '700', border: 'none', cursor: 'pointer' }}>
                Submit Complaint
              </button>
            </Link>
          ) : !user ? (
            <Link to="/login">
              <button style={{ padding: '14px 32px', backgroundColor: '#f59e0b',
                color: '#1e3a5f', borderRadius: '10px', fontSize: '16px',
                fontWeight: '700', border: 'none', cursor: 'pointer' }}>
                Login to Submit
              </button>
            </Link>
          ) : null}
          <Link to="/track">
            <button style={{ padding: '14px 32px', backgroundColor: 'transparent',
              color: 'white', borderRadius: '10px', fontSize: '16px',
              fontWeight: '600', border: '2px solid white', cursor: 'pointer' }}>
              Track Complaint
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: '#f59e0b', padding: '30px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#1e3a5f' }}>{s.number}</div>
              <div style={{ fontSize: '13px', color: '#1e3a5f', fontWeight: '600' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '60px 40px', backgroundColor: '#f8fafc' }}>
        <h2 style={{ textAlign: 'center', color: '#1e3a5f', fontSize: '28px',
          fontWeight: '800', marginBottom: '8px' }}>
          Why SKASC Voice?
        </h2>
        <p style={{ textAlign: 'center', color: '#777', marginBottom: '40px' }}>
          A smarter way to raise and resolve student grievances
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          {features.map((f) => (
            <div key={f.title} style={{ backgroundColor: 'white', padding: '24px',
              borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              borderTop: '4px solid #2563eb' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ color: '#1e3a5f', marginBottom: '8px', fontSize: '16px' }}>{f.title}</h3>
              <p style={{ color: '#777', fontSize: '14px', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Photos */}
      <div style={{ padding: '60px 40px', backgroundColor: 'white' }}>
        <h2 style={{ textAlign: 'center', color: '#1e3a5f', fontSize: '28px',
          fontWeight: '800', marginBottom: '8px' }}>
          Life at SKASC
        </h2>
        <p style={{ textAlign: 'center', color: '#777', marginBottom: '40px' }}>
          Igniting Minds, Shaping Up a Bright Future
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          {events.map((e) => (
            <div key={e.title} style={{ borderRadius: '12px', overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <img
                src={e.img}
                alt={e.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                onError={(e) => e.target.style.display = 'none'}
              />
              <div style={{ padding: '12px 16px', backgroundColor: '#1e3a5f' }}>
                <p style={{ color: 'white', fontSize: '14px', fontWeight: '600', margin: 0 }}>
                  {e.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '60px 40px', backgroundColor: '#1e3a5f' }}>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: '28px',
          fontWeight: '800', marginBottom: '40px' }}>
          How It Works
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center',
          gap: '20px', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { step: '1', title: 'Login', desc: 'Sign in with your SKASC credentials' },
            { step: '2', title: 'Submit', desc: 'Describe your complaint by text or voice' },
            { step: '3', title: 'AI Analyzes', desc: 'AI classifies category and priority instantly' },
            { step: '4', title: 'Resolved', desc: 'Department acts and resolves your complaint' },
          ].map((s) => (
            <div key={s.step} style={{ textAlign: 'center', width: '180px' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#f59e0b',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 12px',
                fontSize: '20px', fontWeight: '800', color: '#1e3a5f' }}>
                {s.step}
              </div>
              <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '6px' }}>{s.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '13px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer info */}
      <div style={{ backgroundColor: '#0f2240', padding: '30px 40px', textAlign: 'center' }}>
        <img
          src="https://skasc.ac.in/wp-content/uploads/2024/10/srikrishna_logo.svg"
          alt="SKASC"
          style={{ height: '50px', marginBottom: '12px' }}
          onError={(e) => e.target.style.display = 'none'}
        />
        <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
          Sugunapuram, Kuniamuthur P.O., Coimbatore, Tamil Nadu — 641 008
        </p>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>
          📞 0422–2678400 | ✉️ info@skasc.ac.in
        </p>
      </div>
    </div>
  )
}

export default Home