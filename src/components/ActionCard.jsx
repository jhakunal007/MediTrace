import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ActionCard({ 
  title, 
  description, 
  buttonText, 
  icon: Icon, 
  colorVariant = 'blue', 
  to, 
  isEmergency = false 
}) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div className={`action-card ${isEmergency ? 'emergency-action' : ''}`}>
      <div>
        <div className="action-card-top">
          {Icon && (
            <div className={`action-card-icon ${colorVariant}`}>
              <Icon size={24} />
            </div>
          )}
          {isEmergency && <span className="badge badge-danger">High Priority</span>}
        </div>

        <div className="action-card-body">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <button 
        type="button" 
        onClick={handleAction}
        className={`btn action-card-btn ${isEmergency ? 'btn-danger' : 'btn-primary'}`}
      >
        <span>{buttonText}</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
