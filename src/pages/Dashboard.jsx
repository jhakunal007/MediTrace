import React from 'react';
import { 
  Droplet, 
  AlertTriangle, 
  Pill, 
  FolderHeart, 
  UploadCloud, 
  QrCode, 
  ShieldAlert, 
  UserCircle2, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  FileText
} from 'lucide-react';
import StatCard from '../components/StatCard';
import ActionCard from '../components/ActionCard';
import PageHeader from '../components/PageHeader';
import { initialPatientData } from '../data/patientData';

export default function Dashboard() {
  const patient = initialPatientData;

  return (
    <div className="dashboard-grid animate-fade-in">
      <PageHeader 
        title="Patient Health Dashboard"
        subtitle={`Welcome back, ${patient.name}. Your medical records and emergency identifiers are synchronized.`}
        badge="Live Status: Synchronized"
      />

      {/* HEALTH SUMMARY STATS */}
      <section>
        <div className="section-title-wrap">
          <h2 className="section-title">
            <FolderHeart size={20} color="#0284c7" />
            <span>Health Summary</span>
          </h2>
          <span className="badge badge-info">ID: {patient.id}</span>
        </div>

        <div className="stats-grid">
          <StatCard
            label="Blood Group"
            value={patient.stats.bloodGroup}
            subtext="Universal Donor Compatible"
            icon={Droplet}
            colorVariant="red"
          />

          <StatCard
            label="Allergies"
            value={patient.stats.allergies}
            subtext="Critical Clinical Alert"
            icon={AlertTriangle}
            colorVariant="red"
            isAlert={true}
          />

          <StatCard
            label="Active Medicines"
            value={patient.stats.activeMedicines}
            subtext="Metformin + Vitamin D3"
            icon={Pill}
            colorVariant="blue"
          />

          <StatCard
            label="Health Records"
            value={patient.stats.healthRecords}
            subtext="Prescriptions & Lab Reports"
            icon={FileText}
            colorVariant="green"
          />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <div className="section-title-wrap">
          <h2 className="section-title">
            <Sparkles size={20} color="#0284c7" />
            <span>Quick Actions</span>
          </h2>
        </div>

        <div className="actions-grid">
          <ActionCard
            title="Upload Prescription"
            description="Digitize a prescription using AI"
            buttonText="Upload Now"
            icon={UploadCloud}
            colorVariant="blue"
            to="/upload"
          />

          <ActionCard
            title="My Health ID"
            description="Access your secure QR health identity"
            buttonText="View Health ID"
            icon={QrCode}
            colorVariant="purple"
            to="/health-id"
          />

          <ActionCard
            title="Emergency Access"
            description="Quickly view essential medical information"
            buttonText="Open Emergency"
            icon={ShieldAlert}
            colorVariant="red"
            to="/emergency"
            isEmergency={true}
          />

          <ActionCard
            title="My Profile"
            description="View and manage your personal information"
            buttonText="View Profile"
            icon={UserCircle2}
            colorVariant="teal"
            to="/profile"
          />
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section>
        <div className="section-title-wrap">
          <h2 className="section-title">
            <Clock size={20} color="#0284c7" />
            <span>Recent Activity</span>
          </h2>
        </div>

        <div className="activity-card">
          <div className="activity-list">
            {patient.activities.map((item) => (
              <div key={item.id} className="activity-item">
                <div className="activity-left">
                  <div className="activity-icon-box">
                    {item.type === 'upload' && <UploadCloud size={20} />}
                    {item.type === 'qr' && <QrCode size={20} />}
                    {item.type === 'profile' && <UserCircle2 size={20} />}
                  </div>
                  <div>
                    <div className="activity-title">{item.title}</div>
                    <div className="activity-desc">{item.description}</div>
                  </div>
                </div>

                <div className="activity-right">
                  <span className="badge badge-info">{item.badge}</span>
                  <span className="activity-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
