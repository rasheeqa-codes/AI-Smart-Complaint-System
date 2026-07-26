import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SubmitComplaint from '../pages/SubmitComplaint'
import TrackComplaint from '../pages/TrackComplaint'
import Dashboard from '../pages/Dashboard'

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="submit" element={
  <ProtectedRoute allowedRoles={['student', 'staff', 'hod', 'principal']}>
    <SubmitComplaint />
  </ProtectedRoute>
} />
        <Route path="track" element={<TrackComplaint />} />
        <Route path="dashboard" element={
          <ProtectedRoute allowedRoles={['staff', 'hod', 'principal']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="unauthorized" element={
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <h2 style={{ color: '#dc2626' }}>⛔ Access Denied</h2>
            <p>You don't have permission to view this page.</p>
          </div>
        } />
      </Route>
    </Routes>
  )
}

export default AppRoutes