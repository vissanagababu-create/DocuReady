import React from 'react';

export default function Footer({ onNavigate }) {
  const handleLink = (e, page, category = null) => {
    e.preventDefault();
    onNavigate(page, category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer">
      <div className="container footer-container">
        <div className="footer-brand-col">
          <a
            href="#home"
            className="brand-logo footer-logo"
            onClick={(e) => handleLink(e, 'home')}
          >
            <div className="logo-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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
          <p className="footer-tagline">Know what you need before you go.</p>
          <p className="footer-disclaimer-sm">
            <strong>Disclaimer:</strong> DocuReady provides general preparation guidance. Requirements may vary by organization, location and process. Always verify the final requirements with the relevant organization.
          </p>
        </div>

        <div className="footer-links-col">
          <h4>Navigation</h4>
          <ul>
            <li>
              <a href="#home" onClick={(e) => handleLink(e, 'home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleLink(e, 'services')}>
                All Services
              </a>
            </li>
            <li>
              <a href="#mydocuments" onClick={(e) => handleLink(e, 'mydocuments')}>
                My Document Vault
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleLink(e, 'about')}>
                About & Data
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Popular Categories</h4>
          <ul>
            <li>
              <a
                href="#services"
                onClick={(e) => handleLink(e, 'services', 'college')}
              >
                College / University
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleLink(e, 'services', 'banking')}
              >
                Banking & KYC
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleLink(e, 'services', 'jobs')}
              >
                Jobs & Employment
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleLink(e, 'services', 'govt')}
              >
                Government Services
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; 2026 DocuReady. General document preparation assistant.</p>
          <span className="footer-build-badge">v2.0 React Edition</span>
        </div>
      </div>
    </footer>
  );
}
