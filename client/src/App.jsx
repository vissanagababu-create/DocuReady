import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SERVICES_DATA } from './data/servicesData';
import { fetchServicesApi, adaptBackendService } from './services/api';
import {
  STORAGE_KEYS,
  loadInitialDocuments,
  loadInitialFavorites,
  loadInitialRecent,
  loadInitialCustomChecklists,
  loadInitialChecklists,
  loadInitialOnboarding,
  generateInAppReminders
} from './utils/storage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CompareModal from './components/CompareModal';
import CheckBeforeGoModal from './components/CheckBeforeGoModal';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ChecklistPage from './pages/ChecklistPage';
import MyDocumentsPage from './pages/MyDocumentsPage';
import AboutPage from './pages/AboutPage';

function getInitialRoute() {
  const hash = (typeof window !== 'undefined' ? window.location.hash.substring(1) : '') || 'home';
  let page = hash;
  let procId = null;

  if (hash.includes('?')) {
    const parts = hash.split('?');
    page = parts[0];
    const params = new URLSearchParams(parts[1]);
    procId = params.get('id');
  }

  const validPages = ['home', 'services', 'checklist', 'mydocuments', 'about'];
  if (!validPages.includes(page)) {
    page = 'home';
  }

  if (!procId) {
    try {
      procId = localStorage.getItem(STORAGE_KEYS.LAST_PROCESS) || 'passport-application';
    } catch {
      procId = 'passport-application';
    }
  }

  return { page, procId };
}

