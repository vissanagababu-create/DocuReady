/**
 * DocuReady Storage & Utilities Helper Module
 */

export const STORAGE_KEYS = {
  DOCUMENTS: "docuready_documents",
  CHECKLISTS: "docuready_checklists",
  FAVORITES: "docuready_favorites",
  RECENT: "docuready_recent",
  CUSTOM_CHECKLISTS: "docuready_custom_checklists",
  ONBOARDING: "docuready_onboarding",
  LAST_PROCESS: "docuready_last_process",
  CHECKLIST_NOTES_PREFIX: "docuready_checklist_notes_"
};

export function getFutureDateISO(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

export function formatDateHuman(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function getExpiryStatus(expiryDateStr) {
  if (!expiryDateStr) {
    return { status: "none", label: "No expiry date added", badgeClass: "expiry-none", daysLeft: null };
  }

  const expDate = new Date(expiryDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expDate.setHours(0, 0, 0, 0);

  const diffTime = expDate - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    const pastDays = Math.abs(daysLeft);
    return {
      status: "expired",
      label: `❌ Expired ${pastDays} day${pastDays > 1 ? "s" : ""} ago (${formatDateHuman(expiryDateStr)})`,
      badgeClass: "expiry-expired",
      daysLeft
    };
  } else if (daysLeft <= 30) {
    return {
      status: "expiring_soon",
      label: `⚠ Expires in ${daysLeft} day${daysLeft > 1 ? "s" : ""} (${formatDateHuman(expiryDateStr)})`,
      badgeClass: "expiry-warning",
      daysLeft
    };
  } else {
    return {
      status: "valid",
      label: `✓ Valid until ${formatDateHuman(expiryDateStr)}`,
      badgeClass: "expiry-valid",
      daysLeft
    };
  }
}

export function generateInAppReminders(myDocuments = [], checklists = {}, servicesData = []) {
  const reminders = [];

  // 1. Check Document Expiry & Format Reminders
  myDocuments.forEach(doc => {
    if (doc.expiryDate) {
      const expStatus = getExpiryStatus(doc.expiryDate);
      if (expStatus.status === "expired") {
        reminders.push({
          id: "rem_exp_" + doc.id,
          title: doc.title,
          type: "expired",
          text: `Document has EXPIRED (${expStatus.label}). Consider applying for renewal.`,
          icon: "❌"
        });
      } else if (expStatus.status === "expiring_soon") {
        reminders.push({
          id: "rem_exp_soon_" + doc.id,
          title: doc.title,
          type: "expiring_soon",
          text: `${expStatus.label}. Prepare update documents soon.`,
          icon: "⏳"
        });
      }
    }

    if (doc.status === "available" && doc.hasDigital && (!doc.hasOriginal && !doc.hasPhotocopy)) {
      reminders.push({
        id: "rem_fmt_" + doc.id,
        title: doc.title,
        type: "format_needed",
        text: `Recorded as Digital Scan only. Print a physical photocopy before visiting offices.`,
        icon: "🖨️"
      });
    }
  });

  // 2. Check Incomplete Checklists
  servicesData.forEach(p => {
    const savedChecked = checklists[p.id] || [];
    const reqTotal = p.required ? p.required.length : 0;
    if (savedChecked.length > 0 && savedChecked.length < reqTotal) {
      const remaining = reqTotal - savedChecked.length;
      reminders.push({
        id: "rem_chk_" + p.id,
        title: `${p.title} Checklist`,
        type: "incomplete_checklist",
        text: `${savedChecked.length} of ${reqTotal} mandatory items checked. ${remaining} remaining.`,
        icon: "📝",
        processId: p.id
      });
    }
  });

  return reminders;
}

export function checkVaultMatchDetailed(itemTitle, myDocuments = []) {
  if (!itemTitle || !myDocuments || myDocuments.length === 0) {
    return { status: "not_found", hasOriginal: false, hasPhotocopy: false, hasDigital: false };
  }

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normTitle = normalize(itemTitle);

  const aliases = {
    "studentidcard": ["studentid", "collegeidcard", "collegeid", "studentcard"],
    "aadharcard": ["aadhar", "aadhaar", "aadhaarcard"],
    "pancard": ["pan"],
    "passportphoto": ["passportphotos", "passportsizepicture", "photo"],
    "feereceipt": ["paidfeereceipt", "receipt"],
    "10thclassmarksheet": ["10thmarksheet", "10thcertificate", "sscmarksheet"],
    "incomecertificate": ["incomecert"]
  };

  const matchedDoc = myDocuments.find(doc => {
    const normDoc = normalize(doc.title);
    if (normDoc === normTitle || normDoc.includes(normTitle) || normTitle.includes(normDoc)) {
      return true;
    }
    for (const [key, aliasList] of Object.entries(aliases)) {
      if (normTitle.includes(key) || aliasList.some(a => normTitle.includes(a))) {
        if (normDoc.includes(key) || aliasList.some(a => normDoc.includes(a))) {
          return true;
        }
      }
    }
    return false;
  });

  if (matchedDoc) {
    return {
      status: matchedDoc.status || "available",
      hasOriginal: matchedDoc.hasOriginal !== false,
      hasPhotocopy: matchedDoc.hasPhotocopy !== false,
      hasDigital: matchedDoc.hasDigital !== false,
      docTitle: matchedDoc.title,
      expiryDate: matchedDoc.expiryDate
    };
  }

  return { status: "not_found", hasOriginal: false, hasPhotocopy: false, hasDigital: false };
}

export function loadInitialDocuments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || localStorage.getItem("docuready_my_documents");
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.map(doc => ({
        ...doc,
        hasOriginal: doc.hasOriginal !== undefined ? doc.hasOriginal : (doc.status === "available"),
        hasPhotocopy: doc.hasPhotocopy !== undefined ? doc.hasPhotocopy : (doc.status === "available"),
        hasDigital: doc.hasDigital !== undefined ? doc.hasDigital : true,
        expiryDate: doc.expiryDate || "",
        issueDate: doc.issueDate || ""
      }));
    }
  } catch (e) {
    console.error("Error loading documents from storage:", e);
  }

  // Seed default vault
  return [
    { id: "seed_1", title: "Aadhar Card", category: "Identity & Address", notes: "Original in folder + 2 copies", status: "available", hasOriginal: true, hasPhotocopy: true, hasDigital: true, expiryDate: "", issueDate: "2018-05-12", createdAt: new Date().toISOString() },
    { id: "seed_2", title: "10th Class Marksheet", category: "Educational", notes: "Original marksheet certificate", status: "available", hasOriginal: true, hasPhotocopy: true, hasDigital: true, expiryDate: "", issueDate: "2019-06-01", createdAt: new Date().toISOString() },
    { id: "seed_3", title: "Income Certificate", category: "Financial & Bank", notes: "Annual revenue certificate", status: "available", hasOriginal: true, hasPhotocopy: false, hasDigital: true, expiryDate: getFutureDateISO(15), issueDate: "2025-10-01", createdAt: new Date().toISOString() }
  ];
}

