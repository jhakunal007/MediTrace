import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Bell, 
  ShieldCheck, 
  ShieldAlert, 
  Heart, 
  QrCode, 
  Sliders, 
  Info, 
  LogOut, 
  Check, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  X, 
  RefreshCw, 
  Share2, 
  ExternalLink, 
  Fingerprint, 
  FileText, 
  Clock, 
  Moon, 
  Sun, 
  Globe, 
  Calendar,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { 
  getStoredPatientData, 
  saveStoredPatientData,
  getStoredNotifications,
  saveStoredNotifications,
  getStoredEmergencySettings,
  saveStoredEmergencySettings,
  getStoredAppSettings,
  saveStoredAppSettings,
  demoAccessHistory
} from '../data/patientData';

export default function Settings() {
  const navigate = useNavigate();

  // --------------------------------------------------------------------------
  // Core State with localStorage synchronization
  // --------------------------------------------------------------------------
  const [patient, setPatient] = useState(getStoredPatientData());
  const [notifications, setNotifications] = useState(getStoredNotifications());
  const [emergencySettings, setEmergencySettings] = useState(getStoredEmergencySettings());
  const [appSettings, setAppSettings] = useState(getStoredAppSettings());

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'editProfile' | 'changePassword' | 'logoutConfirm' | 'sharedData' | 'accessHistory' | 'manageEmergency' | 'manageQr' | 'about' | 'privacyPolicy' | 'terms'

  // Form states for modals
  const [profileForm, setProfileForm] = useState({
    name: patient.name,
    email: patient.email,
    phone: patient.phone || '+91 9876543210',
    age: patient.age,
    gender: patient.gender
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Editable Health Information State (Section 4)
  const [healthForm, setHealthForm] = useState({
    bloodGroup: patient.bloodGroup || 'B+',
    allergies: patient.allergy || 'Penicillin',
    medicalConditions: patient.disease || 'Diabetes',
    currentMedicines: (patient.currentMedications && patient.currentMedications[0]?.name) 
      ? `${patient.currentMedications[0].name} ${patient.currentMedications[0].dosage}` 
      : 'Metformin 500 mg',
    emergencyContact: patient.emergencyContact || '9876543210'
  });

  // Shared Data Categories (Section 3)
  const [sharedDataState, setSharedDataState] = useState({
    emergencyVitals: true,
    allergiesConditions: true,
    prescriptionHistory: true,
    labReports: false,
    insuranceDetails: false
  });

  // Initial Dark Mode sync on mount
  useEffect(() => {
    if (appSettings.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [appSettings.darkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------

  // Notifications Toggle Handler (Section 2)
  const handleNotificationToggle = (key, label) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    saveStoredNotifications(updated);
    showToast(`${label} turned ${updated[key] ? 'ON' : 'OFF'}`);
  };

  // Privacy & Emergency Access Toggle (Section 3 & 5)
  const handleEmergencyAccessToggle = () => {
    const updated = { 
      ...emergencySettings, 
      emergencyAccessEnabled: !emergencySettings.emergencyAccessEnabled 
    };
    setEmergencySettings(updated);
    saveStoredEmergencySettings(updated);
    showToast(`Emergency Access ${updated.emergencyAccessEnabled ? 'ENABLED' : 'DISABLED'}`);
  };

  // Biometric Login Toggle (Section 3)
  const handleBiometricToggle = () => {
    const updated = { 
      ...emergencySettings, 
      biometricLogin: !emergencySettings.biometricLogin 
    };
    setEmergencySettings(updated);
    saveStoredEmergencySettings(updated);
    showToast(`Biometric Authentication ${updated.biometricLogin ? 'ENABLED (Simulated)' : 'DISABLED'}`);
  };

  // Emergency Fields Toggle (Section 5)
  const handleEmergencyFieldChange = (field) => {
    const updatedFields = {
      ...emergencySettings.fields,
      [field]: !emergencySettings.fields[field]
    };
    const updated = { ...emergencySettings, fields: updatedFields };
    setEmergencySettings(updated);
    saveStoredEmergencySettings(updated);
    showToast('Emergency Information visibility updated');
  };

  // Save Health Information (Section 4)
  const handleSaveHealthInfo = (e) => {
    e.preventDefault();
    const updatedPatient = {
      ...patient,
      bloodGroup: healthForm.bloodGroup,
      allergy: healthForm.allergies,
      disease: healthForm.medicalConditions,
      emergencyContact: healthForm.emergencyContact,
      stats: {
        ...patient.stats,
        bloodGroup: healthForm.bloodGroup,
        allergies: healthForm.allergies
      }
    };
    setPatient(updatedPatient);
    saveStoredPatientData(updatedPatient);
    showToast('Health Information saved successfully');
  };

  // Save Profile Form Modal (Section 1)
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...patient,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      age: Number(profileForm.age),
      gender: profileForm.gender,
      avatar: profileForm.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'RK'
    };
    setPatient(updated);
    saveStoredPatientData(updated);
    setActiveModal(null);
    showToast('Account profile updated successfully');
  };

  // Change Password Modal (Section 1 & 3)
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setPasswordError('');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setActiveModal(null);
    showToast('Password changed successfully');
  };

  // Dark Mode Toggle (Section 7)
  const handleDarkModeToggle = () => {
    const newDarkMode = !appSettings.darkMode;
    const updated = { ...appSettings, darkMode: newDarkMode };
    setAppSettings(updated);
    saveStoredAppSettings(updated);

    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      showToast('Dark Mode Activated');
    } else {
      document.documentElement.removeAttribute('data-theme');
      showToast('Light Mode Activated');
    }
  };

  // Language & Date format (Section 7)
  const handleLanguageChange = (e) => {
    const updated = { ...appSettings, language: e.target.value };
    setAppSettings(updated);
    saveStoredAppSettings(updated);
    showToast(`Language set to ${e.target.value}`);
  };

  const handleDateFormatChange = (e) => {
    const updated = { ...appSettings, dateFormat: e.target.value };
    setAppSettings(updated);
    saveStoredAppSettings(updated);
    showToast(`Date format set to ${e.target.value}`);
  };

  // QR Regeneration simulation (Section 6)
  const handleRegenerateQR = () => {
    showToast('New QR cryptographic key rotated: MED-SEC-2026-X9B');
  };

  const handleShareHealthID = () => {
    showToast('Secure temporary Health ID link copied to clipboard');
  };

  return (
    <div className="settings-container animate-fade-in">
      <PageHeader
        title="Settings & Governance"
        subtitle="Manage your patient profile, security rules, notifications, emergency access permissions, and preferences."
        showBackToDashboard={true}
      />

      {/* Floating Status / Feedback Toast */}
      {toastMessage && (
        <div className="settings-toast-banner">
          <CheckCircle2 size={18} color="#34d399" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="settings-grid">
        {/* ==================================================================
            1. ACCOUNT SECTION
            ================================================================== */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-title-group">
              <div className="settings-card-icon blue">
                <User size={20} />
              </div>
              <div>
                <h3>Account</h3>
                <p>Personal identification & credentials</p>
              </div>
            </div>
            <span className="badge badge-info">Patient ID: {patient.id}</span>
          </div>

          <div className="settings-card-body">
            {/* Name & Avatar Preview */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Profile Name</span>
                <span className="settings-row-desc">{patient.name} ({patient.gender}, {patient.age} yrs)</span>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setProfileForm({
                    name: patient.name,
                    email: patient.email,
                    phone: patient.phone || '+91 9876543210',
                    age: patient.age,
                    gender: patient.gender
                  });
                  setActiveModal('editProfile');
                }}
              >
                Edit Profile
              </button>
            </div>

            {/* Email */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">
                  <Mail size={15} color="var(--primary)" />
                  <span>Email Address</span>
                </span>
                <span className="settings-row-desc">{patient.email}</span>
              </div>
              <span className="badge badge-success">Verified</span>
            </div>

            {/* Phone Number */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">
                  <Phone size={15} color="var(--primary)" />
                  <span>Phone Number</span>
                </span>
                <span className="settings-row-desc">{patient.phone || '+91 9876543210'}</span>
              </div>
              <span className="badge badge-success">Verified</span>
            </div>

            {/* Change Password */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">
                  <Lock size={15} color="var(--text-muted)" />
                  <span>Password & Authentication</span>
                </span>
                <span className="settings-row-desc">Last updated 24 days ago</span>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setPasswordError('');
                  setActiveModal('changePassword');
                }}
              >
                Change Password
              </button>
            </div>

            {/* Logout */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title" style={{ color: 'var(--emergency)' }}>
                  <LogOut size={15} />
                  <span>Sign Out of Session</span>
                </span>
                <span className="settings-row-desc">Terminate current authenticated patient session</span>
              </div>
              <button 
                type="button" 
                className="btn btn-danger btn-sm"
                onClick={() => setActiveModal('logoutConfirm')}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================
            2. NOTIFICATIONS SECTION
            ================================================================== */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-title-group">
              <div className="settings-card-icon orange">
                <Bell size={20} />
              </div>
              <div>
                <h3>Notifications</h3>
                <p>Alert preferences & clinical reminders</p>
              </div>
            </div>
            <span className="badge badge-info">Stored Locally</span>
          </div>

          <div className="settings-card-body">
            {/* Medicine Reminders */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Medicine Reminders</span>
                <span className="settings-row-desc">Daily dosage alerts for active prescriptions (e.g. Metformin)</span>
              </div>
              <label className="settings-switch" aria-label="Toggle Medicine Reminders">
                <input 
                  type="checkbox" 
                  checked={notifications.medicineReminders}
                  onChange={() => handleNotificationToggle('medicineReminders', 'Medicine Reminders')}
                />
                <span className="settings-slider"></span>
              </label>
            </div>

            {/* Appointment Reminders */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Appointment Reminders</span>
                <span className="settings-row-desc">Notifications for upcoming physician consults & clinic checkups</span>
              </div>
              <label className="settings-switch" aria-label="Toggle Appointment Reminders">
                <input 
                  type="checkbox" 
                  checked={notifications.appointmentReminders}
                  onChange={() => handleNotificationToggle('appointmentReminders', 'Appointment Reminders')}
                />
                <span className="settings-slider"></span>
              </label>
            </div>

            {/* Emergency Alerts */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Emergency Alerts</span>
                <span className="settings-row-desc">Instant SMS & push notice whenever your QR code is scanned</span>
              </div>
              <label className="settings-switch" aria-label="Toggle Emergency Alerts">
                <input 
                  type="checkbox" 
                  checked={notifications.emergencyAlerts}
                  onChange={() => handleNotificationToggle('emergencyAlerts', 'Emergency Alerts')}
                />
                <span className="settings-slider danger-slider"></span>
              </label>
            </div>

            {/* Prescription Processing Notifications */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Prescription Processing</span>
                <span className="settings-row-desc">Alerts when AI OCR analysis and clinical extraction complete</span>
              </div>
              <label className="settings-switch" aria-label="Toggle Prescription Processing Notifications">
                <input 
                  type="checkbox" 
                  checked={notifications.prescriptionProcessing}
                  onChange={() => handleNotificationToggle('prescriptionProcessing', 'Prescription Processing Notifications')}
                />
                <span className="settings-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* ==================================================================
            3. PRIVACY & SECURITY
            ================================================================== */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-title-group">
              <div className="settings-card-icon green">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3>Privacy & Security</h3>
                <p>Data access authorization & cryptographic protection</p>
              </div>
            </div>
            <span className="badge badge-success">Zero-Knowledge</span>
          </div>

          <div className="settings-card-body">
            {/* Emergency Access Switch */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Emergency Access</span>
                <span className="settings-row-desc">
                  Allow first responders to view life-saving vitals in critical situations. Sensitive records remain locked.
                </span>
              </div>
              <label className="settings-switch" aria-label="Toggle Emergency Access">
                <input 
                  type="checkbox" 
                  checked={emergencySettings.emergencyAccessEnabled}
                  onChange={handleEmergencyAccessToggle}
                />
                <span className="settings-slider danger-slider"></span>
              </label>
            </div>

            {/* Biometric Login */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">
                  <Fingerprint size={16} color="var(--primary)" />
                  <span>Biometric Login</span>
                </span>
                <span className="settings-row-desc">Unlock health vault with TouchID / FaceID (Simulated)</span>
              </div>
              <label className="settings-switch" aria-label="Toggle Biometric Login">
                <input 
                  type="checkbox" 
                  checked={emergencySettings.biometricLogin}
                  onChange={handleBiometricToggle}
                />
                <span className="settings-slider"></span>
              </label>
            </div>

            {/* Manage Shared Data */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Manage Shared Data</span>
                <span className="settings-row-desc">Control which clinical categories are available to providers</span>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setActiveModal('sharedData')}
              >
                Configure Data
              </button>
            </div>

            {/* Access History */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">
                  <Clock size={16} color="var(--text-muted)" />
                  <span>Access History</span>
                </span>
                <span className="settings-row-desc">Audit logs of all emergency and doctor consultations</span>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setActiveModal('accessHistory')}
              >
                View Logs
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================
            4. HEALTH INFORMATION (Editable)
            ================================================================== */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-title-group">
              <div className="settings-card-icon red">
                <Heart size={20} />
              </div>
              <div>
                <h3>Health Information</h3>
                <p>Essential medical facts synced with Emergency & Profile</p>
              </div>
            </div>
            <span className="badge badge-info">Auto-Sync</span>
          </div>

          <div className="settings-card-body">
            <form onSubmit={handleSaveHealthInfo} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Blood Group</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={healthForm.bloodGroup}
                    onChange={(e) => setHealthForm({ ...healthForm, bloodGroup: e.target.value })}
                    placeholder="e.g. B+"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Known Allergies</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={healthForm.allergies}
                    onChange={(e) => setHealthForm({ ...healthForm, allergies: e.target.value })}
                    placeholder="e.g. Penicillin"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Medical Conditions</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={healthForm.medicalConditions}
                  onChange={(e) => setHealthForm({ ...healthForm, medicalConditions: e.target.value })}
                  placeholder="e.g. Diabetes"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Current Medicines</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={healthForm.currentMedicines}
                  onChange={(e) => setHealthForm({ ...healthForm, currentMedicines: e.target.value })}
                  placeholder="e.g. Metformin 500 mg"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Emergency Contact Number</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={healthForm.emergencyContact}
                  onChange={(e) => setHealthForm({ ...healthForm, emergencyContact: e.target.value })}
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Check size={14} />
                  <span>Save Health Information</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ==================================================================
            5. EMERGENCY ACCESS SETTINGS (Dedicated Card)
            ================================================================== */}
        <div className="settings-card settings-grid-full">
          <div className="settings-card-header" style={{ background: emergencySettings.emergencyAccessEnabled ? '#fffbfb' : 'inherit' }}>
            <div className="settings-card-title-group">
              <div className="settings-card-icon red">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3>Emergency Access Settings</h3>
                <p>Manage visible critical medical data when QR code is scanned</p>
              </div>
            </div>
            <span className={`badge ${emergencySettings.emergencyAccessEnabled ? 'badge-danger' : 'badge-warning'}`}>
              {emergencySettings.emergencyAccessEnabled ? 'SOS Ready' : 'Access Off'}
            </span>
          </div>

          <div className="settings-card-body">
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title" style={{ fontSize: '1.05rem' }}>
                  Emergency Access [{emergencySettings.emergencyAccessEnabled ? 'ON' : 'OFF'}]
                </span>
                <span className="settings-row-desc">
                  "Allow authorized emergency access to essential medical information when required."
                </span>
              </div>
              <label className="settings-switch" aria-label="Toggle Emergency Access Mode">
                <input 
                  type="checkbox" 
                  checked={emergencySettings.emergencyAccessEnabled}
                  onChange={handleEmergencyAccessToggle}
                />
                <span className="settings-slider danger-slider"></span>
              </label>
            </div>

            {/* Selectable Emergency Fields */}
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Visible Emergency Information Fields
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Choose what first responders can view
                </span>
              </div>

              <div className="emergency-fields-grid">
                <label className={`emergency-field-checkbox ${emergencySettings.fields.bloodGroup ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={emergencySettings.fields.bloodGroup}
                    onChange={() => handleEmergencyFieldChange('bloodGroup')}
                  />
                  <span>☑ Blood Group ({healthForm.bloodGroup})</span>
                </label>

                <label className={`emergency-field-checkbox ${emergencySettings.fields.allergies ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={emergencySettings.fields.allergies}
                    onChange={() => handleEmergencyFieldChange('allergies')}
                  />
                  <span>☑ Allergies ({healthForm.allergies})</span>
                </label>

                <label className={`emergency-field-checkbox ${emergencySettings.fields.medicalConditions ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={emergencySettings.fields.medicalConditions}
                    onChange={() => handleEmergencyFieldChange('medicalConditions')}
                  />
                  <span>☑ Medical Conditions ({healthForm.medicalConditions})</span>
                </label>

                <label className={`emergency-field-checkbox ${emergencySettings.fields.currentMedicines ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={emergencySettings.fields.currentMedicines}
                    onChange={() => handleEmergencyFieldChange('currentMedicines')}
                  />
                  <span>☑ Current Medicines ({healthForm.currentMedicines})</span>
                </label>

                <label className={`emergency-field-checkbox ${emergencySettings.fields.emergencyContact ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={emergencySettings.fields.emergencyContact}
                    onChange={() => handleEmergencyFieldChange('emergencyContact')}
                  />
                  <span>☑ Emergency Contact ({healthForm.emergencyContact})</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Preferences are saved automatically to your local health profile.
              </span>
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate('/emergency')}
              >
                <ExternalLink size={14} />
                <span>Preview Emergency Screen</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================
            6. HEALTH ID SECTION
            ================================================================== */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-title-group">
              <div className="settings-card-icon purple">
                <QrCode size={20} />
              </div>
              <div>
                <h3>Health ID & Sovereign Key</h3>
                <p>Connected to existing QR identity system</p>
              </div>
            </div>
            <span className="badge badge-info">ID: {patient.id}</span>
          </div>

          <div className="settings-card-body">
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">View Health ID</span>
                <span className="settings-row-desc">Open your primary digital QR health card</span>
              </div>
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/health-id')}
              >
                View Health ID
              </button>
            </div>

            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Manage QR Code</span>
                <span className="settings-row-desc">Configure QR ECC error correction & resolution</span>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setActiveModal('manageQr')}
              >
                Manage QR
              </button>
            </div>

            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Regenerate QR</span>
                <span className="settings-row-desc">Rotate encryption key if previous badge was compromised</span>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={handleRegenerateQR}
              >
                <RefreshCw size={14} />
                <span>Regenerate</span>
              </button>
            </div>

            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Share Health ID</span>
                <span className="settings-row-desc">Generate temporary cryptographic share link</span>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={handleShareHealthID}
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================
            7. APP PREFERENCES
            ================================================================== */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-title-group">
              <div className="settings-card-icon indigo">
                <Sliders size={20} />
              </div>
              <div>
                <h3>App Preferences</h3>
                <p>Theme appearance, localization & formats</p>
              </div>
            </div>
            <span className="badge badge-info">{appSettings.darkMode ? 'Dark Theme' : 'Light Theme'}</span>
          </div>

          <div className="settings-card-body">
            {/* Dark Mode Toggle */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">
                  {appSettings.darkMode ? <Moon size={16} color="#38bdf8" /> : <Sun size={16} color="#f59e0b" />}
                  <span>Dark Mode</span>
                </span>
                <span className="settings-row-desc">Toggle sleek dark mode theme across MediTrace</span>
              </div>
              <label className="settings-switch" aria-label="Toggle Dark Mode">
                <input 
                  type="checkbox" 
                  checked={appSettings.darkMode}
                  onChange={handleDarkModeToggle}
                />
                <span className="settings-slider"></span>
              </label>
            </div>

            {/* Language Selector */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">
                  <Globe size={16} color="var(--primary)" />
                  <span>Language</span>
                </span>
                <span className="settings-row-desc">Portal interface language preference</span>
              </div>
              <select 
                className="settings-select"
                value={appSettings.language}
                onChange={handleLanguageChange}
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
              </select>
            </div>

            {/* Date Format Selector */}
            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">
                  <Calendar size={16} color="var(--text-muted)" />
                  <span>Date Format</span>
                </span>
                <span className="settings-row-desc">Display convention for health records & logs</span>
              </div>
              <select 
                className="settings-select"
                value={appSettings.dateFormat}
                onChange={handleDateFormatChange}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              </select>
            </div>
          </div>
        </div>

        {/* ==================================================================
            8. ABOUT MEDiTRACE
            ================================================================== */}
        <div className="settings-card settings-grid-full">
          <div className="settings-card-header">
            <div className="settings-card-title-group">
              <div className="settings-card-icon blue">
                <Info size={20} />
              </div>
              <div>
                <h3>About MEDiTRACE</h3>
                <p>Platform specifications, compliance & legal documentation</p>
              </div>
            </div>
            <span className="badge badge-success">v1.0.0 Stable</span>
          </div>

          <div className="settings-card-body">
            <div className="settings-row-item" style={{ cursor: 'pointer' }} onClick={() => setActiveModal('about')}>
              <div className="settings-row-info">
                <span className="settings-row-title">About MediTrace</span>
                <span className="settings-row-desc">
                  "AI-Powered Secure Healthcare Record & Emergency Access Platform"
                </span>
              </div>
              <span className="badge badge-info">Learn More</span>
            </div>

            <div className="settings-row-item" style={{ cursor: 'pointer' }} onClick={() => setActiveModal('privacyPolicy')}>
              <div className="settings-row-info">
                <span className="settings-row-title">Privacy Policy</span>
                <span className="settings-row-desc">
                  Zero-knowledge encryption standards, HIPAA alignment & patient data confidentiality
                </span>
              </div>
              <span className="badge badge-info">Read Policy</span>
            </div>

            <div className="settings-row-item" style={{ cursor: 'pointer' }} onClick={() => setActiveModal('terms')}>
              <div className="settings-row-info">
                <span className="settings-row-title">Terms & Conditions</span>
                <span className="settings-row-desc">
                  Terms of clinical prototype usage, liability limitations & emergency responder guidelines
                </span>
              </div>
              <span className="badge badge-info">View Terms</span>
            </div>

            <div className="settings-row-item">
              <div className="settings-row-info">
                <span className="settings-row-title">Application Version</span>
                <span className="settings-row-desc">Healthcare Hackathon MVP Release</span>
              </div>
              <span className="badge badge-success">App Version: 1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MODALS & PANELS
          ==================================================================== */}

      {/* Modal 1: Edit Profile Form */}
      {activeModal === 'editProfile' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>
                <User size={20} color="var(--primary)" />
                <span>Edit Patient Profile</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="settings-modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={profileForm.name} 
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={profileForm.email} 
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    value={profileForm.phone} 
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={profileForm.age} 
                      onChange={(e) => setProfileForm({ ...profileForm, age: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select 
                      className="form-input" 
                      value={profileForm.gender} 
                      onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Change Password */}
      {activeModal === 'changePassword' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>
                <Lock size={20} color="var(--primary)" />
                <span>Change Password</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="settings-modal-body">
                {passwordError && (
                  <div className="card" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b', padding: '0.75rem', fontSize: '0.85rem' }}>
                    <AlertTriangle size={16} /> {passwordError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="form-input" 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="form-input" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter at least 6 characters"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="form-input" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Re-enter new password"
                    required
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{showPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
                </div>
              </div>

              <div className="settings-modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Logout Confirmation */}
      {activeModal === 'logoutConfirm' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3 style={{ color: 'var(--emergency)' }}>
                <AlertTriangle size={20} />
                <span>Confirm Sign Out</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="settings-modal-body">
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Are you sure you want to log out of <strong>MediTrace</strong>? You will need to sign in again with your credentials to access your health vault.
              </p>
            </div>

            <div className="settings-modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActiveModal(null)}>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-danger btn-sm"
                onClick={() => {
                  setActiveModal(null);
                  navigate('/');
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Manage Shared Data */}
      {activeModal === 'sharedData' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>
                <ShieldCheck size={20} color="var(--primary)" />
                <span>Manage Shared Data Categories</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="settings-modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Select which clinical categories are shared during authorized doctor consults or clinic visits:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label className="emergency-field-checkbox" style={{ justifyContent: 'space-between' }}>
                  <span>Emergency Vitals & Blood Type</span>
                  <input 
                    type="checkbox" 
                    checked={sharedDataState.emergencyVitals}
                    onChange={() => setSharedDataState({ ...sharedDataState, emergencyVitals: !sharedDataState.emergencyVitals })}
                  />
                </label>

                <label className="emergency-field-checkbox" style={{ justifyContent: 'space-between' }}>
                  <span>Allergies & Chronic Conditions</span>
                  <input 
                    type="checkbox" 
                    checked={sharedDataState.allergiesConditions}
                    onChange={() => setSharedDataState({ ...sharedDataState, allergiesConditions: !sharedDataState.allergiesConditions })}
                  />
                </label>

                <label className="emergency-field-checkbox" style={{ justifyContent: 'space-between' }}>
                  <span>Prescription & Medication History</span>
                  <input 
                    type="checkbox" 
                    checked={sharedDataState.prescriptionHistory}
                    onChange={() => setSharedDataState({ ...sharedDataState, prescriptionHistory: !sharedDataState.prescriptionHistory })}
                  />
                </label>

                <label className="emergency-field-checkbox" style={{ justifyContent: 'space-between' }}>
                  <span>Diagnostic Lab Reports (Restricted)</span>
                  <input 
                    type="checkbox" 
                    checked={sharedDataState.labReports}
                    onChange={() => setSharedDataState({ ...sharedDataState, labReports: !sharedDataState.labReports })}
                  />
                </label>

                <label className="emergency-field-checkbox" style={{ justifyContent: 'space-between' }}>
                  <span>Insurance & Billing Records</span>
                  <input 
                    type="checkbox" 
                    checked={sharedDataState.insuranceDetails}
                    onChange={() => setSharedDataState({ ...sharedDataState, insuranceDetails: !sharedDataState.insuranceDetails })}
                  />
                </label>
              </div>
            </div>

            <div className="settings-modal-footer">
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setActiveModal(null);
                  showToast('Data sharing preferences updated');
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: Access History Logs */}
      {activeModal === 'accessHistory' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>
                <Clock size={20} color="var(--primary)" />
                <span>Security Access History</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="settings-modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Immutable audit ledger recording every query or scan against your Sovereign Health Record:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {demoAccessHistory.map((item) => (
                  <div key={item.id} className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>{item.event}</span>
                      <span className={`badge badge-${item.badgeColor}`}>{item.status}</span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <strong>Actor:</strong> {item.actor} • {item.location}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <strong>Data:</strong> {item.dataAccessed}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                      {item.time} • Ref: {item.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="settings-modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActiveModal(null)}>
                Close Audit Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 6: Manage QR Details */}
      {activeModal === 'manageQr' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>
                <QrCode size={20} color="var(--primary)" />
                <span>Manage QR Code Configuration</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="settings-modal-body">
              <div className="card" style={{ background: 'var(--bg-subtle)', textAlign: 'center', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Current Public Identifier</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>MED-SEC-2026-X9</div>
                <span className="badge badge-success" style={{ marginTop: '0.5rem' }}>Status: Active & Authenticated</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                <div className="settings-row-item">
                  <span>Error Correction Level</span>
                  <span className="badge badge-info">Level H (30% Recovery)</span>
                </div>
                <div className="settings-row-item">
                  <span>Payload Encryption</span>
                  <span className="badge badge-success">AES-256 GCM</span>
                </div>
                <div className="settings-row-item">
                  <span>Dynamic Key Expiry</span>
                  <span className="badge badge-info">Never (Sovereign ID)</span>
                </div>
              </div>
            </div>

            <div className="settings-modal-footer">
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setActiveModal(null);
                  navigate('/health-id');
                }}
              >
                Go to Health ID Screen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 7: About MediTrace */}
      {activeModal === 'about' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>
                <Sparkles size={20} color="var(--primary)" />
                <span>About MEDiTRACE</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="settings-modal-body" style={{ lineHeight: 1.6, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <p>
                <strong>MEDiTRACE</strong> is an AI-Powered Secure Healthcare Record & Emergency Access Platform designed to solve the critical problem of inaccessible medical history during acute trauma and emergencies.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                By pairing Optical Character Recognition (OCR) for prescription digitization with decentralized Sovereign QR Health Identity cards, MediTrace ensures that life-saving vitals are accessible within seconds by first responders while keeping full historical records encrypted and consented.
              </p>
              <div className="card" style={{ background: 'var(--bg-subtle)', marginTop: '0.75rem', padding: '0.85rem 1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>Hackathon MVP Architecture:</span>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  React 18 • Vite • Client Storage Engine • FastAPI Ready API Schema • Zero-Knowledge Design
                </p>
              </div>
            </div>

            <div className="settings-modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setActiveModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 8: Privacy Policy */}
      {activeModal === 'privacyPolicy' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>
                <ShieldCheck size={20} color="var(--primary)" />
                <span>Privacy Policy</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="settings-modal-body" style={{ lineHeight: 1.6, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <p><strong>1. Data Sovereignty:</strong> Your medical records are owned by you. In this prototype, data resides in your browser's encrypted local storage sandbox.</p>
              <p style={{ marginTop: '0.5rem' }}><strong>2. Emergency Disclosure:</strong> When Emergency Access is enabled, only explicitly authorized vitals (Blood Type, Critical Allergies, Emergency Contact) are unmasked upon scanning.</p>
              <p style={{ marginTop: '0.5rem' }}><strong>3. AI Processing:</strong> Prescriptions uploaded for OCR entity recognition are processed securely without retaining training copies.</p>
            </div>

            <div className="settings-modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setActiveModal(null)}>
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 9: Terms & Conditions */}
      {activeModal === 'terms' && (
        <div className="settings-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>
                <FileText size={20} color="var(--primary)" />
                <span>Terms & Conditions</span>
              </h3>
              <button type="button" className="settings-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="settings-modal-body" style={{ lineHeight: 1.6, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <p><strong>Clinical Prototype Disclaimer:</strong> MEDiTRACE is a healthcare hackathon MVP demonstration. AI entity extractions and medication assistant summaries must be verified with licensed physicians before clinical administration.</p>
              <p style={{ marginTop: '0.5rem' }}><strong>Emergency Use:</strong> In real-life medical emergencies, always contact official local emergency dispatch (e.g. 112 / 911).</p>
            </div>

            <div className="settings-modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setActiveModal(null)}>
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
