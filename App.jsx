import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Wrapper
import DashboardLayout from './components/DashboardLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UploadPrescription from './pages/UploadPrescription';
import AIResult from './pages/AIResult';
import HealthID from './pages/HealthID';
import Emergency from './pages/Emergency';
import Settings from './pages/Settings';
import Medicines from './pages/Medicines';
import AccessHistoryPage from './pages/AccessHistoryPage';
import { getStoredAppSettings } from './data/patientData';

export default function App() {
  // Sync Dark Mode theme on initial application mount
  useEffect(() => {
    const settings = getStoredAppSettings();
    if (settings.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  return (
    <Routes>
      {/* Public Route: Screen 1 Login */}
      <Route path="/" element={<Login />} />

      {/* Authenticated / Core Platform Routes with Unified Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/upload" element={<UploadPrescription />} />
        <Route path="/ai-result" element={<AIResult />} />
        <Route path="/health-id" element={<HealthID />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/history" element={<AccessHistoryPage />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback wildcard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

