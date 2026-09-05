import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, 
  Download, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertOctagon,
  ArrowRight,
  Activity,
  Copy
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { initialPatientData } from '../data/patientData';

export default function HealthID() {
  const navigate = useNavigate();
  const patient = initialPatientData;
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDownload = () => {
    triggerToast('Health ID card downloaded as PDF (simulated).');
  };

  const handleShare = () => {
    triggerToast('Secure temporary share link copied to clipboard.');
  };

  return (
    <div className="health-id-wrapper animate-fade-in">
      <PageHeader
        title="Secure Health ID"
        subtitle="Your emergency medical information, available through a secure QR code."
        showBackToDashboard={true}
      />

      {toastMessage && (
        <div className="card" style={{ width: '100%', background: '#ecfdf5', borderColor: '#a7f3d0', color: '#047857', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.25rem' }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* DIGITAL HEALTH IDENTITY CARD */}
      <div className="health-card">
        <div className="health-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Activity size={20} color="var(--primary)" />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              MediTrace Sovereign ID
            </span>
          </div>
          <span className="badge badge-success">● Active</span>
        </div>

        {/* HIGH RESOLUTION QR CODE SVG */}
        <div className="health-qr-container">
          <svg
            width="220"
            height="220"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', borderRadius: '8px' }}
          >
            {/* White base */}
            <rect width="200" height="200" fill="#ffffff" />

            {/* Corner Markers */}
            {/* Top-Left */}
            <rect x="15" y="15" width="45" height="45" rx="6" fill="#0f172a" />
            <rect x="23" y="23" width="29" height="29" rx="4" fill="#ffffff" />
            <rect x="29" y="29" width="17" height="17" rx="3" fill="#0284c7" />

            {/* Top-Right */}
            <rect x="140" y="15" width="45" height="45" rx="6" fill="#0f172a" />
            <rect x="148" y="23" width="29" height="29" rx="4" fill="#ffffff" />
            <rect x="154" y="29" width="17" height="17" rx="3" fill="#0284c7" />

            {/* Bottom-Left */}
            <rect x="15" y="140" width="45" height="45" rx="6" fill="#0f172a" />
            <rect x="23" y="148" width="29" height="29" rx="4" fill="#ffffff" />
            <rect x="29" y="154" width="17" height="17" rx="3" fill="#0284c7" />

            {/* Distinctive Data Modules Matrix */}
            <rect x="70" y="20" width="8" height="8" fill="#1e293b" />
            <rect x="85" y="20" width="12" height="8" fill="#0284c7" />
            <rect x="110" y="20" width="16" height="8" fill="#1e293b" />
            <rect x="70" y="36" width="16" height="8" fill="#0284c7" />
            <rect x="100" y="36" width="8" height="8" fill="#1e293b" />
            <rect x="115" y="36" width="12" height="8" fill="#1e293b" />
            
            <rect x="20" y="70" width="8" height="8" fill="#1e293b" />
            <rect x="36" y="70" width="12" height="8" fill="#0284c7" />
            <rect x="20" y="86" width="18" height="8" fill="#0284c7" />
            <rect x="46" y="86" width="8" height="8" fill="#1e293b" />

            <rect x="140" y="70" width="10" height="8" fill="#1e293b" />
            <rect x="158" y="70" width="18" height="8" fill="#0284c7" />
            <rect x="140" y="86" width="18" height="8" fill="#0284c7" />
            <rect x="166" y="86" width="10" height="8" fill="#1e293b" />

            <rect x="70" y="140" width="14" height="8" fill="#0284c7" />
            <rect x="92" y="140" width="10" height="8" fill="#1e293b" />
            <rect x="110" y="140" width="18" height="8" fill="#0284c7" />
            <rect x="70" y="156" width="8" height="8" fill="#1e293b" />
            <rect x="86" y="156" width="16" height="8" fill="#0284c7" />
            <rect x="110" y="156" width="8" height="8" fill="#1e293b" />
            <rect x="126" y="156" width="12" height="8" fill="#1e293b" />

            <rect x="140" y="140" width="8" height="8" fill="#1e293b" />
            <rect x="156" y="140" width="20" height="8" fill="#0284c7" />
            <rect x="148" y="156" width="14" height="8" fill="#1e293b" />
            <rect x="170" y="156" width="10" height="8" fill="#0284c7" />

            {/* Central MediTrace Emblem */}
            <circle cx="100" cy="100" r="22" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="100" cy="100" r="18" fill="#0284c7" />
            <rect x="97" y="89" width="6" height="22" rx="2" fill="#ffffff" />
            <rect x="89" y="97" width="22" height="6" rx="2" fill="#ffffff" />
          </svg>
        </div>

        {/* PATIENT IDENTIFICATION */}
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
          {patient.name}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
          Patient ID: {patient.id}
        </p>
        <span className="badge badge-success" style={{ marginBottom: '1.25rem' }}>
          Status: {patient.status}
        </span>

        <p className="qr-scan-instruction">
          "Scan this QR code to access emergency medical information."
        </p>

        <div className="health-actions-row">
          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ flex: 1 }}
            onClick={handleDownload}
          >
            <Download size={16} />
            <span>Download Health ID</span>
          </button>

          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ flex: 1 }}
            onClick={handleShare}
          >
            <Share2 size={16} />
            <span>Share Health ID</span>
          </button>
        </div>
      </div>

      {/* PRIVACY PROTECTION CARD */}
      <div className="privacy-card">
        <div className="privacy-icon">
          <ShieldCheck size={22} />
        </div>
        <div className="privacy-text">
          <h4>🔐 Privacy Protected</h4>
          <p>
            "Only authorized or emergency-access information is shared. Sensitive medical records remain protected."
          </p>
        </div>
      </div>

      {/* SIMULATE QR SCAN BUTTON */}
      <div className="simulate-qr-btn-wrap">
        <button 
          type="button" 
          className="btn btn-danger btn-lg" 
          style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.35)' }}
          onClick={() => navigate('/emergency')}
        >
          <AlertOctagon size={20} />
          <span>Simulate QR Scan</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
