import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  FileCheck2, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  HeartPulse
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('rahul@example.com');
  const [password, setPassword] = useState('meditrace123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulated short authentication delay for realistic UX
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  const handleQuickFill = () => {
    setEmail('rahul@example.com');
    setPassword('meditrace123');
    setError('');
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE: Healthcare Branding & Visual Panel */}
      <div className="login-brand-panel">
        <div className="login-brand-header">
          <div className="login-logo-box">
            <Activity size={26} strokeWidth={2.5} />
          </div>
          <span className="login-brand-title">
            Medi<span>Trace</span>
          </span>
        </div>

        <div className="login-brand-hero">
          <div className="login-hero-pill">
            <Sparkles size={15} />
            <span>AI-Powered Medical Intelligence</span>
          </div>

          <h1>Secure Healthcare Records When Every Second Counts.</h1>
          <p>
            "Your medical information, organized, secure, and accessible when it matters most."
          </p>

          <div className="login-brand-features">
            <div className="login-feature-item">
              <ShieldCheck size={20} color="#38bdf8" />
              <span>Zero-Knowledge Privacy</span>
            </div>
            <div className="login-feature-item">
              <HeartPulse size={20} color="#f87171" />
              <span>Instant QR SOS Access</span>
            </div>
            <div className="login-feature-item">
              <FileCheck2 size={20} color="#34d399" />
              <span>Smart OCR Prescription Extraction</span>
            </div>
            <div className="login-feature-item">
              <Sparkles size={20} color="#fbbf24" />
              <span>AI Medication Assistant</span>
            </div>
          </div>
        </div>

        <div className="login-brand-footer">
          <span>MediTrace Hackathon MVP Prototype • Clinical demo environment</span>
        </div>
      </div>

      {/* RIGHT SIDE: Login Card */}
      <div className="login-form-panel">
        <div className="login-card">
          <div className="login-card-header">
            <h2>Welcome Back</h2>
            <p>Sign in to access your personal medical dashboard</p>
          </div>

          <div className="demo-credentials-box">
            <span><strong>Demo Patient:</strong> rahul@example.com</span>
            <button type="button" onClick={handleQuickFill}>
              Use Demo Account
            </button>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon-left" />
                <input
                  id="email"
                  type="email"
                  className={`form-input ${error && !email.trim() ? 'error' : ''}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon-left" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${error && !password.trim() ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary login-submit-btn" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Login to MediTrace</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="login-footer-trust">
            Secure • Private • Accessible
          </div>
        </div>
      </div>
    </div>
  );
}
