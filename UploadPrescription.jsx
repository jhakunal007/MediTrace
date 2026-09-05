import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Eye,
  FileCheck
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function UploadPrescription() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFile = (file) => {
    if (!file) return;

    // Check size limit: 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File exceeds maximum size of 10 MB.');
      return;
    }

    setErrorMessage('');
    setSelectedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      type: file.type || 'image/jpeg'
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = () => {
    setSelectedFile({
      name: 'prescription.jpg',
      size: '2.4 MB',
      type: 'image/jpeg'
    });
    setErrorMessage('');
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);

    // Simulated OCR processing time
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/ai-result');
    }, 1800);
  };

  return (
    <div className="upload-container animate-fade-in">
      <PageHeader
        title="Upload Prescription"
        subtitle="Upload your prescription and let MediTrace extract important medical information automatically."
        showBackToDashboard={true}
      />

      {errorMessage && (
        <div className="card" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {isAnalyzing ? (
        /* Visual Processing State with animated scan line */
        <div className="analyzing-modal">
          <div className="analyzing-scanner">
            <div className="scanner-line"></div>
            <div className="scanner-placeholder-line" style={{ width: '80%' }}></div>
            <div className="scanner-placeholder-line" style={{ width: '60%' }}></div>
            <div className="scanner-placeholder-line" style={{ width: '90%' }}></div>
            <div className="scanner-placeholder-line" style={{ width: '50%' }}></div>
            <div className="scanner-placeholder-line" style={{ width: '70%' }}></div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Analyzing prescription...
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Executing Optical Character Recognition & Clinical Entity Extraction...
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
            <RefreshCw size={16} className="animate-spin" />
            <span>Parsing dosages, instructions, and allergy interactions</span>
          </div>
        </div>
      ) : (
        <>
          {/* DRAG AND DROP ZONE */}
          <div 
            className={`dropzone ${isDragging ? 'active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".jpg,.jpeg,.png,.pdf" 
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            <div className="upload-icon-circle">
              <UploadCloud size={36} />
            </div>

            <h3>Upload Prescription</h3>
            <p>Drag & drop your file here, or click to <strong>Browse Files</strong></p>

            <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current && fileInputRef.current.click();
            }}>
              Browse Files
            </button>

            <div className="file-specs">
              <span>Accepted formats: JPG, JPEG, PNG, PDF</span>
              <span>•</span>
              <span>Maximum size: 10 MB</span>
            </div>
          </div>

          {/* Quick Demo Sample Picker */}
          <div className="sample-load-box">
            <span>Don't have a prescription file on hand?</span>
            <button 
              type="button" 
              className="btn btn-outline-primary btn-sm"
              onClick={handleSelectSample}
            >
              <Sparkles size={14} />
              Load Sample Rx (Dr. Sharma)
            </button>
          </div>

          {/* SELECTED FILE DISPLAY */}
          {selectedFile && (
            <div className="selected-file-card">
              <div className="selected-file-info">
                <div className="file-thumbnail">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="selected-file-name">{selectedFile.name}</div>
                  <div className="selected-file-size">File size: {selectedFile.size}</div>
                </div>
              </div>

              <div className="selected-file-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={handleRemove}
                >
                  <Trash2 size={14} />
                  Remove
                </button>

                <button 
                  type="button" 
                  className="btn btn-primary btn-sm"
                  onClick={handleAnalyze}
                >
                  <Sparkles size={14} />
                  Analyze Prescription
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
