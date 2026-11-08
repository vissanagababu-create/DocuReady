import React from 'react';

export default function OnboardingBanner({ onStart, onDismiss }) {
  return (
    <div id="onboarding-banner" className="onboarding-banner">
      <div className="container ob-container">
        <div className="ob-text">
          <strong>👋 Welcome to DocuReady!</strong>
          <span>
            1. Choose a process &nbsp;|&nbsp; 2. Review requirements &nbsp;|&nbsp; 3. Track your documents &nbsp;|&nbsp; 4. Check your readiness
          </span>
        </div>
        <div className="ob-actions">
          <button className="btn btn-sm btn-primary" onClick={onStart}>
            Get Started
          </button>
          <button className="btn btn-sm btn-outline" onClick={onDismiss}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
