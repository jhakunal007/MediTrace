import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageHeader({ 
  title, 
  subtitle, 
  badge, 
  showBackToDashboard = false,
  actions = null 
}) {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      <div className="page-header-text">
        <h1>
          {title}
          {badge && <span className="badge badge-info">{badge}</span>}
        </h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="page-header-actions">
        {showBackToDashboard && (
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        )}
        {actions}
      </div>
    </header>
  );
}
