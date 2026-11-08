import React, { useState } from 'react';
import {
  checkVaultMatchDetailed,
  getChecklistNote,
  saveChecklistNote
} from '../utils/storage';

export default function ChecklistPage({
  process,
  checklists,
  myDocuments,
  favorites,
  onNavigate,
  onToggleFavorite,
  onToggleChecklistItem,
  onResetChecklist,
  onOpenCheckBeforeGo,
  onCopySummary
}) {
  const [openWhyId, setOpenWhyId] = useState(null);
  const [notesState, setNotesState] = useState({});

  if (!process) {
    return (
      <section id="checklist" className="page-section active">
        <div className="container py-4 text-center">
          <h2>No process selected</h2>
          <button
            className="btn btn-primary mt-3"
            onClick={() => onNavigate('services')}
          >
            Back to Services
          </button>
        </div>
      </section>
    );
  }

  const processId = process.id;
  const isFav = favorites.includes(processId);
  const savedChecked = checklists[processId] || [];

  const requiredItems = process.required || [];
  const totalRequired = requiredItems.length;
  const completedRequiredItems = requiredItems.filter((i) =>
    savedChecked.includes(i.id)
  );
  const completedRequiredCount = completedRequiredItems.length;
  const remainingRequiredCount = totalRequired - completedRequiredCount;
  const missingRequiredItems = requiredItems.filter(
    (i) => !savedChecked.includes(i.id)
  );

  const percentage =
    totalRequired > 0
      ? Math.round((completedRequiredCount / totalRequired) * 100)
      : 100;

  // Readiness status text and style
  let readinessStateText = '';
  let readinessStateClass = '';
  let statusMessage = '';

  if (percentage === 100) {
    readinessStateText = 'Ready to verify';
    readinessStateClass = 'status-ready-to-verify';
    statusMessage =
      'All required items prepared! Confirm final rules with the organization before visiting.';
  } else if (percentage >= 80) {
    readinessStateText = 'Almost ready';
    readinessStateClass = 'status-almost-ready';
    statusMessage = `Almost ready — ${remainingRequiredCount} required item${
      remainingRequiredCount > 1 ? 's' : ''
    } remaining.`;
  } else if (percentage >= 50) {
    readinessStateText = 'Partially ready';
    readinessStateClass = 'status-partially-ready';
    statusMessage = `Partially ready — ${remainingRequiredCount} required item${
      remainingRequiredCount > 1 ? 's' : ''
    } remaining.`;
  } else {
    readinessStateText = 'Not ready yet';
    readinessStateClass = 'status-not-ready';
    statusMessage = `Not ready yet — ${remainingRequiredCount} of ${totalRequired} required items remaining.`;
  }

  // Format statistics for completed items
  let origAvailable = 0;
  let copyAvailable = 0;
  let digiAvailable = 0;

  completedRequiredItems.forEach((item) => {
    const match = checkVaultMatchDetailed(item.title, myDocuments);
    if (match.status === 'available') {
      if (match.hasOriginal) origAvailable++;
      if (match.hasPhotocopy) copyAvailable++;
      if (match.hasDigital) digiAvailable++;
    } else {
      origAvailable++;
      copyAvailable++;
    }
  });

  const toggleWhy = (itemId) => {
    setOpenWhyId(openWhyId === itemId ? null : itemId);
  };

  const handleNoteChange = (itemId, text) => {
    setNotesState((prev) => ({ ...prev, [itemId]: text }));
    saveChecklistNote(processId, itemId, text);
  };

  const getItemNote = (itemId) => {
    if (notesState[itemId] !== undefined) return notesState[itemId];
    return getChecklistNote(processId, itemId);
  };

  const renderItemRow = (item) => {
    const isChecked = savedChecked.includes(item.id);
    const vaultMatch = checkVaultMatchDetailed(item.title, myDocuments);
    const userNote = getItemNote(item.id);
    const isWhyOpen = openWhyId === item.id;

    let vaultBadge = null;
    if (vaultMatch.status === 'available') {
      const formats = [];
      if (vaultMatch.hasOriginal) formats.push('Original');
      if (vaultMatch.hasPhotocopy) formats.push('Photocopy');
      if (vaultMatch.hasDigital) formats.push('Digital');

      if (
        vaultMatch.hasDigital &&
        !vaultMatch.hasOriginal &&
        !vaultMatch.hasPhotocopy
      ) {
        vaultBadge = (
          <span className="vault-badge format-warning">
            📱 Recorded Digitally in Vault — Physical copy may still be needed
          </span>
        );
      } else {
        vaultBadge = (
          <span className="vault-badge available">
            ✓ Recorded in Vault ({formats.join(', ')})
          </span>
        );
      }
    } else if (vaultMatch.status === 'missing') {
      vaultBadge = (
        <span className="vault-badge missing">⏳ Marked Missing in Vault</span>
      );
    } else {
      vaultBadge = (
        <span className="vault-badge not-found">
          ⚠ Not in My Documents{' '}
          <a
            href="#mydocuments"
            className="vault-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('mydocuments');
            }}
          >
            Add to Vault
          </a>
        </span>
      );
    }

    let priorityBadge = null;
    if (item.priority === 'high') {
      priorityBadge = (
        <span className="prio-pill prio-high" title="High Preparation Priority">
          🔴 High
        </span>
      );
    } else if (item.priority === 'medium') {
      priorityBadge = (
        <span className="prio-pill prio-med" title="Medium Preparation Priority">
          🟡 Medium
        </span>
      );
    } else {
      priorityBadge = (
        <span className="prio-pill prio-low" title="Low Preparation Priority">
          🟢 Low
        </span>
      );
    }

    return (
      <div
        key={item.id}
        className={`check-item-row ${isChecked ? 'is-checked' : ''}`}
        data-item-id={item.id}
      >
        <div className="check-row-main">
          <input
            type="checkbox"
            className="custom-checkbox"
            id={`chk_${item.id}`}
            checked={isChecked}
            onChange={() => onToggleChecklistItem(processId, item.id)}
            aria-label={item.title}
          />
          <label htmlFor={`chk_${item.id}`} className="check-label-content">
            <div className="title-prio-flex">
              <span className="check-item-title">{item.title}</span>
              {priorityBadge}
            </div>
            {item.note && <p className="check-item-desc">{item.note}</p>}
          </label>
          <button
            type="button"
            className={`btn-why-trigger ${isWhyOpen ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWhy(item.id);
            }}
            aria-label={`Why is ${item.title} needed?`}
          >
            Why & Tip
          </button>
        </div>

        {/* Expandable Why & Tip Box */}
        {isWhyOpen && (
          <div className="why-popover">
            <div className="why-popover-inner">
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
              <div>
                <strong>Why it may be requested:</strong>
                <p>
                  {item.why ||
                    'Used for identity or administrative verification by the receiving office.'}
                </p>
                {item.prepTip && (
                  <>
                    <strong className="mt-2 block text-primary">
                      💡 Preparation Tip:
                    </strong>
                    <p>{item.prepTip}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Vault Matcher Badge & User Personal Note */}
        <div className="vault-indicator-row">
          {vaultBadge}
          <div className="user-item-note-wrapper">
            <input
              type="text"
              className="item-note-input"
              placeholder="✏️ Add personal note (e.g. Get copy from accounts)..."
              value={userNote}
              onChange={(e) => handleNoteChange(item.id, e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const isComplete = percentage === 100;

  return (
    <section id="checklist" className="page-section active">
      <div className="container py-4">
        {/* Back Button */}
        <div className="mb-3">
          <button
            className="btn-back"
            id="back-to-services-btn"
            onClick={() => onNavigate('services')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Services
          </button>
        </div>

        {/* Process Checklist Header */}
        <div className="checklist-header-card mb-4" id="checklist-header-container">
          <div className="chk-header-top">
            <span className="checklist-category-pill">{process.categoryName}</span>
            <div className="chk-header-btns">
              <button
                className={`star-fav-btn lg ${isFav ? 'active' : ''}`}
                onClick={() => onToggleFavorite(process.id)}
                title="Bookmark this process"
              >
                {isFav ? '★ Favorited' : '☆ Bookmark'}
              </button>
              <button
                className="btn btn-sm btn-accent"
                id="open-check-before-go-btn"
                onClick={onOpenCheckBeforeGo}
              >
                ✨ Check Before I Go
              </button>
            </div>
          </div>
          <h1>{process.title || process.name} Checklist</h1>
          <p>{process.shortDesc || process.description}</p>
          {(process.processingTime || process.officialPortal) && (
            <div className="d-flex align-items-center gap-3 mt-2 flex-wrap" style={{ fontSize: '0.85rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {process.processingTime && (
                <span className="badge badge-subtle" style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}>
                  ⏱ <strong>Processing:</strong> {process.processingTime}
                </span>
              )}
              {process.officialPortal && (
                <a
                  href={process.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-accent"
                  style={{ textDecoration: 'none' }}
                >
                  🌐 Official Portal ↗
                </a>
              )}
            </div>
          )}
          <div className="guidance-disclaimer-banner mt-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>
              <strong>General Guidance Disclaimer:</strong> DocuReady provides general preparation guidance. Requirements may vary by organization, location and process. Always verify the final requirements with the relevant organization.
            </span>
          </div>
        </div>

        {/* Progress Overview Banner */}
        <div className="progress-overview-card mb-4">
          <div className="progress-overview-top">
            <div>
              <span className="readiness-label">Your Preparation Status</span>
              <h2
                className={`readiness-status-title ${readinessStateClass}`}
                id="checklist-status-title"
              >
                {readinessStateText}
              </h2>
            </div>
            <div
              className="completion-number-badge"
              id="checklist-percentage-badge"
            >
              {percentage}%
            </div>
          </div>

          <div className="main-progress-bar">
            <div
              className="main-progress-fill"
              id="checklist-progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="progress-overview-bottom">
            <span className="items-count-text" id="checklist-items-count">
              {completedRequiredCount} of {totalRequired} required items prepared
            </span>
            <span className="status-tip-msg" id="checklist-tip-msg">
              {statusMessage}
            </span>
          </div>
        </div>

        {/* Two Column Content Layout */}
        <div className="grid grid-3-1 gap-4 align-start">
          {/* Left/Main Column: Requirements */}
          <div className="requirements-wrapper">
            {/* Required Documents Box */}
            <div className="content-box mb-4">
              <div className="content-box-header">
                <div className="cbox-title">
                  <span className="badge badge-required">Mandatory</span>
                  <h3>Required Documents</h3>
                </div>
                <span className="cbox-subtitle" id="required-count-label">
                  {requiredItems.length} items
                </span>
              </div>
              <div className="checklist-items-group" id="required-items-list">
                {requiredItems.map((item) => renderItemRow(item, 'required'))}
              </div>
            </div>

            {/* Optional Documents Box */}
            {process.optional && process.optional.length > 0 && (
              <div className="content-box mb-4" id="optional-box-container">
                <div className="content-box-header">
                  <div className="cbox-title">
                    <span className="badge badge-optional">
                      Optional / Recommended
                    </span>
                    <h3>Supplementary Documents</h3>
                  </div>
                  <span className="cbox-subtitle" id="optional-count-label">
                    {process.optional.length} items
                  </span>
                </div>
                <div className="checklist-items-group" id="optional-items-list">
                  {process.optional.map((item) => renderItemRow(item, 'optional'))}
                </div>
              </div>
            )}

            {/* Dedicated Bottom Final Readiness Summary Card */}
            <div id="final-readiness-card-container" className="mb-4">
              <div
                className={`final-readiness-card ${
                  isComplete ? 'is-100-complete' : ''
                }`}
              >
                <div className="readiness-card-header">
                  <span className="rcard-tag">Personalized Process Dashboard</span>
                  <div className="rcard-big-score">
                    <span className="rcard-number">{percentage}%</span>
                    <span className={`rcard-badge ${readinessStateClass}`}>
                      {readinessStateText}
                    </span>
                  </div>
                  <p className="rcard-count-text">
                    {completedRequiredCount} of {totalRequired} mandatory requirements prepared
                  </p>
                </div>

                {/* Format Breakdown Summary Pills */}
                <div className="udash-format-row mb-3">
                  <span className="fmt-pill">
                    📄 Originals: <strong>{origAvailable}/{completedRequiredCount}</strong>
                  </span>
                  <span className="fmt-pill">
                    🖨️ Copies: <strong>{copyAvailable}/{completedRequiredCount}</strong>
                  </span>
                  <span className="fmt-pill">
                    📱 Digital: <strong>{digiAvailable}/{completedRequiredCount}</strong>
                  </span>
                </div>

                {!isComplete && missingRequiredItems.length > 0 && (
                  <div className="rcard-missing-box">
                    <span className="missing-title">
                      BEFORE YOU LEAVE — Missing Requirements (
                      {remainingRequiredCount} item
                      {remainingRequiredCount > 1 ? 's' : ''}):
                    </span>
                    <ul className="missing-items-list">
                      {missingRequiredItems.map((item) => (
                        <li key={item.id}>
                          ⚠ <strong>{item.title}</strong> —{' '}
                          <small className="text-muted">{item.note}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rcard-footer-disclaimer">
                  {isComplete ? (
                    <div className="rcard-success-note">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <div>
                        <strong>Ready to Verify!</strong>
                        <p>
                          Remember to confirm final requirements and office timings with the relevant organization before visiting.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted">
                      Review remaining requirements above or update your Document Vault.
                    </p>
                  )}
                </div>

                <div className="rcard-actions mt-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={onOpenCheckBeforeGo}
                  >
                    ✨ Check Before I Go Review
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    id="copy-summary-btn"
                    onClick={onCopySummary}
                  >
                    📋 Copy Summary
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => window.print()}
                  >
                    🖨️ Print Preparation List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel / Notes (Right Column) */}
          <div className="checklist-side-panel">
            {/* Process Preparation Notes Card */}
            <div className="content-box mb-4">
              <div className="cbox-title mb-3">
                <svg
                  width="20"
                  height="20"
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
                <h4 style={{ margin: 0 }}>Preparation Notes</h4>
              </div>
              <ul className="prep-notes-list" id="checklist-prep-notes">
                {process.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Quick Action Tools */}
            <div className="content-box">
              <h4 className="mb-3" style={{ marginTop: 0 }}>
                Actions
              </h4>
              <div className="action-btn-stack">
                <button
                  className="btn btn-outline btn-block"
                  id="reset-current-checklist-btn"
                  onClick={() => onResetChecklist(process.id, process.title)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M23 4v6h-6"></path>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  Reset Checklist
                </button>
                <button
                  className="btn btn-secondary btn-block"
                  id="print-checklist-btn"
                  onClick={() => window.print()}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  Print / Save Summary
                </button>
                <button
                  className="btn btn-outline btn-block"
                  onClick={onCopySummary}
                >
                  📋 Copy Summary
                </button>
                <a
                  href="#mydocuments"
                  className="btn btn-primary btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('mydocuments');
                  }}
                >
                  View My Documents
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
