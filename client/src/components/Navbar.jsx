import React, { useState } from 'react';

export default function Navbar({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (e, page, category = null) => {
    e.preventDefault();
    onNavigate(page, category);
    setMobileOpen(false);
  };

  const isLinkActive = (page) => {
    if (currentPage === page) return true;
    if (page === 'services' && currentPage === 'checklist') return true;
    return false;
  };

  return (
    <header className="navbar-header">
      <div className="container nav-container">
        <a
          href="#home"
          className="brand-logo"
          id="brand-logo-link"
          aria-label="DocuReady Homepage"
          onClick={(e) => handleLinkClick(e, 'home')}
        >
          <div className="logo-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="m9 15 2 2 4-4"></path>
            </svg>
          </div>
          <span className="brand-name">
            Docu<span className="brand-highlight">Ready</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a
            href="#home"
            className={`nav-link ${isLinkActive('home') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'home')}
          >
            Home
          </a>
          <a
            href="#services"
            className={`nav-link ${isLinkActive('services') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'services')}
          >
            Services
          </a>
          <a
            href="#mydocuments"
            className={`nav-link ${isLinkActive('mydocuments') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'mydocuments')}
          >
            My Documents
          </a>
          <a
            href="#about"
            className={`nav-link ${isLinkActive('about') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'about')}
          >
            About & Data
          </a>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="nav-actions">
          <a
            href="#services"
            className="btn btn-sm btn-primary header-cta"
            onClick={(e) => handleLinkClick(e, 'services')}
          >
            Find Checklist
          </a>
          <button
            className={`mobile-toggle ${mobileOpen ? 'is-open' : ''}`}
            id="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-close"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`} id="mobile-drawer">
        <div className="mobile-nav-links">
          <a
            href="#home"
            className={`mobile-nav-link ${isLinkActive('home') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'home')}
          >
            Home
          </a>
          <a
            href="#services"
            className={`mobile-nav-link ${isLinkActive('services') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'services')}
          >
            Services & Processes
          </a>
          <a
            href="#mydocuments"
            className={`mobile-nav-link ${isLinkActive('mydocuments') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'mydocuments')}
          >
            My Documents Vault
          </a>
          <a
            href="#about"
            className={`mobile-nav-link ${isLinkActive('about') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'about')}
          >
            About & Settings
          </a>
        </div>
        <div className="mobile-drawer-footer">
          <a
            href="#services"
            className="btn btn-primary btn-block"
            onClick={(e) => handleLinkClick(e, 'services')}
          >
            Check Requirements Now
          </a>
        </div>
      </div>
    </header>
  );
}
