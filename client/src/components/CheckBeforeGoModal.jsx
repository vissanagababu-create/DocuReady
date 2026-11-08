import React, { useEffect } from 'react';
import { checkVaultMatchDetailed, getExpiryStatus } from '../utils/storage';

export default function CheckBeforeGoModal({ isOpen, process, checkedItems, myDocuments, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !process) return null;

  const totalReq = process.required ? process.required.length : 0;
  const completedReq = process.required.filter((i) => checkedItems.includes(i.id));
  const missingReq = process.required.filter((i) => !checkedItems.includes(i.id));
  const percentage = totalReq > 0 ? Math.round((completedReq.length / totalReq) * 100) : 100;

  let origCount = 0;
  let copyCount = 0;
  let digiCount = 0;

  completedReq.forEach((item) => {
    const match = checkVaultMatchDetailed(item.title, myDocuments);
    if (match.status === 'available') {
      if (match.hasOriginal) origCount++;
      if (match.hasPhotocopy) copyCount++;
      if (match.hasDigital) digiCount++;
    } else {
      origCount++;
      copyCount++;
    }
  });

  const warnings = [];
  if (missingReq.length > 0) {
    warnings.push(
      `${missingReq.length} mandatory item${missingReq.length > 1 ? 's' : ''} still require preparation.`
    );
  }

  completedReq.forEach((item) => {
    const match = checkVaultMatchDetailed(item.title, myDocuments);
    if (match.status === 'available' && match.hasDigital && !match.hasOriginal && !match.hasPhotocopy) {
      warnings.push(
        `"${item.title}" is recorded as Digital scan only. Print a physical photocopy before visiting.`
      );
    }
    if (match.expiryDate) {
      const expStatus = getExpiryStatus(match.expiryDate);
      if (expStatus.status === 'expired') {
        warnings.push(`"${item.title}" in Vault is EXPIRED.`);
      } else if (expStatus.status === 'expiring_soon') {
        warnings.push(`"${item.title}" in Vault expires soon (${expStatus.daysLeft} days left).`);
      }
    }
  });

  let statusText = 'Ready to verify';
  let statusBadgeClass = 'partial';

  if (percentage === 100 && warnings.length === 0) {
    statusText = 'Ready to verify';
    statusBadgeClass = 'ready';
  } else if (percentage >= 50) {
    statusText = 'Partially ready';
    statusBadgeClass = 'partial';
  } else {
    statusText = 'Needs preparation';
    statusBadgeClass = 'needs-prep';
  }

  return (
    <div
      id="check-before-go-modal"
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target.id === 'check-before-go-modal') onClose();
      }}
    >
      <div className="modal-card">
        <button
          className="modal-close-btn"
          id="close-modal-btn"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>

        <div id="modal-review-content">
          <div className="cgo-header">
            <span className="badge badge-accent mb-2">CHECK BEFORE I GO</span>
            <h2 id="modal-title">{process.title}</h2>
            <span className={`badge ${statusBadgeClass} mt-1`}>
              {statusText} ({percentage}%)
            </span>
          </div>

          <div className="grid grid-2 gap-3 mt-4">
            <div className="stat-mini-box">
              <span className="stat-mini-num">
                {completedReq.length} / {totalReq}
              </span>
              <span className="stat-mini-label">Mandatory Documents Ready</span>
            </div>
            <div className="stat-mini-box">
              <span className="stat-mini-num">{missingReq.length}</span>
              <span className="stat-mini-label">Missing Items</span>
            </div>
          </div>

          <div className="udash-format-row mt-3">
            <span className="fmt-pill">
              📄 Originals: <strong>{origCount}/{completedReq.length}</strong>
            </span>
            <span className="fmt-pill">
              🖨️ Copies: <strong>{copyCount}/{completedReq.length}</strong>
            </span>
            <span className="fmt-pill">
              📱 Digital: <strong>{digiCount}/{completedReq.length}</strong>
            </span>
          </div>

          {missingReq.length > 0 && (
            <div className="modal-section-box mt-3">
              <h4>MISSING REQUIREMENTS:</h4>
              <ul className="missing-items-list">
                {missingReq.map((i) => (
                  <li key={i.id}>
                    • <strong>{i.title}</strong> ({i.note})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {warnings.length > 0 && (
            <div className="modal-section-box warning mt-3">
              <h4>⚠ PREPARATION WARNINGS:</h4>
              <ul className="warning-items-list">
                {warnings.map((w, idx) => (
                  <li key={idx}>⚠️ {w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="hero-disclaimer-box mt-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>
              <strong>Final Reminder:</strong> Verify current requirements directly with the relevant organization before your visit.
            </span>
          </div>
        </div>

        <div className="modal-actions-bar mt-4">
          <button
            className="btn btn-primary btn-sm"
            id="print-modal-btn"
            onClick={() => window.print()}
          >
            🖨️ Print Final Review
          </button>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
}
