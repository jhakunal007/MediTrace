import React, { useState } from 'react';
import { 
  User, 
  ShieldAlert, 
  Mail, 
  Phone, 
  Calendar, 
  Droplet, 
  AlertTriangle, 
  Edit3, 
  Check, 
  Info,
  Heart
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { initialPatientData } from '../data/patientData';

export default function Profile() {
  const [patient, setPatient] = useState(initialPatientData);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    email: patient.email,
    emergencyContact: patient.emergencyContact,
    bloodGroup: patient.bloodGroup,
    allergy: patient.allergy
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes locally
      setPatient(prev => ({ ...prev, ...editFormData }));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (field, val) => {
    setEditFormData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="profile-container animate-fade-in">
      <PageHeader 
        title="My Profile" 
        subtitle="Manage personal identification, vital clinical facts, and emergency contacts."
        showBackToDashboard={true}
        actions={
          <button 
            type="button" 
            className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
            onClick={handleEditToggle}
          >
            {isEditing ? (
              <>
                <Check size={16} />
                <span>Save Profile Changes</span>
              </>
            ) : (
              <>
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        }
      />

      {showToast && (
        <div className="card" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.25rem' }}>
          <Info size={18} />
          <span>Profile changes saved locally. Profile editing will be connected to FastAPI backend in production.</span>
        </div>
      )}

      {/* Profile Hero Card */}
      <div className="profile-hero-card">
        <div className="profile-hero-left">
          <div className="profile-avatar-large">{patient.avatar}</div>
          <div className="profile-hero-info">
            <h2>{patient.name}</h2>
            <div className="profile-hero-meta">
              <span className="badge badge-info">ID: {patient.id}</span>
              <span className="badge badge-success">Status: {patient.status}</span>
              <span className="badge badge-warning">Condition: {patient.disease}</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Universal Health Key</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>MED-SEC-2026-X9</div>
          </div>
        </div>
      </div>

      <div className="profile-sections-grid">
        {/* Patient General Info */}
        <div className="card">
          <div className="section-title-wrap" style={{ marginBottom: '0.5rem' }}>
            <h3 className="section-title">
              <User size={18} color="#0284c7" />
              <span>Personal Information</span>
            </h3>
            {isEditing && <span className="badge badge-warning">Editing Enabled</span>}
          </div>

          <div className="info-grid">
            <div className="info-field">
              <div className="info-field-label">Full Name</div>
              {isEditing ? (
                <input 
                  type="text" 
                  className="form-input" 
                  value={editFormData.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{ marginTop: '0.35rem' }}
                />
              ) : (
                <div className="info-field-value">{patient.name}</div>
              )}
            </div>

            <div className="info-field">
              <div className="info-field-label">Patient ID</div>
              <div className="info-field-value">{patient.id}</div>
            </div>

            <div className="info-field">
              <div className="info-field-label">Age</div>
              {isEditing ? (
                <input 
                  type="number" 
                  className="form-input" 
                  value={editFormData.age} 
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  style={{ marginTop: '0.35rem' }}
                />
              ) : (
                <div className="info-field-value">{patient.age} years</div>
              )}
            </div>

            <div className="info-field">
              <div className="info-field-label">Gender</div>
              {isEditing ? (
                <select 
                  className="form-input" 
                  value={editFormData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  style={{ marginTop: '0.35rem' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div className="info-field-value">{patient.gender}</div>
              )}
            </div>

            <div className="info-field">
              <div className="info-field-label">Email Address</div>
              {isEditing ? (
                <input 
                  type="email" 
                  className="form-input" 
                  value={editFormData.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{ marginTop: '0.35rem' }}
                />
              ) : (
                <div className="info-field-value">{patient.email}</div>
              )}
            </div>

            <div className="info-field">
              <div className="info-field-label">Primary Condition</div>
              <div className="info-field-value">{patient.disease}</div>
            </div>
          </div>
        </div>

        {/* Emergency Information Box */}
        <div className="emergency-info-card">
          <div className="emergency-info-card-header">
            <ShieldAlert size={22} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Emergency Information</h3>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#991b1b', marginBottom: '1.25rem' }}>
            This data is shared instantly during critical situations via your Secure Health QR.
          </p>

          <div className="emergency-info-list">
            <div className="emergency-info-row">
              <div className="label">Blood Group</div>
              {isEditing ? (
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ width: '80px', padding: '0.4rem', textAlign: 'center' }}
                  value={editFormData.bloodGroup} 
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                />
              ) : (
                <div className="val">{patient.bloodGroup}</div>
              )}
            </div>

            <div className="emergency-info-row">
              <div className="label">Known Allergy</div>
              {isEditing ? (
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ width: '130px', padding: '0.4rem' }}
                  value={editFormData.allergy} 
                  onChange={(e) => handleInputChange('allergy', e.target.value)}
                />
              ) : (
                <div className="val">⚠ {patient.allergy}</div>
              )}
            </div>

            <div className="emergency-info-row">
              <div className="label">Emergency Contact</div>
              {isEditing ? (
                <input 
                  type="tel" 
                  className="form-input" 
                  style={{ width: '140px', padding: '0.4rem' }}
                  value={editFormData.emergencyContact} 
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                />
              ) : (
                <div className="val">{patient.emergencyContact}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
