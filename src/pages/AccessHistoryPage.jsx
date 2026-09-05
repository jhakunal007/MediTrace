import React from 'react';
import { History, ShieldCheck, Clock, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { demoAccessHistory } from '../data/patientData';

export default function AccessHistoryPage() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '1000px', margin: '0 auto' }}>
      <PageHeader
        title="Access History & Audit Logs"
        subtitle="Cryptographic verification logs tracking every external scan and authorized consultation."
        showBackToDashboard={true}
      />

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>Immutable Sovereign Log</h3>
          </div>
          <span className="badge badge-success">4 Events Recorded</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {demoAccessHistory.map((item) => (
            <div key={item.id} className="card" style={{ background: 'var(--bg-subtle)', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Clock size={16} color="var(--primary)" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)' }}>{item.event}</span>
                </div>
                <span className={`badge badge-${item.badgeColor}`}>{item.status}</span>
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <strong>Requester / System:</strong> {item.actor} ({item.location})
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <strong>Data Scope Disclosed:</strong> {item.dataAccessed}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem', marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Timestamp: {item.time}</span>
                <span>Audit Ref: <code>{item.id}</code></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
