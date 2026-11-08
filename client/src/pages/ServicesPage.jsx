import React, { useState, useMemo } from 'react';
import { getCategorySlug } from '../services/api';

export default function ServicesPage({
  services = [],
  servicesLoading = false,
  servicesError = null,
  isApiConnected = false,
  onRetryFetch,
  activeCategory,
  setActiveCategory,
  favorites,
  checklists,
  onNavigate,
  onToggleFavorite,
  onOpenCompare
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryTabs = [
    { id: 'all', label: 'All Categories' },
    { id: 'favorites', label: '★ Favorites' },
    { id: 'college', label: 'College / University' },
    { id: 'banking', label: 'Banking' },
    { id: 'jobs', label: 'Jobs / Employment' },
    { id: 'govt', label: 'Government Services' },
    { id: 'rental', label: 'Rental / Address' },
    { id: 'scholarship', label: 'Scholarships' }
  ];

  const filteredServices = useMemo(() => {
    return (services || []).filter((item) => {
      // Category filter
      if (activeCategory === 'favorites') {
        if (!favorites.includes(item.id)) return false;
      } else if (activeCategory !== 'all') {
        const itemCatSlug = item.category || getCategorySlug(item.categoryName);
        if (itemCatSlug !== activeCategory) {
          return false;
        }
      }

      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase().trim();
      const titleMatch = (item.title || item.name || '').toLowerCase().includes(term);
      const descMatch = (item.shortDesc || item.description || '').toLowerCase().includes(term);
      const catMatch = (item.categoryName || item.category || '').toLowerCase().includes(term);
      
      const reqMatch = (item.required || []).some(
        (r) =>
          (r.title || '').toLowerCase().includes(term) ||
          (r.note && r.note.toLowerCase().includes(term))
      );
      const rawReqMatch = (item.requiredDocuments || []).some((d) =>
        typeof d === 'string'
          ? d.toLowerCase().includes(term)
          : (d.title || d.name || '').toLowerCase().includes(term)
      );

      return titleMatch || descMatch || catMatch || reqMatch || rawReqMatch;
    });
  }, [services, activeCategory, favorites, searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setActiveCategory('all');
  };

  return (
    <section id="services" className="page-section active">
      <div className="container py-4">
        {/* Page Title Header */}
        <div className="section-header">
          <div className="badge badge-accent mb-2">Service Library</div>
          <div className="srv-header-flex">
            <div>
              <h1 className="page-headline">Select a Process to Get Started</h1>
              <p className="page-subheadline">
                Browse categorized services below or use search to locate specific process requirements.
              </p>
            </div>
            <button
              className="btn btn-outline btn-sm"
              id="open-compare-btn"
              onClick={onOpenCompare}
            >
              ⚖️ Compare Processes
            </button>
          </div>
        </div>

        {/* API Connection & Health Status Badge */}
        {isApiConnected && (
          <div
            className="alert mb-3"
            style={{
              padding: '0.5rem 0.85rem',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              borderRadius: '8px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981'
                }}
              ></span>
              <span>
                <strong>Express API Connected:</strong> Showing {services.length} live services from{' '}
                <code>http://localhost:5000/api/services</code>
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>REST API v1.0.0</span>
          </div>
        )}

        {/* Backend Error Alert with Retry button */}
        {servicesError && (
          <div
            className="alert alert-warning mb-3"
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              <div>
                <strong>Backend Connection Notice:</strong> {servicesError}
              </div>
            </div>
            {onRetryFetch && (
              <button
                className="btn btn-sm btn-outline"
                style={{ backgroundColor: '#fff' }}
                onClick={onRetryFetch}
              >
                🔄 Retry Connection
              </button>
            )}
          </div>
        )}

        {/* General Guidance Disclaimer */}
        <div className="alert alert-info mb-4" role="alert">
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
            <strong>General Guidance Disclaimer:</strong> DocuReady provides general preparation guidance. Requirements may vary by organization, location and process. Always verify the final requirements with the relevant organization.
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="filter-controls-wrapper mb-4">
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
              id="services-search-input"
              placeholder="Search by title, category, keywords or document name..."
              aria-label="Search processes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                id="clear-services-search"
                title="Clear search"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            )}
          </div>

          <div className="category-tabs-scroll" id="category-tabs-container">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-chip ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {servicesLoading ? (
          <div className="text-center py-5" style={{ padding: '3rem 0', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔄</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Loading Services...</h3>
            <p className="text-muted">Fetching document requirements from the Express API...</p>
          </div>
        ) : filteredServices.length > 0 ? (
          /* Process Cards Grid */
          <div className="grid grid-3 gap-4" id="services-grid">
            {filteredServices.map((item) => {
              const reqCount = item.required
                ? item.required.length
                : item.requiredDocuments
                ? item.requiredDocuments.length
                : 0;
              const savedChecked = checklists[item.id] || [];
              const completedCount = savedChecked.length;
              const isStarted = completedCount > 0;
              const progressPercent =
                reqCount > 0 ? Math.round((completedCount / reqCount) * 100) : 0;
              const isFav = favorites.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="process-card"
                  onClick={() => onNavigate('checklist', null, item.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View checklist for ${item.title || item.name}`}
                >
                  <div className="process-card-top">
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
                    <h3>{item.title || item.name}</h3>
                    <p>{item.shortDesc || item.description}</p>
                    {item.processingTime && (
                      <div className="mt-2" style={{ fontSize: '0.775rem', color: 'var(--text-muted, #64748b)' }}>
                        ⏱ <strong>Processing:</strong> {item.processingTime}
                      </div>
                    )}
                  </div>
                  <div className="process-card-bottom">
                    <span className="pcard-count">
                      {isStarted ? (
                        <span className="text-success" style={{ fontWeight: 700 }}>
                          {completedCount}/{reqCount} Required ({progressPercent}%)
                        </span>
                      ) : (
                        `${reqCount} required documents`
                      )}
                    </span>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('checklist', null, item.id);
                      }}
                    >
                      View Checklist
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state" id="services-empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No matching processes found.</h3>
            <p>Try searching for a different keyword or select another category tab.</p>
            <button
              className="btn btn-outline btn-sm mt-3"
              id="reset-services-filter"
              onClick={handleClearSearch}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
