import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ShieldCheck } from 'lucide-react';
import { initialPatientData } from '../data/patientData';

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const patient = initialPatientData;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button 
          type="button" 
          className="topbar-mobile-toggle" 
          onClick={onMenuClick}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="topbar-greeting">
          <h2>Good morning, Rahul 👋</h2>
          <p>Here's an overview of your health information.</p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-badge-quick">
          <span className="topbar-status-dot"></span>
          <span>Records Encrypted</span>
        </div>

        <div 
          className="topbar-profile"
          onClick={() => navigate('/profile')}
          style={{ cursor: 'pointer' }}
          title="View Patient Profile"
        >
          <div className="user-avatar">{patient.avatar}</div>
          <div className="topbar-profile-info">
            <span className="topbar-profile-name">{patient.name}</span>
            <span className="topbar-profile-id">{patient.id}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
