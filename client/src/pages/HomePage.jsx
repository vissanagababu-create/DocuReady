import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import OnboardingBanner from '../components/OnboardingBanner';

export default function HomePage({
  services = [],
  onboardingDone,
  onCompleteOnboarding,
  onDismissOnboarding,
  myDocuments,
  favorites,
  recentProcesses,
  checklists,
  lastProcessId,
  reminders,
  onNavigate,
  onToggleFavorite
}) {
  const activeServices = services && services.length > 0 ? services : SERVICES_DATA;

  // Hero interactive checklist state
  const [heroChecks, setHeroChecks] = useState([true, true, true, false]);
  const heroItems = [
    'Student ID Card',
    'Application Form',
    'Passport Photo',
    'Fee Receipt (Copy)'
  ];

  const toggleHeroCheck = (index) => {
    const next = [...heroChecks];
    next[index] = !next[index];
    setHeroChecks(next);
  };

  const heroCheckedCount = heroChecks.filter(Boolean).length;
  const heroTotal = heroChecks.length;
  const heroPercent = Math.round((heroCheckedCount / heroTotal) * 100);

  // Last process calculations
  const lastProcess =
    activeServices.find((p) => p.id === lastProcessId) || activeServices[0];
  const lastChecked = checklists[lastProcess.id] || [];
  const lastReqTotal = lastProcess.required ? lastProcess.required.length : 0;
  const lastPercent =
    lastReqTotal > 0 ? Math.round((lastChecked.length / lastReqTotal) * 100) : 0;

  return (
    <section id="home" className="page-section active">
      {/* First Visit Onboarding Banner */}
      {!onboardingDone && (
        <OnboardingBanner
          onStart={onCompleteOnboarding}
          onDismiss={onDismissOnboarding}
        />
      )}

      {/* Hero Banner */}
      <div className="hero-section">
        <div className="container hero-container">
          <div className="hero-text-content">
            <div className="badge badge-accent mb-3">
              <span className="pulse-dot"></span> SMART PREPARATION TOOL
            </div>
            <h1 className="hero-headline">Know What You Need Before You Go.</h1>
            <p className="hero-description">
              DocuReady helps you prepare the documents you may need before visiting a college, office, bank, employer or other organization.
            </p>
            <div className="hero-cta-group">
              <a
                href="#services"
                className="btn btn-lg btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
              >
                Check Requirements
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a
                href="#about"
                className="btn btn-lg btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
              >
                How It Works
              </a>
            </div>

            <div className="hero-disclaimer-box">
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
                <strong>General Guidance:</strong> Requirements may vary by location and organization. Always verify final requirements directly with the relevant organization.
              </span>
            </div>
          </div>

          {/* Hero Visual Interactive Preview Card */}
          <div className="hero-visual-content">
            <div className="visual-card-wrapper">
              <div className="visual-card">
                <div className="visual-card-header">
                  <div className="vcard-title-group">
                    <span className="vcard-tag">College / University</span>
                    <h3>Bonafide Certificate Preview</h3>
                  </div>
                  <span
                    className={`vcard-status-badge ${
                      heroPercent === 100 ? 'ready' : 'partial'
                    }`}
                  >
                    {heroPercent === 100
                      ? 'Ready to verify (100%)'
                      : `Partially ready (${heroPercent}%)`}
                  </span>
                </div>
                <div className="visual-progress-bar">
                  <div
                    className="vbar-fill"
                    style={{ width: `${heroPercent}%` }}
                  ></div>
                </div>

                <div className="visual-checklist-list">
                  {heroItems.map((item, idx) => (
                    <label
                      key={idx}
                      className={`vcheck-item ${heroChecks[idx] ? 'checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className="hero-check-input"
                        checked={heroChecks[idx]}
                        onChange={() => toggleHeroCheck(idx)}
                        aria-label={item}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>

                <div className="visual-card-footer">
                  <span className="vfooter-msg">
                    {heroPercent === 100
                      ? '⚡ All 4 preview items checked! Ready to verify.'
                      : `⚡ ${heroCheckedCount} of ${heroTotal} items checked. ${
                          heroTotal - heroCheckedCount
                        } item remaining.`}
                  </span>
                </div>
              </div>

              {/* Floating Accent Badge */}
              <div className="floating-badge badge-1">
                <div className="fbadge-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <strong>Local & Private</strong>
                  <span>Stored on your device</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized User Readiness Dashboard Summary */}
      <div className="container mt-5">
        <div id="home-user-dashboard">
          <div className="user-dashboard-card mb-4">
            <div className="udash-header">
              <div>
                <span className="badge badge-accent mb-1">PREPARATION DASHBOARD</span>
                <h2>Welcome Back to DocuReady</h2>
              </div>
              <a
                href="#mydocuments"
                className="btn btn-sm btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('mydocuments');
                }}
              >
                Manage Vault
              </a>
            </div>

            <div className="grid grid-4 gap-3 mt-3">
              <div className="udash-stat-box">
                <span className="udash-stat-num">{myDocuments.length}</span>
                <span className="udash-stat-label">Saved Documents</span>
              </div>
              <div className="udash-stat-box">
                <span className="udash-stat-num">{favorites.length}</span>
                <span className="udash-stat-label">Bookmarked Services</span>
              </div>
              <div className="udash-stat-box">
                <span
                  className={`udash-stat-num ${
                    reminders.length > 0 ? 'text-warning' : ''
                  }`}
                >
                  {reminders.length}
                </span>
                <span className="udash-stat-label">In-App Reminders</span>
              </div>
              <div className="udash-stat-box">
                <span className="udash-stat-num text-primary">{lastPercent}%</span>
                <span className="udash-stat-label">Last Checklist Score</span>
              </div>
            </div>

            {/* Resume Checklist Banner */}
            <div className="udash-resume-bar mt-4">
              <div>
                <span
                  className="text-muted"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}
                >
                  Continue Where You Left Off
                </span>
                <h4 style={{ margin: '0.2rem 0 0' }}>
                  {lastProcess.title} ({lastPercent}% Prepared)
                </h4>
              </div>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onNavigate('checklist', null, lastProcess.id)}
              >
                Resume Checklist →
              </button>
            </div>

            {/* Recently Used Chips */}
            {recentProcesses.length > 0 && (
              <div className="udash-quick-row mt-3">
                <div className="udash-chip-group">
                  <span
                    className="text-muted"
                    style={{ fontSize: '0.775rem', fontWeight: 700 }}
                  >
                    RECENTLY USED:
                  </span>
                  {recentProcesses.map((id) => {
                    const p = activeServices.find((x) => x.id === id);
                    if (!p) return null;
                    return (
                      <button
                        key={id}
                        className="chip-btn"
                        onClick={() => onNavigate('checklist', null, p.id)}
                      >
                        🕒 {p.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="features-section">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Everything You Need for a Smooth Visit</h2>
            <p className="section-subtitle">
              Designed to turn confusing requirement lists into simple, actionable steps.
            </p>
          </div>

          <div className="grid grid-3 gap-4">
            <div className="feature-card">
              <div className="feature-icon icon-blue">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <h3 className="feature-title">Know What You Need</h3>
              <p className="feature-text">
                Access general checklists for common tasks across colleges, banks, employers, and government offices.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon icon-emerald">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Track What You Have</h3>
              <p className="feature-text">
                Use your personal Document Vault to record Originals, Photocopies, Digital scans, and Expiry dates.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon icon-purple">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">Check Your Readiness</h3>
              <p className="feature-text">
                Get an instant readiness score, format warnings, and a final "Check Before I Go" review before visiting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step How It Works Flow */}
      <div className="how-it-works-section py-4">
        <div className="container">
          <div className="section-header text-center mb-4">
            <span className="badge badge-accent mb-2">SIMPLE FLOW</span>
            <h2 className="section-title">How DocuReady Works</h2>
          </div>
          <div className="grid grid-4 gap-3">
            <div className="step-card">
              <div className="step-num">01</div>
              <h4>Choose a process</h4>
              <p>Browse categories like College, Banking, Jobs, Government, or Address Services.</p>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <h4>Review requirements</h4>
              <p>Examine mandatory and optional documents along with helpful "Why?" explanations.</p>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <h4>Check what you have</h4>
              <p>Tick off items you possess and cross-check format status with your local Document Vault.</p>
            </div>
            <div className="step-card">
              <div className="step-num">04</div>
              <h4>Check your readiness</h4>
              <p>View your completion percentage and clear "Check Before I Go" summary before your visit.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Popular Processes Showcase */}
      <div className="popular-section">
        <div className="container">
          <div className="popular-box">
            <div className="popular-header">
              <div>
                <span className="badge badge-primary mb-2">Frequently Used</span>
                <h3>Popular Checklists</h3>
              </div>
              <a
                href="#services"
                className="link-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
              >
                View All Services →
              </a>
            </div>
            <div className="grid grid-4 gap-3 mt-4" id="quick-popular-grid">
              {activeServices.slice(0, 4).map((item) => {
                const isFav = favorites.includes(item.id);
                const reqCount = item.required
                  ? item.required.length
                  : item.requiredDocuments
                  ? item.requiredDocuments.length
                  : 0;
                return (
                  <div
                    key={item.id}
                    className="process-card mini"
                    onClick={() => onNavigate('checklist', null, item.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="pcard-header-row">
                      <span className="pcard-category-tag">{item.categoryName}</span>
                      <button
                        className={`star-fav-btn ${isFav ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item.id);
                        }}
                        title="Bookmark process"
                      >
                        {isFav ? '★' : '☆'}
                      </button>
                    </div>
                    <h4>{item.title || item.name}</h4>
                    <p>{item.shortDesc || item.description}</p>
                    <div className="process-card-bottom mt-2">
                      <span className="pcard-count">{reqCount} required</span>
                      <span className="link-btn">Check →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