export function loadInitialFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : ["bonafide", "scholarship-app"];
  } catch {
    return ["bonafide", "scholarship-app"];
  }
}

export function loadInitialRecent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENT) || localStorage.getItem("docuready_recent_processes");
    return raw ? JSON.parse(raw) : ["bonafide", "account-opening"];
  } catch {
    return ["bonafide", "account-opening"];
  }
}

export function loadInitialCustomChecklists() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CHECKLISTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error loading custom checklists:", e);
  }

  return [
    {
      id: "custom_1",
      title: "My Internship Onboarding",
      createdAt: new Date().toISOString(),
      items: [
        { id: "c1", title: "Resume (2 Copies)", completed: true },
        { id: "c2", title: "College ID & Bonafide", completed: true },
        { id: "c3", title: "Offer Letter Signed Copy", completed: false },
        { id: "c4", title: "Bank Account Passbook Copy", completed: false }
      ]
    }
  ];
}

export function loadInitialChecklists() {
  const result = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    if (raw) {
      Object.assign(result, JSON.parse(raw));
    }
    // Also check for legacy progress keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("docuready_checklist_progress_")) {
        const processId = key.replace("docuready_checklist_progress_", "");
        if (!result[processId]) {
          try {
            result[processId] = JSON.parse(localStorage.getItem(key));
          } catch {}
        }
      }
    }
  } catch (e) {
    console.error("Error loading checklists:", e);
  }
  return result;
}

export function loadInitialOnboarding() {
  try {
    return (localStorage.getItem(STORAGE_KEYS.ONBOARDING) === "true") || (localStorage.getItem("docuready_onboarding_done") === "true");
  } catch {
    return false;
  }
}

export function getChecklistNote(processId, itemId) {
  try {
    return localStorage.getItem(STORAGE_KEYS.CHECKLIST_NOTES_PREFIX + processId + "_" + itemId) || "";
  } catch {
    return "";
  }
}

export function saveChecklistNote(processId, itemId, noteText) {
  try {
    const key = STORAGE_KEYS.CHECKLIST_NOTES_PREFIX + processId + "_" + itemId;
    if (noteText) {
      localStorage.setItem(key, noteText);
    } else {
      localStorage.removeItem(key);
    }
  } catch (e) {
    console.error("Error saving note:", e);
  }
}
