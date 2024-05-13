import React from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const Admin = () => {
    const isAuthentcated = localStorage.getItem('astatus') === String(1)
    return (
        !isAuthentcated ? <AdminLogin /> : <AdminDashboard />
    )
}

export default Admin
