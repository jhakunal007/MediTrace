import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  Pill,
  UploadCloud,
  QrCode,
  AlertTriangle,
  ShieldCheck,
  History,
  Settings,
  LogOut,
  Activity,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, isFunctional: true },
    { label: 'My Profile', path: '/profile', icon: User, isFunctional: true },
    { label: 'Medical Records', path: '/records', icon: FileText, isFunctional: false },
    { label: 'Medicines', path: '/medicines', icon: Pill, isFunctional: true },
    { label: 'Upload Prescription', path: '/upload', icon: UploadCloud, isFunctional: true },
    { label: 'QR Health ID', path: '/health-id', icon: QrCode, isFunctional: true },
    { label: 'Emergency Access', path: '/emergency', icon: AlertTriangle, isFunctional: true, isEmergency: true },
    { label: 'Access Control', path: '/access-control', icon: ShieldCheck, isFunctional: false },
    { label: 'Access History', path: '/history', icon: History, isFunctional: true },
    { label: 'Settings', path: '/settings', icon: Settings, isFunctional: true },
  ];

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">
            <Activity size={22} strokeWidth={2.5} />
          </div>
          <div className="sidebar-brand">
            <span className="sidebar-brand-name">
              Medi<span>Trace</span>
            </span>
            <span className="sidebar-brand-tagline">Secure Healthcare Records</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          <span className="nav-section-title">Core Patient Portal</span>

          {navItems.map((item) => {
            const Icon = item.icon;

            if (!item.isFunctional) {
              return (
                <div
                  key={item.label}
                  className="nav-item disabled"
                  title="Feature coming soon in v2"
                >
                  <div className="nav-item-content">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  <span className="coming-soon-badge">Soon</span>
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''} ${item.isEmergency ? 'emergency-nav' : ''}`
                }
              >
                <div className="nav-item-content">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.isEmergency && (
                  <span className="badge badge-danger">SOS</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">


          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
