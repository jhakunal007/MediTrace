import React from 'react';

export default function StatCard({ 
  label, 
  value, 
  subtext, 
  icon: Icon, 
  colorVariant = 'blue', 
  isAlert = false 
}) {
  return (
    <div className={`stat-card ${isAlert ? 'alert-card' : ''}`}>
      <div className="stat-card-info">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value">{value}</span>
        {subtext && <span className="stat-card-subtext">{subtext}</span>}
      </div>
      
      {Icon && (
        <div className={`stat-card-icon-wrapper ${colorVariant}`}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
}