export default function App() {
  const initialRoute = useMemo(() => getInitialRoute(), []);

  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [activeProcessId, setActiveProcessId] = useState(initialRoute.procId);
  const [activeCategory, setActiveCategory] = useState('all');

  // Services API State (fetched from http://localhost:5000/api/services)
  const [services, setServices] = useState(() =>
    SERVICES_DATA.map((s, i) => adaptBackendService(s, i))
  );
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);
  const [isApiConnected, setIsApiConnected] = useState(false);

  // Application Data State
  const [myDocuments, setMyDocuments] = useState(loadInitialDocuments);
  const [favorites, setFavorites] = useState(loadInitialFavorites);
  const [recentProcesses, setRecentProcesses] = useState(loadInitialRecent);
  const [customChecklists, setCustomChecklists] = useState(loadInitialCustomChecklists);
  const [checklists, setChecklists] = useState(loadInitialChecklists);
  const [onboardingDone, setOnboardingDone] = useState(loadInitialOnboarding);

  // Modals & Notifications
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckBeforeGoOpen, setIsCheckBeforeGoOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Initial load from Express REST API
  useEffect(() => {
    let isMounted = true;
    fetchServicesApi()
      .then((data) => {
        if (!isMounted) return;
        if (data && data.services && data.services.length > 0) {
          setServices(data.services);
          setIsApiConnected(true);
          setActiveProcessId((prev) => {
            const match = data.services.find(
              (s) => s.id === prev || s.id.startsWith(prev) || prev.startsWith(s.id)
            );
            return match ? match.id : data.services[0].id;
          });
        } else {
          setServices([]);
          setIsApiConnected(true);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('Backend API unavailable, using offline fallback:', err);
        setServicesError(
          'Could not connect to Express API at http://localhost:5000/api/services. Displaying offline cached services.'
        );
        setIsApiConnected(false);
        setServices(SERVICES_DATA.map((s, i) => adaptBackendService(s, i)));
      })
      .finally(() => {
        if (isMounted) {
          setServicesLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Retry handler for user action
  const handleRetryFetch = () => {
    setServicesLoading(true);
    setServicesError(null);
    fetchServicesApi()
      .then((data) => {
        if (data && data.services && data.services.length > 0) {
          setServices(data.services);
          setIsApiConnected(true);
        }
      })
      .catch((err) => {
        console.warn('Backend API retry failed:', err);
        setServicesError(
          'Could not connect to Express API at http://localhost:5000/api/services. Displaying offline cached services.'
        );
      })
      .finally(() => {
        setServicesLoading(false);
      });
  };

  // Toast helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(myDocuments));
    } catch (e) {
      console.error('Error saving documents:', e);
    }
  }, [myDocuments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentProcesses));
    } catch (e) {
      console.error('Error saving recent processes:', e);
    }
  }, [recentProcesses]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_CHECKLISTS,
        JSON.stringify(customChecklists)
      );
    } catch (e) {
      console.error('Error saving custom checklists:', e);
    }
  }, [customChecklists]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(checklists));
    } catch (e) {
      console.error('Error saving checklists:', e);
    }
  }, [checklists]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.ONBOARDING,
        onboardingDone ? 'true' : 'false'
      );
    } catch (e) {
      console.error('Error saving onboarding state:', e);
    }
  }, [onboardingDone]);

  // Handle URL Hash Navigation
  const parseHash = useCallback(() => {
    const hash = window.location.hash.substring(1) || 'home';
    let page = hash;
    let procId = null;

    if (hash.includes('?')) {
      const parts = hash.split('?');
      page = parts[0];
      const params = new URLSearchParams(parts[1]);
      procId = params.get('id');
    }

    const validPages = ['home', 'services', 'checklist', 'mydocuments', 'about'];
    if (!validPages.includes(page)) {
      page = 'home';
    }

    setCurrentPage(page);

    if (procId) {
      setActiveProcessId(procId);
      localStorage.setItem(STORAGE_KEYS.LAST_PROCESS, procId);
      setRecentProcesses((prev) => [procId, ...prev.filter((id) => id !== procId)].slice(0, 5));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  const navigateTo = (page, category = null, processId = null) => {
    if (category) {
      setActiveCategory(category);
    }
    if (processId) {
      setActiveProcessId(processId);
      localStorage.setItem(STORAGE_KEYS.LAST_PROCESS, processId);
      setRecentProcesses((prev) => [processId, ...prev.filter((id) => id !== processId)].slice(0, 5));
      window.location.hash = `#checklist?id=${processId}`;
    } else {
      window.location.hash = `#${page}`;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Favorites toggle
  const handleToggleFavorite = (processId) => {
    setFavorites((prev) => {
      let next;
      if (prev.includes(processId)) {
        next = prev.filter((id) => id !== processId);
        showToast('Removed from Favorites.');
      } else {
        next = [...prev, processId];
        showToast('Added to Favorites!');
      }
      return next;
    });
  };

  // Checklist items toggle
  const handleToggleChecklistItem = (procId, itemId) => {
    setChecklists((prev) => {
      const currentChecked = prev[procId] || [];
      let updated;
      if (currentChecked.includes(itemId)) {
        updated = currentChecked.filter((id) => id !== itemId);
      } else {
        updated = [...currentChecked, itemId];
      }
      // Also write legacy key for compatibility
      localStorage.setItem(
        'docuready_checklist_progress_' + procId,
        JSON.stringify(updated)
      );
      return { ...prev, [procId]: updated };
    });
  };

  const handleResetChecklist = (procId, title) => {
    if (
      window.confirm(
        `Are you sure you want to reset the checklist for "${title}"?\n\nThis will uncheck all items. Your "My Documents" vault will NOT be changed.`
      )
    ) {
      setChecklists((prev) => {
        const next = { ...prev, [procId]: [] };
        localStorage.setItem(
          'docuready_checklist_progress_' + procId,
          JSON.stringify([])
        );
        return next;
      });
      showToast(`Checklist for "${title}" has been reset.`);
    }
  };

  // My Documents handlers
  const handleAddDocument = (newDoc) => {
    const exists = myDocuments.some(
      (d) => d.title.toLowerCase() === newDoc.title.toLowerCase()
    );
    if (exists) {
      showToast(`"${newDoc.title}" is already in your vault!`);
      return;
    }

    const docRecord = {
      ...newDoc,
      id: 'doc_' + Date.now(),
      createdAt: new Date().toISOString()
    };

    setMyDocuments((prev) => [docRecord, ...prev]);
    showToast(`Added "${newDoc.title}" to Vault!`);
  };

  const handleToggleDocFormat = (docId, formatKey) => {
    setMyDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return { ...doc, [formatKey]: !doc[formatKey] };
        }
        return doc;
      })
    );
  };

  const handleToggleDocStatus = (docId) => {
    setMyDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const nextStatus = doc.status === 'available' ? 'missing' : 'available';
          showToast(`Updated status for "${doc.title}"`);
          return { ...doc, status: nextStatus };
        }
        return doc;
      })
    );
  };

  const handleDeleteDocument = (docId, title) => {
    if (
      window.confirm(
        `Are you sure you want to remove "${title}" from your vault?`
      )
    ) {
      setMyDocuments((prev) => prev.filter((d) => d.id !== docId));
      showToast(`Removed "${title}" from Vault.`);
    }
  };

  // Custom Checklists handlers
  const handleCreateCustomChecklist = (title) => {
    const newChk = {
      id: 'custom_' + Date.now(),
      title,
      createdAt: new Date().toISOString(),
      items: [
        { id: 'ci_1', title: 'General Identification Copy', completed: false },
        { id: 'ci_2', title: 'Passport Photograph Set', completed: false }
      ]
    };
    setCustomChecklists((prev) => [newChk, ...prev]);
    showToast(`Created custom checklist "${title}"!`);
  };

  const handleAddCustomChecklistItem = (chkId, itemTitle) => {
    setCustomChecklists((prev) =>
      prev.map((chk) => {
        if (chk.id === chkId) {
          return {
            ...chk,
            items: [
              ...chk.items,
              {
                id: 'ci_' + Date.now(),
                title: itemTitle,
                completed: false
              }
            ]
          };
        }
        return chk;
      })
    );
    showToast('Added requirement item!');
  };

  const handleToggleCustomChecklistItem = (chkId, itemId) => {
    setCustomChecklists((prev) =>
      prev.map((chk) => {
        if (chk.id === chkId) {
          return {
            ...chk,
            items: chk.items.map((i) =>
              i.id === itemId ? { ...i, completed: !i.completed } : i
            )
          };
        }
        return chk;
      })
    );
  };

  const handleDeleteCustomChecklistItem = (chkId, itemId) => {
    setCustomChecklists((prev) =>
      prev.map((chk) => {
        if (chk.id === chkId) {
          return {
            ...chk,
            items: chk.items.filter((i) => i.id !== itemId)
          };
        }
        return chk;
      })
    );
  };

  const handleDeleteCustomChecklist = (chkId, title) => {
    if (
      window.confirm(
        `Are you sure you want to delete custom checklist "${title}"?`
      )
    ) {
      setCustomChecklists((prev) => prev.filter((c) => c.id !== chkId));
      showToast('Deleted personal checklist.');
    }
  };

  // Copy Summary
  const handleCopySummary = (processId = activeProcessId) => {
    const process =
      services.find((p) => p.id === processId) || activeProcess;
    if (!process) return;

    const savedChecked = checklists[processId] || [];
    const totalReq = process.required ? process.required.length : 0;
    const completedReq = process.required.filter((i) =>
      savedChecked.includes(i.id)
    );
    const missingReq = process.required.filter(
      (i) => !savedChecked.includes(i.id)
    );
    const percent =
      totalReq > 0 ? Math.round((completedReq.length / totalReq) * 100) : 100;

    let text = `DocuReady Preparation Summary\n`;
    text += `Process: ${process.title}\n`;
    text += `Category: ${process.categoryName}\n`;
    text += `Readiness Score: ${percent}%\n`;
    text += `Completed: ${completedReq.length} of ${totalReq} required items\n\n`;

    if (completedReq.length > 0) {
      text += `✓ PREPARED ITEMS:\n`;
      completedReq.forEach((i) => {
        text += `  - ${i.title}\n`;
      });
      text += `\n`;
    }

    if (missingReq.length > 0) {
      text += `⚠ STILL TO PREPARE:\n`;
      missingReq.forEach((i) => {
        text += `  - ${i.title} (${i.note})\n`;
      });
      text += `\n`;
    }

    text += `Reminder: DocuReady provides general guidance. Always verify current requirements directly with the relevant organization.`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => showToast('Summary copied to clipboard!'))
        .catch(() => {
          fallbackCopyText(text);
        });
    } else {
      fallbackCopyText(text);
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Summary copied to clipboard!');
    } catch {
      showToast('Unable to copy summary automatically.');
    }
    document.body.removeChild(textArea);
  };

  // Export / Import / Clear Data
  const handleExportData = () => {
    const backupObject = {
      app: 'DocuReady',
      version: '2.0',
      timestamp: new Date().toISOString(),
      myDocuments,
      favorites,
      recentProcesses,
      customChecklists,
      checklists,
      lastProcess: activeProcessId
    };

    const jsonStr = JSON.stringify(backupObject, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `docuready_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Data backup exported successfully!');
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const parsed = JSON.parse(event.target.result);
        if (
          !parsed ||
          (!parsed.myDocuments &&
            !parsed.favorites &&
            !parsed.customChecklists &&
            !parsed.app)
        ) {
          showToast('Invalid DocuReady JSON backup file.');
          return;
        }

        if (parsed.myDocuments && Array.isArray(parsed.myDocuments)) {
          setMyDocuments(parsed.myDocuments);
        }

        if (parsed.favorites && Array.isArray(parsed.favorites)) {
          setFavorites(parsed.favorites);
        }

        if (parsed.recentProcesses && Array.isArray(parsed.recentProcesses)) {
          setRecentProcesses(parsed.recentProcesses);
        }

        if (parsed.customChecklists && Array.isArray(parsed.customChecklists)) {
          setCustomChecklists(parsed.customChecklists);
        }

        if (parsed.checklists && typeof parsed.checklists === 'object') {
          setChecklists(parsed.checklists);
        }

        showToast('Data imported successfully!');
      } catch {
        showToast('Error parsing JSON file. Invalid backup format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearAllData = () => {
    if (
      window.confirm(
        '⚠️ WARNING: This will permanently delete all your saved document records, custom checklists, and favorites from this browser.\n\nAre you sure you want to clear all data?'
      )
    ) {
      localStorage.clear();
      setMyDocuments([]);
      setFavorites([]);
      setRecentProcesses([]);
      setCustomChecklists([]);
      setChecklists({});
      setOnboardingDone(false);
      showToast('All local data cleared!');
    }
  };

  // Reminders calculation
  const reminders = useMemo(() => {
    return generateInAppReminders(myDocuments, checklists, services);
  }, [myDocuments, checklists, services]);

  const activeProcess =
    services && services.length > 0
      ? services.find(
          (p) =>
            p.id === activeProcessId ||
            p.id.startsWith(activeProcessId) ||
            activeProcessId.startsWith(p.id)
        ) || services[0]
      : null;

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      <main className="main-content">
        {currentPage === 'home' && (
          <HomePage
            services={services}
            onboardingDone={onboardingDone}
            onCompleteOnboarding={() => {
              setOnboardingDone(true);
              navigateTo('services');
            }}
            onDismissOnboarding={() => setOnboardingDone(true)}
            myDocuments={myDocuments}
            favorites={favorites}
            recentProcesses={recentProcesses}
            checklists={checklists}
            lastProcessId={activeProcessId}
            reminders={reminders}
            onNavigate={navigateTo}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            servicesLoading={servicesLoading}
            servicesError={servicesError}
            isApiConnected={isApiConnected}
            onRetryFetch={handleRetryFetch}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            favorites={favorites}
            checklists={checklists}
            onNavigate={navigateTo}
            onToggleFavorite={handleToggleFavorite}
            onOpenCompare={() => setIsCompareOpen(true)}
          />
        )}

        {currentPage === 'checklist' && (
          <ChecklistPage
            process={activeProcess}
            checklists={checklists}
            myDocuments={myDocuments}
            favorites={favorites}
            onNavigate={navigateTo}
            onToggleFavorite={handleToggleFavorite}
            onToggleChecklistItem={handleToggleChecklistItem}
            onResetChecklist={handleResetChecklist}
            onOpenCheckBeforeGo={() => setIsCheckBeforeGoOpen(true)}
            onCopySummary={() => handleCopySummary(activeProcessId)}
          />
        )}

        {currentPage === 'mydocuments' && (
          <MyDocumentsPage
            myDocuments={myDocuments}
            customChecklists={customChecklists}
            reminders={reminders}
            onAddDocument={handleAddDocument}
            onToggleDocFormat={handleToggleDocFormat}
            onToggleDocStatus={handleToggleDocStatus}
            onDeleteDocument={handleDeleteDocument}
            onCreateCustomChecklist={handleCreateCustomChecklist}
            onAddCustomChecklistItem={handleAddCustomChecklistItem}
            onToggleCustomChecklistItem={handleToggleCustomChecklistItem}
            onDeleteCustomChecklistItem={handleDeleteCustomChecklistItem}
            onDeleteCustomChecklist={handleDeleteCustomChecklist}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onExportData={handleExportData}
            onImportData={handleImportData}
            onClearAllData={handleClearAllData}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Modals */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        services={services}
      />

      <CheckBeforeGoModal
        isOpen={isCheckBeforeGoOpen}
        process={activeProcess}
        checkedItems={checklists[activeProcessId] || []}
        myDocuments={myDocuments}
        onClose={() => setIsCheckBeforeGoOpen(false)}
      />

      {/* Toast Notification */}
      <Toast toast={toastMessage} />
    </>
  );
}
