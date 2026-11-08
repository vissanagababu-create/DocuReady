import React, { useState } from 'react';

export default function AboutPage({ onExportData, onImportData, onClearAllData }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Are these document requirements official for all institutions?',
      a: 'No. DocuReady provides general preparation guidance. Requirements may vary by organization, location and process. Always verify the final requirements with the relevant organization.'
    },
    {
      q: 'Are my personal documents uploaded to any server?',
      a: 'No! DocuReady does NOT upload or store actual files. All checklist progress and document records added to "My Documents" remain strictly in your browser\'s local storage (LocalStorage).'
    },
    {
      q: 'Will my checklist progress remain if I refresh the browser?',
      a: 'Yes. As long as you use the same browser and do not clear browsing data, your checked items and document vault entries remain saved.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="about" className="page-section active">
      <div className="container py-4">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-accent mb-2">
            Project Overview & Data Management
          </div>
          <h1 className="page-headline">About & Data Settings</h1>
          <p className="page-subheadline">
            Empowering individuals with pre-visit clarity while giving complete control over your local browser data.
          </p>
        </div>

        {/* Mission Card */}
        <div className="content-box mb-4">
          <div className="grid grid-2 gap-4 align-center">
            <div>
              <h2 className="mb-3">Our Mission</h2>
              <p className="text-body mb-3">
                Every day, students, job seekers, and citizens waste time standing in queues only to discover they forgot a photo, fee receipt, or self-attested photocopy.
              </p>
              <p className="text-body">
                <strong>DocuReady</strong> was created to eliminate this frustration by providing clear, interactive pre-visit checklists for common administrative procedures.
              </p>
            </div>
            <div className="about-hero-box">
              <div className="about-stat-item">
                <span className="astat-number">100%</span>
                <span className="astat-label">Client-Side & Private</span>
              </div>
              <div className="about-stat-item">
                <span className="astat-number">Zero</span>
                <span className="astat-label">Server Uploads Required</span>
              </div>
              <div className="about-stat-item">
                <span className="astat-number">Instant</span>
                <span className="astat-label">Readiness Percentage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Privacy Information Banner */}
        <div className="alert alert-info mb-4">
          <div className="alert-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div className="alert-content">
            <strong>Data Privacy Explanation:</strong> Your saved information is stored locally in this browser using LocalStorage. DocuReady does not upload your document records to a server. Note that clearing your browser cache or site data will remove your locally stored records.
          </div>
        </div>

        {/* Settings & Local Data Management Box */}
        <div className="content-box mb-5">
          <h2 className="mb-3">Settings & Data Backup</h2>
          <p className="text-muted mb-4">
            Export your document records and custom checklists to JSON for safe-keeping, or restore previously backed-up data.
          </p>

          <div className="grid grid-3 gap-3">
            <div className="settings-action-card">
              <h4>Export Backup</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Download all saved data as a <code>.json</code> backup file.
              </p>
              <button
                className="btn btn-outline btn-block mt-3"
                id="export-data-btn"
                onClick={onExportData}
              >
                📥 Export My Data (JSON)
              </button>
            </div>

            <div className="settings-action-card">
              <h4>Restore Backup</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Import previously exported JSON file to restore records.
              </p>
              <label
                className="btn btn-outline btn-block mt-3"
                style={{ cursor: 'pointer' }}
              >
                📤 Import My Data (JSON)
                <input
                  type="file"
                  id="import-data-file"
                  accept=".json"
                  className="hidden"
                  onChange={onImportData}
                />
              </label>
            </div>

            <div className="settings-action-card">
              <h4>Clear All Data</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Permanently wipe all local storage records from browser.
              </p>
              <button
                className="btn btn-outline btn-block mt-3 text-danger"
                id="clear-all-data-btn"
                onClick={onClearAllData}
              >
                🗑️ Clear All Local Data
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="content-box mb-5">
          <h2 className="mb-4">Frequently Asked Questions</h2>
          <div className="faq-accordion-group">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="faq-chevron"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Architecture Note */}
        <div className="tech-note-card">
          <div className="tnote-header">
            <span className="badge badge-primary">Technical Overview</span>
            <h3>Architecture & Student Developer Notes</h3>
          </div>
          <p className="mb-3">
            DocuReady is engineered using modern{' '}
            <strong>React 19, Vanilla CSS3, and LocalStorage</strong> to deliver high performance, instant component reactivity, and zero external backend dependencies.
          </p>
          <div className="grid grid-2 gap-3 mt-3">
            <div className="roadmap-block">
              <h5>Current Architecture</h5>
              <ul>
                <li>✅ React Component & Hook Architecture</li>
                <li>✅ LocalStorage Persistence & JSON Backup Engine</li>
                <li>✅ Requirement Matcher & Format Tracker</li>
                <li>✅ Pure CSS Design System & Print Engine</li>
              </ul>
            </div>
            <div className="roadmap-block">
              <h5>Future Upgrade Path</h5>
              <ul>
                <li>🚀 Node.js / Database Cloud Integration</li>
                <li>🚀 Printable PDF Generator</li>
                <li>🚀 AI-Powered Document Verifier</li>
                <li>🚀 Native Mobile Apps (React Native)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
