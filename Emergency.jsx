import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Droplet, 
  Pill, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Lock, 
  ArrowLeft,
  PhoneCall,
  Activity,
  AlertCircle
} from 'lucide-react';
import { initialPatientData, getStoredPatientData, getStoredEmergencySettings } from '../data/patientData';

export default function Emergency() {
  const navigate = useNavigate();
  const [patient] = useState(getStoredPatientData());
  const [emergencySettings] = useState(getStoredEmergencySettings());


  const [currentTime, setCurrentTime] = useState('');
  const [callInitiated, setCallInitiated] = useState(false);

  useEffect(() => {
    // Generate formatted current local time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }) + ', ' + 
        now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCallContact = () => {
    setCallInitiated(true);
    setTimeout(() => setCallInitiated(false), 4000);
  };

  return (
    <div className="emergency-page animate-fade-in">
      {/* URGENT EMERGENCY ALERT BANNER */}
      <div className="emergency-alert-banner">
        <div className="emergency-alert-left">
          <div className="pulse-emergency-beacon">
            <AlertTriangle size={28} />
          </div>
          <div>
            <h1>🚨 Emergency Medical Access</h1>
            <p>"Essential medical information for urgent situations."</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--emergency-dark)' }}>
            {patient.name}
          </span>
          <span className="badge badge-danger">
            Patient ID: {patient.id}
          </span>
        </div>
      </div>

      {!emergencySettings.emergencyAccessEnabled && (
        <div className="card" style={{ background: '#fffbeb', border: '1.5px solid #fde68a', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={18} />
            <span>Emergency Access is currently marked as <strong>DISABLED</strong> in Settings. Only simulated preview is active.</span>
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate('/settings')}>
            Configure in Settings
          </button>
        </div>
      )}

      {callInitiated && (
        <div className="card" style={{ background: '#fef2f2', border: '1.5px solid #ef4444', color: '#991b1b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <PhoneCall size={20} className="animate-spin" />
            <span><strong>Dialing Primary Emergency Contact:</strong> {patient.emergencyContact} ({patient.emergencyContactName})...</span>
          </div>
          <span className="badge badge-danger">SOS Outbound</span>
        </div>
      )}

      {/* CRITICAL INFORMATION CARDS */}
      <div>
        <div className="section-title-wrap">
          <h2 className="section-title" style={{ color: 'var(--emergency-dark)' }}>
            <ShieldAlert size={20} color="var(--emergency)" />
            <span>Critical Emergency Vitals</span>
          </h2>
          <span className="badge badge-danger">Immediate Action Required</span>
        </div>

        <div className="emergency-critical-grid">
          {/* Blood Group */}
          <div className="emergency-critical-card">
            <div>
              <span className="emergency-card-label">Blood Group</span>
              <div className="emergency-card-value" style={{ color: '#0f172a' }}>
                {patient.bloodGroup}
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Compatible: O-, B+, B-
            </span>
          </div>

          {/* Allergy */}
          <div className="emergency-critical-card highlight-allergy">
            <div>
              <span className="emergency-card-label" style={{ color: '#b91c1c' }}>Allergy Alert</span>
              <div className="emergency-card-value danger-text">
                <AlertCircle size={22} />
                <span>{patient.allergy}</span>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 600 }}>
              ⚠ DO NOT ADMINISTER PENICILLIN OR DERIVATIVES
            </span>
          </div>

          {/* Current Medication */}
          <div className="emergency-critical-card">
            <div>
              <span className="emergency-card-label">Current Medication</span>
              <div className="emergency-card-value" style={{ fontSize: '1.4rem', color: 'var(--primary-hover)' }}>
                Metformin 500 mg
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Twice Daily • Active Prescription
            </span>
          </div>

          {/* Emergency Contact */}
          <div className="emergency-critical-card">
            <div>
              <span className="emergency-card-label">Emergency Contact</span>
              <div className="emergency-card-value" style={{ fontSize: '1.35rem', color: '#0f172a' }}>
                {patient.emergencyContact}
              </div>
            </div>
            <button 
              type="button" 
              className="btn btn-danger btn-sm"
              onClick={handleCallContact}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <PhoneCall size={14} />
              <span>Call Contact Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* EMERGENCY SUMMARY TABLE */}
      <div className="emergency-summary-card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="var(--emergency)" />
          <span>Important Medical Information Summary</span>
        </h3>

        <div className="emergency-summary-table">
          <div className="summary-row">
            <div className="summary-row-label">Blood Group:</div>
            <div className="summary-row-val">{patient.bloodGroup}</div>
          </div>

          <div className="summary-row">
            <div className="summary-row-label">Known Allergy:</div>
            <div className="summary-row-val" style={{ color: 'var(--emergency)' }}>
              ⚠ {patient.allergy} (Severe Anaphylactic Risk)
            </div>
          </div>

          <div className="summary-row">
            <div className="summary-row-label">Current Medication:</div>
            <div className="summary-row-val">Metformin 500 mg (Twice Daily)</div>
          </div>

          <div className="summary-row">
            <div className="summary-row-label">Recent Condition:</div>
            <div className="summary-row-val">{patient.disease} (Type 2 Mellitus)</div>
          </div>

          <div className="summary-row">
            <div className="summary-row-label">Emergency Contact:</div>
            <div className="summary-row-val">
              {patient.emergencyContact} — {patient.emergencyContactName}
            </div>
          </div>
        </div>
      </div>

      {/* ACCESS AUDIT STATUS */}
      <div className="access-audit-card">
        <div className="audit-left">
          <CheckCircle2 size={20} color="var(--success)" />
          <div>
            <div>✓ Emergency access granted</div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              "Access logged for security."
            </span>
          </div>
        </div>

        <div className="audit-right">
          <div>
            <strong>Access Time:</strong> {currentTime || 'Live sync...'}
          </div>
          <div>
            <strong>Access Type:</strong> Emergency QR Access
          </div>
        </div>
      </div>

      {/* PRIVACY MESSAGE & RETURN ACTION */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          <Lock size={16} color="var(--text-muted)" />
          <span>"Only essential emergency information is displayed. Full medical records require authorized access."</span>
        </div>

        <button 
          type="button" 
          className="btn btn-secondary btn-lg" 
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
