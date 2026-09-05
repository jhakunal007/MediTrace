import React from 'react';
import { Pill, Clock, AlertCircle, Plus, Calendar, UserCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { getStoredPatientData } from '../data/patientData';

export default function Medicines() {
  const patient = getStoredPatientData();
  const medicines = patient.currentMedications || [];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '1000px', margin: '0 auto' }}>
      <PageHeader
        title="Active Medications"
        subtitle="Current prescriptions, dosage frequencies, and AI schedule reminders."
        showBackToDashboard={true}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {medicines.map((med, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem', borderLeft: '4px solid var(--primary)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Pill size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{med.name}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{med.dosage}</span>
                  </div>
                </div>
                <span className="badge badge-success">Active Rx</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Clock size={15} color="var(--text-muted)" />
                  <span><strong>Frequency:</strong> {med.frequency}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Calendar size={15} color="var(--text-muted)" />
                  <span><strong>Duration:</strong> {med.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <UserCheck size={15} color="var(--text-muted)" />
                  <span><strong>Prescribed by:</strong> {med.prescribedBy}</span>
                </div>
              </div>

              <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: '8px', marginTop: '0.85rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <strong>Instructions:</strong> {med.instructions}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified via MediTrace OCR</span>
              <span className="badge badge-info">Twice Daily Sync</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
