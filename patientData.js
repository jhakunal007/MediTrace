// MediTrace - Reusable Patient Data Model (easily replacable with FastAPI backend endpoints)
export const initialPatientData = {
  id: "MT-102394",
  name: "Rahul Kumar",
  avatar: "RK",
  age: 22,
  gender: "Male",
  email: "rahul@example.com",
  phone: "+91 9876543210",
  bloodGroup: "B+",
  allergy: "Penicillin",
  knownAllergies: ["Penicillin", "Sulfonamides (mild)"],
  disease: "Diabetes",
  condition: "Type 2 Diabetes Mellitus",
  emergencyContact: "9876543210",
  emergencyContactName: "Priya Kumar (Sister)",
  status: "Active",
  dateOfBirth: "2004-03-15",
  address: "Sector 42, Cyber City, Gurugram, Haryana",
  insuranceProvider: "MediCare Shield Plus",
  policyNumber: "POL-9923841-A",

  // Current Medications
  currentMedications: [
    {
      name: "Metformin",
      dosage: "500 mg",
      frequency: "Twice Daily",
      duration: "30 Days",
      instructions: "Take with meals (Morning & Evening)",
      prescribedBy: "Dr. Arvind Sharma, MD"
    },
    {
      name: "Vitamin D3",
      dosage: "60,000 IU",
      frequency: "Weekly",
      duration: "8 Weeks",
      instructions: "Take once weekly with milk",
      prescribedBy: "Dr. Arvind Sharma, MD"
    }
  ],

  // Extracted Prescription details for OCR Demo
  extractedPrescription: {
    patient: "Rahul Kumar",
    disease: "Diabetes",
    medicine: "Metformin",
    dosage: "500 mg",
    frequency: "Twice Daily",
    duration: "30 Days",
    doctor: "Dr. Arvind Sharma, MD (Endocrinology)",
    rxDate: "Today, 10:15 AM",
    aiConfidence: "98.4%",
    aiInsight: "Metformin is commonly used to help control blood glucose levels in patients with type 2 diabetes by improving insulin sensitivity and reducing liver glucose production.",
    schedule: [
      { time: "Morning", instruction: "Metformin 500 mg (After Breakfast)" },
      { time: "Evening", instruction: "Metformin 500 mg (After Dinner)" }
    ]
  },

  // Dashboard Stats
  stats: {
    bloodGroup: "B+",
    allergies: "Penicillin",
    activeMedicines: 2,
    healthRecords: 6
  },

  // Recent Activity Log
  activities: [
    {
      id: 1,
      title: "Prescription uploaded",
      description: "Metformin 500 mg detected & verified",
      time: "2 hours ago",
      type: "upload",
      badge: "AI Processed"
    },
    {
      id: 2,
      title: "Health ID accessed",
      description: "Emergency QR information scanned & viewed",
      time: "Yesterday",
      type: "qr",
      badge: "Security Logged"
    },
    {
      id: 3,
      title: "Profile updated",
      description: "Emergency contact verification completed",
      time: "3 days ago",
      type: "profile",
      badge: "Verified"
    }
  ]
};

// Access History Events (Demo Data for Security & Privacy)
export const demoAccessHistory = [
  {
    id: "ACC-9041",
    event: "Emergency QR Scan",
    actor: "City Trauma Center (Dr. K. Patel)",
    location: "Gurugram, HR",
    time: "Today, 02:40 PM",
    dataAccessed: "Blood Group, Allergies, Emergency Contact",
    status: "Verified Emergency Access",
    badgeColor: "danger"
  },
  {
    id: "ACC-8912",
    event: "OCR Prescription Extraction",
    actor: "MediTrace Vision AI Engine v2.4",
    location: "Cloud Security Sandbox",
    time: "Today, 10:15 AM",
    dataAccessed: "Prescription Image (Metformin Rx)",
    status: "Encrypted Processing",
    badgeColor: "info"
  },
  {
    id: "ACC-7740",
    event: "Health Card Share",
    actor: "Primary Physician (Dr. Arvind Sharma)",
    location: "Endocrinology Clinic, Delhi",
    time: "Yesterday, 04:30 PM",
    dataAccessed: "Medication History & Conditions",
    status: "Consented Share",
    badgeColor: "success"
  },
  {
    id: "ACC-6621",
    event: "Biometric Authentication",
    actor: "Mobile Client (Pixel 8)",
    location: "Gurugram, HR",
    time: "3 days ago, 09:12 AM",
    dataAccessed: "Sovereign Health Vault Unlock",
    status: "Success (Biometric)",
    badgeColor: "info"
  }
];

// Helper functions for localStorage persistence across MediTrace
export function getStoredPatientData() {
  try {
    const saved = localStorage.getItem('meditrace_patient_data');
    if (saved) {
      return { ...initialPatientData, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Failed to load patient data from localStorage", e);
  }
  return initialPatientData;
}

export function saveStoredPatientData(data) {
  try {
    localStorage.setItem('meditrace_patient_data', JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save patient data to localStorage", e);
  }
}

export function getStoredNotifications() {
  const defaults = {
    medicineReminders: true,
    appointmentReminders: true,
    emergencyAlerts: true,
    prescriptionProcessing: true,
  };
  try {
    const saved = localStorage.getItem('meditrace_notifications');
    if (saved) {
      return { ...defaults, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Failed to load notifications from localStorage", e);
  }
  return defaults;
}

export function saveStoredNotifications(settings) {
  try {
    localStorage.setItem('meditrace_notifications', JSON.stringify(settings));
  } catch (e) {
    console.warn("Failed to save notifications to localStorage", e);
  }
}

export function getStoredEmergencySettings() {
  const defaults = {
    emergencyAccessEnabled: true,
    biometricLogin: true,
    fields: {
      bloodGroup: true,
      allergies: true,
      medicalConditions: true,
      currentMedicines: true,
      emergencyContact: true,
    }
  };
  try {
    const saved = localStorage.getItem('meditrace_emergency_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaults,
        ...parsed,
        fields: { ...defaults.fields, ...(parsed.fields || {}) }
      };
    }
  } catch (e) {
    console.warn("Failed to load emergency settings from localStorage", e);
  }
  return defaults;
}

export function saveStoredEmergencySettings(settings) {
  try {
    localStorage.setItem('meditrace_emergency_settings', JSON.stringify(settings));
  } catch (e) {
    console.warn("Failed to save emergency settings to localStorage", e);
  }
}

export function getStoredAppSettings() {
  const defaults = {
    darkMode: false,
    language: "English",
    dateFormat: "DD/MM/YYYY"
  };
  try {
    const saved = localStorage.getItem('meditrace_app_settings');
    if (saved) {
      return { ...defaults, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Failed to load app settings from localStorage", e);
  }
  return defaults;
}

export function saveStoredAppSettings(settings) {
  try {
    localStorage.setItem('meditrace_app_settings', JSON.stringify(settings));
  } catch (e) {
    console.warn("Failed to save app settings to localStorage", e);
  }
}

