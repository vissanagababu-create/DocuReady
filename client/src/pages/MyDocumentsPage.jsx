import React, { useState, useMemo } from 'react';
import { getExpiryStatus } from '../utils/storage';

export default function MyDocumentsPage({
  myDocuments,
  customChecklists,
  reminders,
  onAddDocument,
  onToggleDocFormat,
  onToggleDocStatus,
  onDeleteDocument,
  onCreateCustomChecklist,
  onAddCustomChecklistItem,
  onToggleCustomChecklistItem,
  onDeleteCustomChecklistItem,
  onDeleteCustomChecklist,
  onNavigate
}) {
  // Form state
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Identity & Address');
  const [hasOriginal, setHasOriginal] = useState(true);
  const [hasPhotocopy, setHasPhotocopy] = useState(true);
  const [hasDigital, setHasDigital] = useState(true);
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('available');

  // Search & Filter state
  const [vaultSearchTerm, setVaultSearchTerm] = useState('');
  const [vaultFilter, setVaultFilter] = useState('all');

  // Custom checklist form
  const [customTitle, setCustomTitle] = useState('');
  const [newItemTexts, setNewItemTexts] = useState({});

  const presetDocuments = [
    { doc: 'Aadhar Card', cat: 'Identity & Address' },
    { doc: 'Passport Size Photos', cat: 'Photos & Certificates' },
    { doc: '10th / 12th Marksheet', cat: 'Educational' },
    { doc: 'PAN Card', cat: 'Identity & Address' },
    { doc: 'Bank Passbook', cat: 'Financial & Bank' }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    onAddDocument({
      title: docTitle.trim(),
      category: docCategory,
      notes: notes.trim(),
      status,
      hasOriginal,
      hasPhotocopy,
      hasDigital,
      expiryDate,
      issueDate: ''
    });

    // Reset form
    setDocTitle('');
    setNotes('');
    setExpiryDate('');
    setHasOriginal(true);
    setHasPhotocopy(true);
    setHasDigital(true);
    setStatus('available');
  };

  const handlePresetClick = (preset) => {
    onAddDocument({
      title: preset.doc,
      category: preset.cat,
      notes: 'Quick preset document record',
      status: 'available',
      hasOriginal: true,
      hasPhotocopy: true,
      hasDigital: true,
      expiryDate: '',
      issueDate: ''
    });
  };

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return myDocuments.filter((doc) => {
      const matchesStatus =
        vaultFilter === 'all' || doc.status === vaultFilter;
      const term = vaultSearchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        doc.title.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term) ||
        (doc.notes && doc.notes.toLowerCase().includes(term));

      return matchesStatus && matchesSearch;
    });
  }, [myDocuments, vaultFilter, vaultSearchTerm]);

  // Stats calculation
  const totalDocs = myDocuments.length;
  const availableDocs = myDocuments.filter((d) => d.status === 'available').length;
  const missingDocs = totalDocs - availableDocs;
  const readyPercent = totalDocs > 0 ? Math.round((availableDocs / totalDocs) * 100) : 0;

  // Custom checklist handlers
  const handleCreateChecklist = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    onCreateCustomChecklist(customTitle.trim());
    setCustomTitle('');
  };

  const handleAddItem = (chkId, e) => {
    e.preventDefault();
    const text = newItemTexts[chkId] || '';
    if (!text.trim()) return;
    onAddCustomChecklistItem(chkId, text.trim());
    setNewItemTexts((prev) => ({ ...prev, [chkId]: '' }));
  };

  return (
    <section id="mydocuments" className="page-section active">
      <div className="container py-4">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-accent mb-2">Local Storage Vault</div>
          <h1 className="page-headline">My Document Vault & Custom Checklists</h1>
          <p className="page-subheadline">
            Record document formats, expiry dates, custom checklists, and track in-app reminders locally.
          </p>
        </div>

        {/* In-App Reminders Section */}
        <div id="in-app-reminders-container" className="mb-4">
          {reminders.length === 0 ? (
            <div className="alert alert-success">
              <span>
                ✓ No pending reminders. All document expiry dates and copies are in order!
              </span>
            </div>
          ) : (
            <div className="reminders-card">
              <div className="rem-header mb-3">
                <span className="badge badge-accent">IN-APP REMINDERS</span>
                <h3>Upcoming Preparation Events</h3>
              </div>
              <div className="reminders-list">
                {reminders.map((rem) => (
                  <div key={rem.id} className={`reminder-item-row ${rem.type}`}>
                    <span className="rem-icon">{rem.icon}</span>
                    <div className="rem-info">
                      <strong>{rem.title}</strong>
                      <p>{rem.text}</p>
                    </div>
                    {rem.processId && (
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => onNavigate('checklist', null, rem.processId)}
                      >
                        Open Checklist
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Privacy Assurance Banner */}
        <div className="alert alert-success mb-4">
          <div className="alert-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div className="alert-content">
            <strong>100% Local Browser Storage:</strong> Your saved document formats, expiry dates, and custom checklists are stored purely in your browser (<code>localStorage</code>). No files are uploaded to any server.
          </div>
        </div>

        {/* Add Document Box & Stats Grid */}
        <div className="grid grid-3-1 gap-4 align-start mb-4">
          {/* Add Custom Document Form */}
          <div className="content-box">
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
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <h3 style={{ margin: 0 }}>Add Document Record</h3>
            </div>

            <form id="add-document-form" className="vault-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group flex-2">
                  <label htmlFor="doc-title-input">
                    Document Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="doc-title-input"
                    className="form-input"
                    placeholder="e.g. Passport, Aadhar Card, 10th Marksheet"
                    required
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="doc-category-select">Category</label>
                  <select
                    id="doc-category-select"
                    className="form-select"
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value)}
                  >
                    <option value="Identity & Address">Identity & Address</option>
                    <option value="Educational">Educational</option>
                    <option value="Financial & Bank">Financial & Bank</option>
                    <option value="Employment">Employment</option>
                    <option value="Photos & Certificates">Photos & Certificates</option>
                    <option value="General / Other">General / Other</option>
                  </select>
                </div>
              </div>

              {/* Format Checklist Checkboxes */}
              <div className="form-group mb-2">
                <label>Formated Copies Available:</label>
                <div className="format-checkbox-row">
                  <label className="format-check-label">
                    <input
                      type="checkbox"
                      id="doc-has-original"
                      checked={hasOriginal}
                      onChange={(e) => setHasOriginal(e.target.checked)}
                    />
                    <span>📄 Physical Original</span>
                  </label>
                  <label className="format-check-label">
                    <input
                      type="checkbox"
                      id="doc-has-photocopy"
                      checked={hasPhotocopy}
                      onChange={(e) => setHasPhotocopy(e.target.checked)}
                    />
                    <span>🖨️ Printed Photocopy</span>
                  </label>
                  <label className="format-check-label">
                    <input
                      type="checkbox"
                      id="doc-has-digital"
                      checked={hasDigital}
                      onChange={(e) => setHasDigital(e.target.checked)}
                    />
                    <span>📱 Digital Scan / PDF</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="doc-expiry-input">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    id="doc-expiry-input"
                    className="form-input"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div className="form-group flex-2">
                  <label htmlFor="doc-notes-input">
                    Notes / Storage Location (Optional)
                  </label>
                  <input
                    type="text"
                    id="doc-notes-input"
                    className="form-input"
                    placeholder="e.g. Original in blue folder, 3 copies printed"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="doc-status-select">Overall Status</label>
                  <select
                    id="doc-status-select"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="available">Available (Ready)</option>
                    <option value="missing">Missing / Need to get</option>
                  </select>
                </div>
              </div>

              <div className="form-footer">
                <button type="submit" className="btn btn-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Save to Vault
                </button>
              </div>
            </form>

            {/* Quick Presets */}
            <div className="quick-presets-wrapper mt-4">
              <span className="preset-label">Quick Add Common Documents:</span>
              <div className="preset-chips-group" id="preset-chips-container">
                {presetDocuments.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="chip-btn"
                    onClick={() => handlePresetClick(preset)}
                  >
                    + {preset.doc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vault Summary Stats Widget */}
          <div className="vault-stats-card">
            <h4 className="mb-3">Vault Statistics</h4>
            <div className="stat-mini-row">
              <span className="stat-label">Total Registered</span>
              <span className="stat-value" id="vault-stat-total">
                {totalDocs}
              </span>
            </div>
            <div className="stat-mini-row">
              <span className="stat-label">Available (Ready)</span>
              <span className="stat-value text-success" id="vault-stat-available">
                {availableDocs}
              </span>
            </div>
            <div className="stat-mini-row">
              <span className="stat-label">Missing / Pending</span>
              <span className="stat-value text-warning" id="vault-stat-missing">
                {missingDocs}
              </span>
            </div>
            <div className="stat-progress-bar mt-3">
              <div
                className="stat-progress-fill"
                id="vault-stat-fill"
                style={{ width: `${readyPercent}%` }}
              ></div>
            </div>
            <small className="text-muted mt-2 block" id="vault-stat-text">
              {readyPercent}% of saved documents ready in vault
            </small>
          </div>
        </div>

        {/* Filter & Search Vault Items */}
        <div className="vault-toolbar mb-4">
          <div className="search-box">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              id="vault-search-input"
              placeholder="Search my saved documents..."
              aria-label="Search my saved documents"
              value={vaultSearchTerm}
              onChange={(e) => setVaultSearchTerm(e.target.value)}
            />
            {vaultSearchTerm && (
              <button
                className="clear-search-btn"
                id="clear-vault-search"
                title="Clear search"
                onClick={() => setVaultSearchTerm('')}
              >
                ×
              </button>
            )}
          </div>

          <div className="vault-status-filter">
            <button
              className={`vfilter-btn ${vaultFilter === 'all' ? 'active' : ''}`}
              onClick={() => setVaultFilter('all')}
            >
              All Documents
            </button>
            <button
              className={`vfilter-btn ${vaultFilter === 'available' ? 'active' : ''}`}
              onClick={() => setVaultFilter('available')}
            >
              Available Only
            </button>
            <button
              className={`vfilter-btn ${vaultFilter === 'missing' ? 'active' : ''}`}
              onClick={() => setVaultFilter('missing')}
            >
              Missing Only
            </button>
          </div>
        </div>

        {/* Documents Items Grid */}
        {filteredDocs.length > 0 ? (
          <div className="grid grid-2 gap-3 mb-5" id="vault-items-container">
            {filteredDocs.map((doc) => {
              const isAvailable = doc.status === 'available';
              const hasOrig = doc.hasOriginal !== false;
              const hasPhoto = doc.hasPhotocopy !== false;
              const hasDigi = doc.hasDigital !== false;
              const expInfo = getExpiryStatus(doc.expiryDate);

              return (
                <div key={doc.id} className="vault-item-card" data-doc-id={doc.id}>
                  <div className="vitem-main">
                    <div className="vitem-info">
                      <span className="vitem-category">{doc.category}</span>
                      <h4>{doc.title}</h4>
                      {doc.notes && (
                        <p className="vitem-notes">📍 {doc.notes}</p>
                      )}

                      <div className={`expiry-badge-tag mt-2 ${expInfo.badgeClass}`}>
                        {expInfo.label}
                      </div>
                    </div>

                    {/* Triple Format Toggles */}
                    <div className="format-toggles-group">
                      <button
                        type="button"
                        className={`ftoggle-btn ${hasOrig ? 'active' : ''}`}
                        onClick={() => onToggleDocFormat(doc.id, 'hasOriginal')}
                        title="Toggle Original Document availability"
                      >
                        📄 Original: {hasOrig ? 'Yes' : 'No'}
                      </button>
                      <button
                        type="button"
                        className={`ftoggle-btn ${hasPhoto ? 'active' : ''}`}
                        onClick={() => onToggleDocFormat(doc.id, 'hasPhotocopy')}
                        title="Toggle Photocopy availability"
                      >
                        🖨️ Photocopy: {hasPhoto ? 'Yes' : 'No'}
                      </button>
                      <button
                        type="button"
                        className={`ftoggle-btn ${hasDigi ? 'active' : ''}`}
                        onClick={() => onToggleDocFormat(doc.id, 'hasDigital')}
                        title="Toggle Digital Copy availability"
                      >
                        📱 Digital: {hasDigi ? 'Yes' : 'No'}
                      </button>
                    </div>
                  </div>

                  <div className="vitem-actions">
                    <button
                      className={`status-toggle-btn ${
                        isAvailable ? 'available' : 'missing'
                      }`}
                      onClick={() => onToggleDocStatus(doc.id)}
                      title="Click to toggle overall availability"
                    >
                      {isAvailable ? '✓ Available' : '⏳ Missing'}
                    </button>
                    <button
                      className="btn-delete-item"
                      onClick={() => onDeleteDocument(doc.id, doc.title)}
                      aria-label={`Delete ${doc.title} document`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state mb-5" id="vault-empty-state">
            <div className="empty-icon">📁</div>
            <h3 id="vault-empty-title">
              {myDocuments.length === 0
                ? "You haven't added any documents yet."
                : 'No matching documents found'}
            </h3>
            <p id="vault-empty-text">
              {myDocuments.length === 0
                ? 'Add your common documents above or click any quick preset to start tracking what you have.'
                : 'Try adjusting your search terms or status filter options.'}
            </p>
          </div>
        )}

        {/* Personal Custom Checklist Builder Section */}
        <div className="content-box mb-4">
          <div className="cbox-header-flex mb-3">
            <div>
              <span className="badge badge-accent mb-1">
                PERSONAL CHECKLIST BUILDER
              </span>
              <h3 style={{ margin: 0 }}>Custom Checklists</h3>
            </div>
          </div>

          <form
            id="create-custom-checklist-form"
            className="vault-form mb-4"
            onSubmit={handleCreateChecklist}
          >
            <div className="form-row">
              <div className="form-group flex-2">
                <label htmlFor="custom-title-input">New Checklist Name</label>
                <input
                  type="text"
                  id="custom-title-input"
                  className="form-input"
                  placeholder="e.g. My Internship Onboarding Checklist"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                />
              </div>
              <div className="form-group flex-1 align-self-end">
                <button type="submit" className="btn btn-primary btn-block">
                  Create Custom List
                </button>
              </div>
            </div>
          </form>

          <div id="custom-checklists-container">
            {customChecklists.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No Personal Checklists Created</h3>
                <p>
                  Create your own checklist above for custom procedures like internship onboarding, passport visit, or scholarship submission.
                </p>
              </div>
            ) : (
              customChecklists.map((chk) => {
                const total = chk.items.length;
                const completed = chk.items.filter((i) => i.completed).length;
                const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

                return (
                  <div key={chk.id} className="custom-chk-card mb-4">
                    <div className="cchk-header">
                      <div>
                        <span className="badge badge-primary mb-1">
                          Personal Checklist
                        </span>
                        <h3>{chk.title}</h3>
                        <span
                          className="text-muted"
                          style={{ fontSize: '0.85rem' }}
                        >
                          {completed} of {total} completed ({percent}%)
                        </span>
                      </div>
                      <button
                        className="btn-delete-item"
                        onClick={() => onDeleteCustomChecklist(chk.id, chk.title)}
                        title="Delete custom checklist"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="cchk-items-list mt-3">
                      {chk.items.map((item) => (
                        <div
                          key={item.id}
                          className={`cchk-item-row ${
                            item.completed ? 'is-checked' : ''
                          }`}
                        >
                          <label className="cchk-item-label">
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              checked={item.completed}
                              onChange={() =>
                                onToggleCustomChecklistItem(chk.id, item.id)
                              }
                            />
                            <span className="check-item-title">{item.title}</span>
                          </label>
                          <button
                            className="btn-delete-item"
                            onClick={() =>
                              onDeleteCustomChecklistItem(chk.id, item.id)
                            }
                            title="Delete item"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Item Form */}
                    <form
                      className="add-cchk-item-form mt-3"
                      onSubmit={(e) => handleAddItem(chk.id, e)}
                    >
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          placeholder="+ Add requirement item..."
                          required
                          className="form-input btn-sm flex-1"
                          value={newItemTexts[chk.id] || ''}
                          onChange={(e) =>
                            setNewItemTexts({
                              ...newItemTexts,
                              [chk.id]: e.target.value
                            })
                          }
                        />
                        <button type="submit" className="btn btn-sm btn-outline">
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
