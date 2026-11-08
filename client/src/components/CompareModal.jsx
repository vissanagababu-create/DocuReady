import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/servicesData';

export default function CompareModal({ isOpen, onClose, services = [] }) {
  const servicesList = services && services.length > 0 ? services : SERVICES_DATA;
  const [selectedA, setSelectedA] = useState('');
  const [selectedB, setSelectedB] = useState('');

  const currentAId =
    selectedA && servicesList.some((s) => s.id === selectedA)
      ? selectedA
      : servicesList[0]?.id || '';

  const currentBId =
    selectedB && servicesList.some((s) => s.id === selectedB)
      ? selectedB
      : servicesList[1]?.id || servicesList[0]?.id || '';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const processA =
    servicesList.find((p) => p.id === currentAId) || servicesList[0];
  const processB =
    servicesList.find((p) => p.id === currentBId) || servicesList[1] || servicesList[0];

  const reqATitles = processA
    ? (processA.required || []).map((i) => i.title || (typeof i === 'string' ? i : ''))
    : [];
  const reqBTitles = processB
    ? (processB.required || []).map((i) => i.title || (typeof i === 'string' ? i : ''))
    : [];

  const common = reqATitles.filter((t) =>
    reqBTitles.some(
      (b) => b.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(b.toLowerCase())
    )
  );
  const onlyA = reqATitles.filter((t) => !common.includes(t));
  const onlyB = reqBTitles.filter((t) => !common.includes(t));

  return (
    <div
      id="compare-modal"
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      onClick={(e) => {
        if (e.target.id === 'compare-modal') onClose();
      }}
    >
      <div className="modal-card">
        <button
          className="modal-close-btn"
          id="close-compare-modal-btn"
          aria-label="Close compare modal"
          onClick={onClose}
        >
          ×
        </button>
        <div className="cgo-header">
          <span className="badge badge-accent mb-2">COMPARE TOOL</span>
          <h2 id="compare-modal-title">Compare Process Requirements</h2>
          <p className="text-muted">
            Select two services below to view common required documents vs unique requirements.
          </p>
        </div>

        <div className="grid grid-2 gap-3 mt-3">
          <div className="form-group">
            <label htmlFor="compare-select-a">Process A:</label>
            <select
              id="compare-select-a"
              className="form-select"
              value={currentAId}
              onChange={(e) => setSelectedA(e.target.value)}
            >
              {servicesList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title || p.name} ({p.categoryName})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="compare-select-b">Process B:</label>
            <select
              id="compare-select-b"
              className="form-select"
              value={currentBId}
              onChange={(e) => setSelectedB(e.target.value)}
            >
              {servicesList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title || p.name} ({p.categoryName})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div id="compare-matrix-content">
          <div className="compare-grid mt-3">
            <div className="compare-col">
              <h3>{processA.title}</h3>
              <span className="badge badge-accent mb-2">{processA.categoryName}</span>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Total Requirements: {processA.required.length}
              </p>
            </div>
            <div className="compare-vs">VS</div>
            <div className="compare-col">
              <h3>{processB.title}</h3>
              <span className="badge badge-accent mb-2">{processB.categoryName}</span>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Total Requirements: {processB.required.length}
              </p>
            </div>
          </div>

          <div className="compare-results-box mt-4">
            <div className="cres-block">
              <h4 className="text-success">✓ COMMON REQUIREMENTS ({common.length})</h4>
              {common.length > 0 ? (
                <ul className="cres-ul">
                  {common.map((c, i) => (
                    <li key={i}>✓ {c}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                  No overlapping document titles found.
                </p>
              )}
            </div>

            <div className="grid grid-2 gap-3 mt-3">
              <div className="cres-block">
                <h4 className="text-primary">
                  ONLY IN {processA.title.toUpperCase()} ({onlyA.length})
                </h4>
                <ul className="cres-ul">
                  {onlyA.map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>
              <div className="cres-block">
                <h4 className="text-primary">
                  ONLY IN {processB.title.toUpperCase()} ({onlyB.length})
                </h4>
                <ul className="cres-ul">
                  {onlyB.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
