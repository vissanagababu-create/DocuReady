/**
 * ============================================================================
 * DocuReady — Main JavaScript Application File (v2.0 Stability & Fix Edition)
 * Pure Vanilla JS (ES6+) Architecture for Document Preparation & Storage
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. DATA STRUCTURE: Predefined Services Database with Priorities & Tips
// ----------------------------------------------------------------------------
const SERVICES_DATA = [
  // --- COLLEGE / UNIVERSITY ---
  {
    id: "bonafide",
    category: "college",
    categoryName: "College / University",
    title: "Bonafide Certificate",
    shortDesc: "Certificate issued by educational institutions confirming student enrollment.",
    required: [
      { id: "b1", title: "Student ID Card", priority: "high", note: "Original student ID card or official ID copy", why: "May be used to verify your identity and active student status at the institution.", prepTip: "Keep the original physical card in your wallet or front folder pouch." },
      { id: "b2", title: "Application Form", priority: "high", note: "Filled and signed by student", why: "Required by college administration to process your official request.", prepTip: "Fill all mandatory fields in clear black or blue ink before submitting." },
      { id: "b3", title: "Passport Photo", priority: "medium", note: "Recent color photo with white background", why: "May be required for identification or attaching to the application/certificate record.", prepTip: "Consider keeping a set of 4 recent physical photos ready in your pouch." },
      { id: "b4", title: "Fee Receipt", priority: "medium", note: "Copy of paid fee receipt or transaction reference", why: "Confirms active enrollment and fee clearance for the current academic semester.", prepTip: "Keep a digital PDF copy on your phone in addition to the printed receipt." }
    ],
    optional: [
      { id: "bo1", title: "Previous Reference Number", priority: "low", note: "If applying online via student portal", why: "Helps administration quickly locate your existing online request file.", prepTip: "Note down the portal reference code on the top corner of your form." }
    ],
    notes: [
      "Carry original Student ID card for verification at the administrative office.",
      "Ensure fee receipt shows your current academic semester and roll number.",
      "Processing typically takes 1 to 3 working days depending on office workload."
    ]
  },
  {
    id: "college-id",
    category: "college",
    categoryName: "College / University",
    title: "College ID Card Application",
    shortDesc: "Issuance of new or replacement student identification smart card.",
    required: [
      { id: "cid1", title: "Admission Letter", priority: "high", note: "Official allotment order or admission confirmation", why: "Proves official admission approval into your specific college program.", prepTip: "Keep both original allotment letter and 2 photocopies ready." },
      { id: "cid2", title: "Government Photo ID", priority: "high", note: "Aadhar card, Passport, or Driving License", why: "Used for primary identity verification before issuing institutional credentials.", prepTip: "Verify that your name spelling on Govt ID matches your admission letter." },
      { id: "cid3", title: "Passport Photos", priority: "high", note: "2 recent studio photos in formal attire", why: "Used to print your physical student ID card and record in register.", prepTip: "Write your name and roll number on the back of photos with soft pencil." },
      { id: "cid4", title: "ID Application Form", priority: "medium", note: "Obtained from college office or student portal", why: "Captures your emergency contact, blood group, and student profile data.", prepTip: "Verify your emergency mobile number before handing over." }
    ],
    optional: [
      { id: "cido1", title: "Police FIR Report", priority: "high", note: "Required ONLY if applying for a lost duplicate ID card", why: "Serves as legal proof that your previous ID card was lost or stolen.", prepTip: "Ensure FIR contains exact lost date and card number." },
      { id: "cido2", title: "Reissue Fee Receipt", priority: "medium", note: "Applicable for duplicate ID reissue", why: "Proof of payment for duplicate card printing costs.", prepTip: "Pay at accounts counter and attach original payment challan." }
    ],
    notes: [
      "Write your Roll Number and Name on the back of all submitted photographs.",
      "Duplicate ID reissue may require a lost report copy depending on college rules."
    ]
  },
  {
    id: "transfer-cert",
    category: "college",
    categoryName: "College / University",
    title: "Transfer Certificate (TC)",
    shortDesc: "Official document required when leaving an institution or graduating.",
    required: [
      { id: "tc1", title: "No Dues Clearance", priority: "high", note: "Signed by Library, Labs, Hostel & Accounts", why: "Ensures all institutional assets, books, and pending fees are cleared.", prepTip: "Obtain clearance signatures department by department in advance." },
      { id: "tc2", title: "Original College ID Card", priority: "high", note: "Must be surrendered to administrative office", why: "Surrendered to prevent misuse after leaving the college.", prepTip: "Take a photo of your ID card for memory before surrendering!" },
      { id: "tc3", title: "Final Marksheet / Degree Copy", priority: "medium", note: "Photocopy of course completion evidence", why: "Verifies academic eligibility and course completion status.", prepTip: "Attach self-attested copy of provisional certificate." },
      { id: "tc4", title: "Formal TC Request Letter", priority: "medium", note: "Addressed to the Principal or Registrar", why: "Acts as your written consent and formal application on record.", prepTip: "State the reason for TC clearly (e.g. Higher Studies or Employment)." }
    ],
    optional: [
      { id: "tco1", title: "New Institution Offer Letter", priority: "low", note: "Helpful if requesting urgent clearance", why: "Demonstrates deadline urgency for higher education joining.", prepTip: "Show offer letter copy if requesting fast-track issuance." }
    ],
    notes: [
      "Ensure all library books are returned and pending college/hostel fees are cleared beforehand.",
      "Surrendering your original Student ID card is standard procedure for receiving your TC."
    ]
  },

  // --- BANKING ---
  {
    id: "account-opening",
    category: "banking",
    categoryName: "Banking",
    title: "Bank Account Opening",
    shortDesc: "Documentation required for opening a new Savings or Current Bank Account.",
    required: [
      { id: "ao1", title: "Proof of Identity", priority: "high", note: "Aadhar Card, PAN Card, or Passport", why: "Mandatory under RBI/KYC guidelines to verify your legal identity.", prepTip: "Carry physical original document; bank officer will conduct VOA." },
      { id: "ao2", title: "Proof of Address", priority: "high", note: "Aadhar, Utility Bill (< 3 mos), or Rental Agreement", why: "Required to establish your physical residential address for bank correspondence.", prepTip: "Ensure utility bill is less than 90 days old." },
      { id: "ao3", title: "PAN Card / Form 60", priority: "high", note: "Mandatory for financial accounts", why: "Mandatory for tax compliance and high-value banking transactions.", prepTip: "If PAN is not issued yet, fill Form 60 provided at the counter." },
      { id: "ao4", title: "Passport Photos", priority: "medium", note: "2 recent color photos", why: "Attached to physical specimen signature cards and bank account records.", prepTip: "Sign across the photo edge if requested by bank staff." },
      { id: "ao5", title: "Initial Opening Deposit", priority: "medium", note: "Cash or cheque per minimum balance rules", why: "Funds the account to activate services and issue passbook/debit card.", prepTip: "Check minimum balance rules for urban vs rural branches." }
    ],
    optional: [
      { id: "aoo1", title: "Student / Employee ID Card", priority: "low", note: "For zero-balance student or salary accounts", why: "Qualifies you for special zero-balance account schemes.", prepTip: "Carry college/company ID to claim zero-balance waiver." },
      { id: "aoo2", title: "Nominee ID Copy", priority: "low", note: "For adding nominee details", why: "Used to register nominee details for legal account inheritance.", prepTip: "Keep nominee's Date of Birth and address details written down." }
    ],
    notes: [
      "Carry original documents as bank officials will perform Verification Against Original (VOA).",
      "Ensure your full name and date of birth match across PAN Card and Address proof."
    ]
  },
  {
    id: "kyc-update",
    category: "banking",
    categoryName: "Banking",
    title: "KYC Update / Re-KYC",
    shortDesc: "Periodic Know Your Customer document submission to unfreeze or update bank accounts.",
    required: [
      { id: "kyc1", title: "Filled KYC Update Form", priority: "high", note: "Available at bank branch counter", why: "Captures your updated personal details and declaration.", prepTip: "Fill account number clearly without overwriting." },
      { id: "kyc2", title: "Updated Address Proof", priority: "high", note: "Aadhar Card, Voter ID, or Utility Bill", why: "Confirms your current residence address for compliance.", prepTip: "Self-attest with signature and today's date." },
      { id: "kyc3", title: "PAN Card Copy", priority: "high", note: "Self-attested photocopy", why: "Verifies tax identification number against bank records.", prepTip: "Sign in middle of photocopy stating 'True Copy'." },
      { id: "kyc4", title: "Passport Photo", priority: "medium", note: "1 photo signed on back", why: "Updates bank customer photo profile in database.", prepTip: "Glue photo firmly; do not staple over your face." }
    ],
    optional: [
      { id: "kyco1", title: "Bank Passbook Original", priority: "low", note: "For updating address printed in passbook", why: "Allows bank clerk to print updated KYC details into passbook.", prepTip: "Request passbook printing at the counter after update." }
    ],
    notes: [
      "All submitted photocopies should be self-attested (signed by you with current date).",
      "If mobile number changed, request a Mobile Update Form simultaneously."
    ]
  },

  // --- JOBS / EMPLOYMENT ---
  {
    id: "job-application",
    category: "jobs",
    categoryName: "Jobs / Employment",
    title: "Job Application Submission",
    shortDesc: "Standard documents needed when applying for a professional role or interview.",
    required: [
      { id: "job1", title: "Updated Resume / CV", priority: "high", note: "2 printed copies", why: "Provides HR and interviewers with your work experience and skills summary.", prepTip: "Print on clean white A4 paper; avoid folded sheets." },
      { id: "job2", title: "Government Photo ID", priority: "high", note: "Aadhar, PAN, or Passport", why: "Verifies candidate identity prior to entering company premises or test.", prepTip: "Carry physical ID to security gate." },
      { id: "job3", title: "Educational Marksheets", priority: "medium", note: "10th, 12th, and Degree Certificate copies", why: "Validates educational qualifications listed on your resume.", prepTip: "Arrange certificates in chronological order." },
      { id: "job4", title: "Passport Photos", priority: "medium", note: "2 formal color photos", why: "Attached to interview evaluation sheets and visitor badges.", prepTip: "Dress in formal attire for photo." }
    ],
    optional: [
      { id: "jobo1", title: "Portfolio / Work Samples", priority: "low", note: "Printed project samples or GitHub link", why: "Demonstrates past project achievements and technical work quality.", prepTip: "Keep a tablet or printed binder ready." },
      { id: "jobo2", title: "Reference Letters", priority: "low", note: "From professors or former supervisors", why: "Provides professional endorsement of your character and work ethic.", prepTip: "Carry letters with contact email of referee." }
    ],
    notes: [
      "Keep digital PDF copies ready on your phone or drive in case digital sharing is requested.",
      "Ensure educational degree details align strictly with your resume timeline."
    ]
  },
  {
    id: "joining-docs",
    category: "jobs",
    categoryName: "Jobs / Employment",
    title: "Job Joining & HR Onboarding",
    shortDesc: "Documentation verification when officially joining a new organization.",
    required: [
      { id: "jnd1", title: "Signed Offer Letter", priority: "high", note: "Copy signed as official acceptance", why: "Confirms formal acceptance of employment terms and start date.", prepTip: "Sign each page if requested by HR." },
      { id: "jnd2", title: "Relieving Letter", priority: "high", note: "From immediate previous employer", why: "Proves clean resignation and release from previous company employment.", prepTip: "Ensure relieving date matches joining date." },
      { id: "jnd3", title: "Last 3 Months Salary Slips", priority: "high", note: "Pay slips or bank statement showing credit", why: "Validates prior compensation structure and employment authenticity.", prepTip: "Download official password-free PDFs." },
      { id: "jnd4", title: "PAN Card & Aadhar Card", priority: "high", note: "Originals + 2 self-attested copies", why: "Mandatory for payroll processing, tax deduction (TDS), and background check.", prepTip: "Self-attest 2 full copy sets." },
      { id: "jnd5", title: "Cancelled Cheque / Passbook", priority: "medium", note: "For salary account bank mapping", why: "Provides exact bank account number and IFSC code for monthly salary deposit.", prepTip: "Write 'CANCELLED' in bold letters across cheque." },
      { id: "jnd6", title: "Educational Certificates", priority: "medium", note: "Original 10th, 12th & Degree marksheets", why: "Used by HR background verification (BGV) team to verify credentials.", prepTip: "Keep originals in a transparent file folder." }
    ],
    optional: [
      { id: "jndo1", title: "PF UAN Number", priority: "low", note: "For EPF transfer from prior company", why: "Transfers your Provident Fund account balance seamlessly.", prepTip: "Log into EPFO portal to confirm active UAN status." },
      { id: "jndo2", title: "Medical Fitness Certificate", priority: "low", note: "From certified medical practitioner", why: "Ensures fitness for work roles requiring physical clearance.", prepTip: "Get signed by MBBS doctor with official seal." }
    ],
    notes: [
      "HR teams usually perform background verification (BGV) against these submitted documents.",
      "Do not leave original certificates with HR unless officially backed by a clear written receipt."
    ]
  },

  // --- GOVERNMENT SERVICES ---
  {
    id: "general-cert",
    category: "govt",
    categoryName: "Government Services",
    title: "General Certificate Application",
    shortDesc: "Applying for official certificates (Income, Community, Residence, or Birth).",
    required: [
      { id: "gc1", title: "Proof of Identity", priority: "high", note: "Aadhar Card or Ration Card", why: "Establishes applicant identity in government database.", prepTip: "Ensure Aadhar mobile number is active for OTP." },
      { id: "gc2", title: "Address Proof", priority: "high", note: "Electricity bill, Property tax receipt, or Aadhar", why: "Proves residency jurisdiction under the local administration circle.", prepTip: "Attach current municipal tax receipt." },
      { id: "gc3", title: "Self-Declaration Affidavit", priority: "medium", note: "Signed affidavit on stamp paper if required", why: "Legally binding statement confirming accuracy of submitted details.", prepTip: "Notarize on Rs. 20/50 stamp paper if required." },
      { id: "gc4", title: "Passport Photos", priority: "medium", note: "2 recent color photos", why: "Affixed onto the official certificate document.", prepTip: "Use plain background photos." }
    ],
    optional: [
      { id: "gco1", title: "Parents' Certificate Copies", priority: "low", note: "Helps accelerate Community or Caste verification", why: "Accelerates verification of ancestral revenue records.", prepTip: "Attach father's/mother's community certificate copy." }
    ],
    notes: [
      "Applications are processed through local e-Seva / Citizen Service Centers or state portals.",
      "Carry original Aadhar card for biometric e-KYC authentication."
    ]
  },
  {
    id: "address-service",
    category: "govt",
    categoryName: "Government Services",
    title: "Address Correction / Update Service",
    shortDesc: "Updating your residential address in official government registries.",
    required: [
      { id: "addr1", title: "Supporting Address Proof", priority: "high", note: "Registered Rent Agreement, Utility Bill, or Passbook", why: "Serves as official evidence of your new residential address.", prepTip: "Make sure door number and pincode are printed clearly." },
      { id: "addr2", title: "Existing ID Document", priority: "high", note: "Current Aadhar or Passport copy", why: "Verifies current identity before updating demographic record.", prepTip: "Attach self-attested copy of existing card." },
      { id: "addr3", title: "Update Request Form", priority: "medium", note: "Duly filled in block letters", why: "Captures new address details to be updated in registry database.", prepTip: "Fill new address in CAPITAL LETTERS." }
    ],
    optional: [
      { id: "addro1", title: "Gazetted Officer Certificate", priority: "low", note: "If standard utility/rent proof unavailable", why: "Acts as official attestation when standard address utility bills are absent.", prepTip: "Obtain official seal & signature on prescribed format." }
    ],
    notes: [
      "Ensure address spelling, door number, pincode, and landmark match perfectly on your proof document.",
      "Utility bills used as address proof generally must be less than 3 months old."
    ]
  },

  // --- SCHOLARSHIPS ---
  {
    id: "scholarship-app",
    category: "scholarship",
    categoryName: "Scholarships",
    title: "Scholarship Application",
    shortDesc: "Document packet for Merit, Means, or Government Scholarship schemes.",
    required: [
      { id: "sch1", title: "Income Certificate", priority: "high", note: "Issued by competent revenue authority", why: "Verifies family annual income eligibility under means-based scholarship limits.", prepTip: "Ensure certificate is valid for current financial year." },
      { id: "sch2", title: "Academic Marksheet", priority: "high", note: "Previous qualifying examination marksheet", why: "Verifies academic performance and cut-off percentage criteria.", prepTip: "Attach clear photocopy showing total grade points." },
      { id: "sch3", title: "College Bonafide / Admission Receipt", priority: "high", note: "Proof of active student enrollment", why: "Proves current active enrollment in recognized educational institution.", prepTip: "Get bonafide signed by Principal with college stamp." },
      { id: "sch4", title: "Aadhar Linked with Mobile", priority: "high", note: "Required for Direct Benefit Transfer (DBT)", why: "Mandatory for Aadhaar-seeded Direct Benefit Transfer (DBT) grant credit.", prepTip: "Verify Aadhaar seeding status with your bank." },
      { id: "sch5", title: "Bank Passbook Copy", priority: "medium", note: "Showing Account No., IFSC, and Name", why: "Ensures scholarship funds are deposited directly into valid student bank account.", prepTip: "Ensure account is active and not dormant." }
    ],
    optional: [
      { id: "scho1", title: "Caste / Community Certificate", priority: "medium", note: "If applying under reserved category quotas", why: "Required for category-specific scholarship schemes.", prepTip: "Attach permanent community certificate." },
      { id: "scho2", title: "Disability Certificate", priority: "low", note: "If applicable for specific grants", why: "Qualifies applicant for special disability grant reservations.", prepTip: "Attach UDID card or medical board certificate." }
    ],
    notes: [
      "Your bank account MUST be Aadhaar-seeded for scholarship Direct Benefit Transfer (DBT) credit.",
      "Upload clear scans if applying online; blurred documents result in application rejection."
    ]
  },

  // --- RENTAL / ADDRESS ---
  {
    id: "rental-agreement",
    category: "rental",
    categoryName: "Rental / Address",
    title: "Rental Agreement Execution",
    shortDesc: "Drafting and registering a residential or commercial lease agreement.",
    required: [
      { id: "ra1", title: "Tenant Identity & Address Proof", priority: "high", note: "Aadhar Card, PAN Card, or Passport copy", why: "Verifies identity and permanent address of tenant.", prepTip: "Self-attest tenant ID copies." },
      { id: "ra2", title: "Landlord Identity Proof", priority: "high", note: "Aadhar Card or PAN Card copy", why: "Verifies identity and ownership status of property owner.", prepTip: "Obtain owner's self-attested ID copy." },
      { id: "ra3", title: "Stamp Paper", priority: "high", note: "Non-judicial stamp paper of appropriate denomination", why: "Legal stamp duty payment required for legally enforceable agreement.", prepTip: "Check state stamp duty amount rules." },
      { id: "ra4", title: "Property Tax Receipt", priority: "medium", note: "Copy provided by property owner", why: "Confirms property ownership and official municipal address details.", prepTip: "Verify house door number matches." }
    ],
    optional: [
      { id: "rao1", title: "Witness Photo IDs", priority: "low", note: "2 witnesses required during notary signing", why: "Witnesses attest signature authenticity during agreement execution.", prepTip: "Carry 2 witness ID copies." },
      { id: "rao2", title: "Passport Photos of Both Parties", priority: "low", note: "1 photo each attached to agreement", why: "Affixed onto physical rental contract document.", prepTip: "Glue photo on lease execution page." }
    ],
    notes: [
      "Verify that rent amount, security deposit refund terms, notice period, and maintenance fees are clearly specified.",
      "Notarization or registration at the local Sub-Registrar office gives legal validity."
    ]
  },
  {
    id: "address-proof-prep",
    category: "rental",
    categoryName: "Rental / Address",
    title: "Address Proof Preparation",
    shortDesc: "Assembling valid proof of current residence for official applications.",
    required: [
      { id: "app1", title: "Primary Address Document", priority: "high", note: "Aadhar, Passport, Driving License, or Rent Agreement", why: "Serves as main evidence of residential address.", prepTip: "Ensure document shows full pincode." },
      { id: "app2", title: "Utility Bill Copy", priority: "high", note: "Electricity, Water, Piped Gas, or Broadband bill", why: "Proves active residency at the specified address within past 90 days.", prepTip: "Bill date must be under 3 months old." },
      { id: "app3", title: "Self-Attestation", priority: "medium", note: "Signature and date on copy stating 'True Copy'", why: "Confirms legal responsibility for authenticity of photocopy.", prepTip: "Sign in blue ink with date." }
    ],
    optional: [
      { id: "appo1", title: "Employer / University Residence Letter", priority: "low", note: "Formal letterhead confirming current address", why: "Provides institutional verification of hostel or company housing address.", prepTip: "Get warden or HR stamp." }
    ],
    notes: [
      "Utility bills must show clear statement date (less than 90 days old).",
      "Names on address proof must match identity proof character for character."
    ]
  }
];

// ----------------------------------------------------------------------------
// 2. LOCALSTORAGE KEYS & APP STATE
// ----------------------------------------------------------------------------
const STORAGE_KEYS = {
  DOCUMENTS: "docuready_documents",
  CHECKLISTS: "docuready_checklists",
  FAVORITES: "docuready_favorites",
  RECENT: "docuready_recent",
  CUSTOM_CHECKLISTS: "docuready_custom_checklists",
  ONBOARDING: "docuready_onboarding",
  LAST_PROCESS: "docuready_last_process",
  CHECKLIST_NOTES_PREFIX: "docuready_checklist_notes_"
};

let currentState = {
  activePage: "home",
  activeCategory: "all",
  servicesSearchTerm: "",
  activeProcessId: null,
  vaultSearchTerm: "",
  vaultStatusFilter: "all",
  myDocuments: [],
  favorites: [],
  recentProcesses: [],
  customChecklists: [],
  onboardingDone: false
};

// Standard Storage Helper Functions
function getDocuments() {
  return currentState.myDocuments;
}
function saveDocuments(docs) {
  currentState.myDocuments = docs;
  try {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
  } catch (e) { console.error("Error saving documents:", e); }
}

function getFavorites() {
  return currentState.favorites;
}
function saveFavorites(favs) {
  currentState.favorites = favs;
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
  } catch (e) { console.error("Error saving favorites:", e); }
}

function getRecentProcesses() {
  return currentState.recentProcesses;
}
function saveRecentProcesses(recents) {
  currentState.recentProcesses = recents;
  try {
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recents));
  } catch (e) { console.error("Error saving recents:", e); }
}

function getChecklistProgress(processId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    if (raw) {
      const obj = JSON.parse(raw);
      if (obj[processId]) return obj[processId];
    }
    const legacy = localStorage.getItem("docuready_checklist_progress_" + processId);
    return legacy ? JSON.parse(legacy) : [];
  } catch (e) { return []; }
}

function saveChecklistProgress(processId, checkedArray) {
  try {
    let all = {};
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    if (raw) all = JSON.parse(raw);
    all[processId] = checkedArray;
    localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(all));
    localStorage.setItem("docuready_checklist_progress_" + processId, JSON.stringify(checkedArray));
  } catch (e) { console.error("Error saving checklist progress:", e); }
}

function getSavedChecklistProgress(processId) {
  return getChecklistProgress(processId);
}

// ----------------------------------------------------------------------------
// 3. APPLICATION INITIALIZATION
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Load stored state
  loadAllStorageData();

  // Initialize UI Event Handlers
  initNavigation();
  initServicesUI();
  initChecklistUI();
  initVaultUI();
  initAboutFAQUI();
  initCheckBeforeGoModal();
  initCompareModal();
  initCustomChecklistUI();
  initSettingsUI();
  initOnboardingUI();

  // Route URL Hash
  handleHashNavigation();

  // Render Dashboard & Showcase
  renderHomeDashboardOverview();
  renderPopularServicesHome();
  initHeroInteractiveChecklist();
});

// ----------------------------------------------------------------------------
// 4. STORAGE DATA LOAD & SAVE ENGINE
// ----------------------------------------------------------------------------
function loadAllStorageData() {
  // Load My Documents Vault
  try {
    const rawDocs = localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || localStorage.getItem("docuready_my_documents");
    if (rawDocs) {
      const parsed = JSON.parse(rawDocs);
      currentState.myDocuments = parsed.map(doc => ({
        ...doc,
        hasOriginal: doc.hasOriginal !== undefined ? doc.hasOriginal : (doc.status === "available"),
        hasPhotocopy: doc.hasPhotocopy !== undefined ? doc.hasPhotocopy : (doc.status === "available"),
        hasDigital: doc.hasDigital !== undefined ? doc.hasDigital : true,
        expiryDate: doc.expiryDate || "",
        issueDate: doc.issueDate || ""
      }));
    } else {
      // Seed default vault
      currentState.myDocuments = [
        { id: "seed_1", title: "Aadhar Card", category: "Identity & Address", notes: "Original in folder + 2 copies", status: "available", hasOriginal: true, hasPhotocopy: true, hasDigital: true, expiryDate: "", issueDate: "2018-05-12", createdAt: new Date().toISOString() },
        { id: "seed_2", title: "10th Class Marksheet", category: "Educational", notes: "Original marksheet certificate", status: "available", hasOriginal: true, hasPhotocopy: true, hasDigital: true, expiryDate: "", issueDate: "2019-06-01", createdAt: new Date().toISOString() },
        { id: "seed_3", title: "Income Certificate", category: "Financial & Bank", notes: "Annual revenue certificate", status: "available", hasOriginal: true, hasPhotocopy: false, hasDigital: true, expiryDate: getFutureDateISO(15), issueDate: "2025-10-01", createdAt: new Date().toISOString() }
      ];
      saveDocuments(currentState.myDocuments);
    }
  } catch (e) {
    console.error("Error loading documents:", e);
  }

  // Load Favorites
  try {
    const rawFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    currentState.favorites = rawFavs ? JSON.parse(rawFavs) : ["bonafide", "scholarship-app"];
  } catch (e) { currentState.favorites = []; }

  // Load Recent Processes
  try {
    const rawRecents = localStorage.getItem(STORAGE_KEYS.RECENT) || localStorage.getItem("docuready_recent_processes");
    currentState.recentProcesses = rawRecents ? JSON.parse(rawRecents) : ["bonafide", "account-opening"];
  } catch (e) { currentState.recentProcesses = []; }

  // Load Custom Checklists
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEYS.CUSTOM_CHECKLISTS);
    if (rawCustom) {
      currentState.customChecklists = JSON.parse(rawCustom);
    } else {
      currentState.customChecklists = [
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
      saveCustomChecklistsToStorage();
    }
  } catch (e) { currentState.customChecklists = []; }

  // Load Onboarding State
  currentState.onboardingDone = (localStorage.getItem(STORAGE_KEYS.ONBOARDING) === "true") || (localStorage.getItem("docuready_onboarding_done") === "true");
}

function saveCustomChecklistsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CHECKLISTS, JSON.stringify(currentState.customChecklists));
  } catch (e) { console.error("Error saving custom checklists:", e); }
}

function addRecentProcess(processId) {
  if (!processId) return;
  currentState.recentProcesses = [processId, ...currentState.recentProcesses.filter(id => id !== processId)].slice(0, 5);
  saveRecentProcesses(currentState.recentProcesses);
}

function toggleFavorite(processId) {
  if (!processId) return;
  if (currentState.favorites.includes(processId)) {
    currentState.favorites = currentState.favorites.filter(id => id !== processId);
    showToast("Removed from Favorites.");
  } else {
    currentState.favorites.push(processId);
    showToast("Added to Favorites!");
  }
  saveFavorites(currentState.favorites);
  
  if (currentState.activePage === "services") renderServicesGrid();
  renderHomeDashboardOverview();
}

// ----------------------------------------------------------------------------
// 5. EXPIRY DATE ENGINE & IN-APP REMINDERS
// ----------------------------------------------------------------------------
function getFutureDateISO(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

function getExpiryStatus(expiryDateStr) {
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

function formatDateHuman(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function generateInAppReminders() {
  const reminders = [];

  // 1. Check Document Expiry & Format Reminders
  currentState.myDocuments.forEach(doc => {
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
  SERVICES_DATA.forEach(p => {
    const savedChecked = getSavedChecklistProgress(p.id);
    const reqTotal = p.required.length;
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

// ----------------------------------------------------------------------------
// 6. ROUTER & NAVIGATION ENGINE
// ----------------------------------------------------------------------------
function initNavigation() {
  window.addEventListener("hashchange", handleHashNavigation);

  const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("is-open");
      mobileToggleBtn.classList.toggle("is-open", isOpen);
    });
  }

  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", (e) => {
      const targetPage = link.getAttribute("data-page");
      const targetCat = link.getAttribute("data-cat");

      if (targetCat) currentState.activeCategory = targetCat;

      if (mobileDrawer) {
        mobileDrawer.classList.remove("is-open");
        if (mobileToggleBtn) mobileToggleBtn.classList.remove("is-open");
      }
    });
  });
}

function handleHashNavigation() {
  const hash = window.location.hash.substring(1) || "home";
  
  let pageName = hash;
  let processId = null;

  if (hash.includes("?")) {
    const parts = hash.split("?");
    pageName = parts[0];
    const params = new URLSearchParams(parts[1]);
    processId = params.get("id");
  }

  const validPages = ["home", "services", "checklist", "mydocuments", "about"];
  if (!validPages.includes(pageName)) pageName = "home";

  currentState.activePage = pageName;
  if (processId) {
    currentState.activeProcessId = processId;
    localStorage.setItem(STORAGE_KEYS.LAST_PROCESS, processId);
    addRecentProcess(processId);
  }

  document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
  const activeSec = document.getElementById(pageName);
  if (activeSec) activeSec.classList.add("active");

  document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
    const linkPage = link.getAttribute("data-page");
    if (linkPage === pageName || (pageName === "checklist" && linkPage === "services")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (pageName === "home") {
    renderHomeDashboardOverview();
  } else if (pageName === "services") {
    renderServicesGrid();
  } else if (pageName === "checklist") {
    if (processId) {
      renderProcessChecklistPage(processId);
    } else {
      const lastId = localStorage.getItem(STORAGE_KEYS.LAST_PROCESS) || "bonafide";
      window.location.hash = `#checklist?id=${lastId}`;
    }
  } else if (pageName === "mydocuments") {
    renderVaultUI();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function navigateToChecklist(processId) {
  if (!processId) return;
  window.location.hash = `#checklist?id=${processId}`;
}

// ----------------------------------------------------------------------------
// 7. HOME DASHBOARD OVERVIEW & HERO ENGINE
// ----------------------------------------------------------------------------
function renderHomeDashboardOverview() {
  const container = document.getElementById("home-user-dashboard");
  if (!container) return;

  const savedDocsCount = currentState.myDocuments.length;
  const favCount = currentState.favorites.length;
  const reminders = generateInAppReminders();
  const lastProcessId = localStorage.getItem(STORAGE_KEYS.LAST_PROCESS) || "bonafide";
  const lastProcess = SERVICES_DATA.find(p => p.id === lastProcessId) || SERVICES_DATA[0];

  const lastChecked = getSavedChecklistProgress(lastProcess.id);
  const lastReqTotal = lastProcess.required.length;
  const lastPercent = lastReqTotal > 0 ? Math.round((lastChecked.length / lastReqTotal) * 100) : 0;

  container.innerHTML = `
    <div class="user-dashboard-card mb-4">
      <div class="udash-header">
        <div>
          <span class="badge badge-accent mb-1">PREPARATION DASHBOARD</span>
          <h2>Welcome Back to DocuReady</h2>
        </div>
        <a href="#mydocuments" class="btn btn-sm btn-outline" data-page="mydocuments">Manage Vault</a>
      </div>

      <div class="grid grid-4 gap-3 mt-3">
        <div class="udash-stat-box">
          <span class="udash-stat-num">${savedDocsCount}</span>
          <span class="udash-stat-label">Saved Documents</span>
        </div>
        <div class="udash-stat-box">
          <span class="udash-stat-num">${favCount}</span>
          <span class="udash-stat-label">Bookmarked Services</span>
        </div>
        <div class="udash-stat-box">
          <span class="udash-stat-num ${reminders.length > 0 ? 'text-warning' : ''}">${reminders.length}</span>
          <span class="udash-stat-label">In-App Reminders</span>
        </div>
        <div class="udash-stat-box">
          <span class="udash-stat-num text-primary">${lastPercent}%</span>
          <span class="udash-stat-label">Last Checklist Score</span>
        </div>
      </div>

      <!-- Resume Checklist Banner -->
      <div class="udash-resume-bar mt-4">
        <div>
          <span class="text-muted" style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Continue Where You Left Off</span>
          <h4 style="margin: 0.2rem 0 0;">${escapeHTML(lastProcess.title)} (${lastPercent}% Prepared)</h4>
        </div>
        <button class="btn btn-sm btn-primary" onclick="navigateToChecklist('${lastProcess.id}')">
          Resume Checklist →
        </button>
      </div>

      <!-- Recently Used & Favorites Quick Chips -->
      <div class="udash-quick-row mt-3">
        ${currentState.recentProcesses.length > 0 ? `
          <div class="udash-chip-group">
            <span class="text-muted" style="font-size: 0.775rem; font-weight: 700;">RECENTLY USED:</span>
            ${currentState.recentProcesses.map(id => {
              const p = SERVICES_DATA.find(x => x.id === id);
              return p ? `<button class="chip-btn" onclick="navigateToChecklist('${p.id}')">🕒 ${escapeHTML(p.title)}</button>` : "";
            }).join("")}
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

function renderPopularServicesHome() {
  const grid = document.getElementById("quick-popular-grid");
  if (!grid) return;

  const popular = SERVICES_DATA.slice(0, 4);

  grid.innerHTML = popular.map(item => {
    const isFav = currentState.favorites.includes(item.id);
    return `
      <div class="process-card mini" onclick="navigateToChecklist('${item.id}')" role="button" tabindex="0">
        <div class="pcard-header-row">
          <span class="pcard-category-tag">${escapeHTML(item.categoryName)}</span>
          <button class="star-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${item.id}')" title="Bookmark process">
            ${isFav ? '★' : '☆'}
          </button>
        </div>
        <h4>${escapeHTML(item.title)}</h4>
        <p>${escapeHTML(item.shortDesc)}</p>
        <div class="process-card-bottom mt-2">
          <span class="pcard-count">${item.required.length} required</span>
          <span class="link-btn">Check →</span>
        </div>
      </div>
    `;
  }).join("");
}

function initHeroInteractiveChecklist() {
  const container = document.querySelector(".visual-card");
  if (!container) return;

  const checkboxes = container.querySelectorAll(".hero-check-input");
  const fill = container.querySelector(".vbar-fill");
  const badge = container.querySelector(".vcard-status-badge");
  const footerMsg = container.querySelector(".vfooter-msg");

  function updateHeroPreview() {
    let checkedCount = 0;
    checkboxes.forEach(c => {
      if (c.checked) checkedCount++;
      const item = c.closest(".vcheck-item");
      if (item) item.classList.toggle("checked", c.checked);
    });

    const total = checkboxes.length;
    const percent = Math.round((checkedCount / total) * 100);

    if (fill) fill.style.width = `${percent}%`;
    if (badge) {
      if (percent === 100) {
        badge.textContent = "Ready to verify (100%)";
        badge.className = "vcard-status-badge ready";
      } else {
        badge.textContent = `Partially ready (${percent}%)`;
        badge.className = "vcard-status-badge partial";
      }
    }
    if (footerMsg) {
      const remaining = total - checkedCount;
      footerMsg.textContent = percent === 100
        ? "⚡ All 4 preview items checked! Ready to verify."
        : `⚡ ${checkedCount} of ${total} items checked. ${remaining} item remaining.`;
    }
  }

  checkboxes.forEach(c => {
    c.addEventListener("change", updateHeroPreview);
  });
}

// ----------------------------------------------------------------------------
// 8. SERVICES LIBRARY & SEARCH ENGINE
// ----------------------------------------------------------------------------
function initServicesUI() {
  const searchInput = document.getElementById("services-search-input");
  const clearBtn = document.getElementById("clear-services-search");
  const categoryContainer = document.getElementById("category-tabs-container");
  const resetBtn = document.getElementById("reset-services-filter");
  const compareBtn = document.getElementById("open-compare-btn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentState.servicesSearchTerm = e.target.value.toLowerCase().trim();
      if (clearBtn) clearBtn.classList.toggle("hidden", currentState.servicesSearchTerm === "");
      renderServicesGrid();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      currentState.servicesSearchTerm = "";
      clearBtn.classList.add("hidden");
      renderServicesGrid();
    });
  }

  if (categoryContainer) {
    categoryContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".tab-chip");
      if (chip) {
        const cat = chip.getAttribute("data-category");
        currentState.activeCategory = cat;

        categoryContainer.querySelectorAll(".tab-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        renderServicesGrid();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentState.activeCategory = "all";
      currentState.servicesSearchTerm = "";
      if (searchInput) searchInput.value = "";
      if (clearBtn) clearBtn.classList.add("hidden");
      if (categoryContainer) {
        categoryContainer.querySelectorAll(".tab-chip").forEach(c => c.classList.remove("active"));
        const allChip = categoryContainer.querySelector('[data-category="all"]');
        if (allChip) allChip.classList.add("active");
      }
      renderServicesGrid();
    });
  }

  if (compareBtn) {
    compareBtn.addEventListener("click", openCompareModal);
  }
}

function renderServicesGrid() {
  const grid = document.getElementById("services-grid");
  const emptyState = document.getElementById("services-empty-state");
  if (!grid) return;

  const filtered = SERVICES_DATA.filter(item => {
    // Favorites category filter
    if (currentState.activeCategory === "favorites") {
      if (!currentState.favorites.includes(item.id)) return false;
    } else if (currentState.activeCategory !== "all" && item.category !== currentState.activeCategory) {
      return false;
    }

    if (currentState.servicesSearchTerm === "") return true;

    // Advanced Multi-field Search (Name, Category, Description, Keywords)
    const term = currentState.servicesSearchTerm;
    const nameMatch = item.title.toLowerCase().includes(term);
    const descMatch = item.shortDesc.toLowerCase().includes(term);
    const catMatch = item.categoryName.toLowerCase().includes(term);
    const reqMatch = item.required.some(r => r.title.toLowerCase().includes(term) || (r.note && r.note.toLowerCase().includes(term)));

    return nameMatch || descMatch || catMatch || reqMatch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  grid.innerHTML = filtered.map(item => {
    const reqCount = item.required.length;
    const totalCount = reqCount + item.optional.length;
    const savedChecked = getSavedChecklistProgress(item.id);
    const completedCount = savedChecked.length;
    const isStarted = completedCount > 0;
    const progressPercent = reqCount > 0 ? Math.round((completedCount / reqCount) * 100) : 0;
    const isFav = currentState.favorites.includes(item.id);

    return `
      <div class="process-card" onclick="navigateToChecklist('${item.id}')" role="button" tabindex="0" aria-label="View checklist for ${escapeHTML(item.title)}">
        <div class="process-card-top">
          <div class="pcard-header-row">
            <span class="pcard-category-tag">${escapeHTML(item.categoryName)}</span>
            <button class="star-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${item.id}')" title="Bookmark process">
              ${isFav ? '★' : '☆'}
            </button>
          </div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.shortDesc)}</p>
        </div>
        <div class="process-card-bottom">
          <span class="pcard-count">
            ${isStarted ? `<span class="text-success" style="font-weight:700;">${completedCount}/${reqCount} Required (${progressPercent}%)</span>` : `${reqCount} required documents`}
          </span>
          <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); navigateToChecklist('${item.id}')">
            View Checklist
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// ----------------------------------------------------------------------------
// 9. PROCESS CHECKLIST, DASHBOARD & NOTES ENGINE
// ----------------------------------------------------------------------------
function initChecklistUI() {
  const backBtn = document.getElementById("back-to-services-btn");
  const resetBtn = document.getElementById("reset-current-checklist-btn");
  const printBtn = document.getElementById("print-checklist-btn");
  const copyBtn = document.getElementById("copy-summary-btn");

  if (backBtn) backBtn.addEventListener("click", () => { window.location.hash = "#services"; });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (currentState.activeProcessId) {
        const process = SERVICES_DATA.find(p => p.id === currentState.activeProcessId);
        const processName = process ? process.title : "this process";
        
        if (confirm(`Are you sure you want to reset the checklist for "${processName}"?\n\nThis will uncheck all items. Your "My Documents" vault will NOT be changed.`)) {
          saveChecklistProgress(currentState.activeProcessId, []);
          renderProcessChecklistPage(currentState.activeProcessId);
          showToast(`Checklist for "${processName}" has been reset.`);
        }
      }
    });
  }

  if (printBtn) printBtn.addEventListener("click", () => { window.print(); });
  if (copyBtn) copyBtn.addEventListener("click", () => { copyProcessSummaryToClipboard(currentState.activeProcessId); });
}

function renderProcessChecklistPage(processId) {
  const process = SERVICES_DATA.find(p => p.id === processId);
  if (!process) {
    window.location.hash = "#services";
    return;
  }

  currentState.activeProcessId = processId;
  const isFav = currentState.favorites.includes(processId);

  // Render Header Box
  const headerContainer = document.getElementById("checklist-header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <div class="chk-header-top">
        <span class="checklist-category-pill">${escapeHTML(process.categoryName)}</span>
        <div class="chk-header-btns">
          <button class="star-fav-btn lg ${isFav ? 'active' : ''}" onclick="toggleFavorite('${process.id}')" title="Bookmark this process">
            ${isFav ? '★ Favorited' : '☆ Bookmark'}
          </button>
          <button class="btn btn-sm btn-accent" id="open-check-before-go-btn">
            ✨ Check Before I Go
          </button>
        </div>
      </div>
      <h1>${escapeHTML(process.title)} Checklist</h1>
      <p>${escapeHTML(process.shortDesc)}</p>
      <div class="guidance-disclaimer-banner mt-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <span><strong>General Guidance Disclaimer:</strong> DocuReady provides general preparation guidance. Requirements may vary by organization, location and process. Always verify the final requirements with the relevant organization.</span>
      </div>
    `;

    const goBtn = document.getElementById("open-check-before-go-btn");
    if (goBtn) goBtn.addEventListener("click", () => openCheckBeforeGoModal(process));
  }

  // Load Saved Progress & Notes
  const savedChecked = getSavedChecklistProgress(processId);

  // Render Required Items
  const reqContainer = document.getElementById("required-items-list");
  const reqLabel = document.getElementById("required-count-label");

  if (reqLabel) reqLabel.textContent = `${process.required.length} items`;
  if (reqContainer) {
    reqContainer.innerHTML = process.required.map(item => {
      const isChecked = savedChecked.includes(item.id);
      const vaultMatch = checkVaultMatchDetailed(item.title);
      const userNote = getChecklistNote(processId, item.id);
      return renderCheckItemRow(item, isChecked, "required", vaultMatch, userNote);
    }).join("");
  }

  // Render Optional Items
  const optContainer = document.getElementById("optional-items-list");
  const optBoxContainer = document.getElementById("optional-box-container");
  const optLabel = document.getElementById("optional-count-label");

  if (process.optional && process.optional.length > 0) {
    if (optBoxContainer) optBoxContainer.classList.remove("hidden");
    if (optLabel) optLabel.textContent = `${process.optional.length} items`;
    if (optContainer) {
      optContainer.innerHTML = process.optional.map(item => {
        const isChecked = savedChecked.includes(item.id);
        const vaultMatch = checkVaultMatchDetailed(item.title);
        const userNote = getChecklistNote(processId, item.id);
        return renderCheckItemRow(item, isChecked, "optional", vaultMatch, userNote);
      }).join("");
    }
  } else {
    if (optBoxContainer) optBoxContainer.classList.add("hidden");
  }

  // Render Preparation Notes
  const prepNotesContainer = document.getElementById("checklist-prep-notes");
  if (prepNotesContainer) {
    prepNotesContainer.innerHTML = process.notes.map(note => `
      <li>${escapeHTML(note)}</li>
    `).join("");
  }

  // Attach Handlers
  attachCheckboxListeners(processId);
  attachWhyToggleListeners();
  attachChecklistNotesListeners(processId);

  // Update Progress & Dashboard Summary
  updateChecklistProgressSummary(process, savedChecked);
}

function attachCheckboxListeners(processId) {
  const container = document.getElementById("checklist");
  if (!container) return;

  const checkboxes = container.querySelectorAll(".custom-checkbox");
  checkboxes.forEach(chk => {
    chk.addEventListener("change", () => {
      const checkedIds = [];
      checkboxes.forEach(c => {
        if (c.checked) {
          const itemId = c.getAttribute("data-id");
          if (itemId) checkedIds.push(itemId);
        }
      });
      
      saveChecklistProgress(processId, checkedIds);
      
      const process = SERVICES_DATA.find(p => p.id === processId);
      if (process) {
        updateChecklistProgressSummary(process, checkedIds);
      }
      
      const row = chk.closest(".check-item-row");
      if (row) row.classList.toggle("is-checked", chk.checked);
    });
  });
}

function renderCheckItemRow(item, isChecked, type, vaultMatch, userNote) {
  let vaultBadgeHTML = "";
  
  if (vaultMatch.status === "available") {
    const formats = [];
    if (vaultMatch.hasOriginal) formats.push("Original");
    if (vaultMatch.hasPhotocopy) formats.push("Photocopy");
    if (vaultMatch.hasDigital) formats.push("Digital");

    if (vaultMatch.hasOriginal && vaultMatch.hasPhotocopy) {
      vaultBadgeHTML = `<span class="vault-badge available">✓ Recorded in Vault (${formats.join(", ")})</span>`;
    } else if (vaultMatch.hasDigital && !vaultMatch.hasOriginal && !vaultMatch.hasPhotocopy) {
      vaultBadgeHTML = `<span class="vault-badge format-warning">📱 Recorded Digitally in Vault — Physical copy may still be needed</span>`;
    } else {
      vaultBadgeHTML = `<span class="vault-badge available">✓ Recorded in Vault (${formats.join(", ")})</span>`;
    }
  } else if (vaultMatch.status === "missing") {
    vaultBadgeHTML = `<span class="vault-badge missing">⏳ Marked Missing in Vault</span>`;
  } else {
    vaultBadgeHTML = `<span class="vault-badge not-found">⚠ Not in My Documents <a href="#mydocuments" class="vault-link">Add to Vault</a></span>`;
  }

  // Priority Pill
  let priorityBadge = "";
  if (item.priority === "high") priorityBadge = `<span class="prio-pill prio-high" title="High Preparation Priority">🔴 High</span>`;
  else if (item.priority === "medium") priorityBadge = `<span class="prio-pill prio-med" title="Medium Preparation Priority">🟡 Medium</span>`;
  else priorityBadge = `<span class="prio-pill prio-low" title="Low Preparation Priority">🟢 Low</span>`;

  return `
    <div class="check-item-row ${isChecked ? "is-checked" : ""}" data-item-id="${item.id}">
      <div class="check-row-main">
        <input type="checkbox" class="custom-checkbox" data-id="${item.id}" id="chk_${item.id}" ${isChecked ? "checked" : ""} aria-label="${escapeHTML(item.title)}">
        <label for="chk_${item.id}" class="check-label-content">
          <div class="title-prio-flex">
            <span class="check-item-title">${escapeHTML(item.title)}</span>
            ${priorityBadge}
          </div>
          ${item.note ? `<p class="check-item-desc">${escapeHTML(item.note)}</p>` : ""}
        </label>
        <button type="button" class="btn-why-trigger" data-why-target="why_${item.id}" aria-label="Why is ${escapeHTML(item.title)} needed?">
          Why & Tip
        </button>
      </div>

      <!-- Expandable Why & Tip Box -->
      <div class="why-popover hidden" id="why_${item.id}">
        <div class="why-popover-inner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>
            <strong>Why it may be requested:</strong>
            <p>${escapeHTML(item.why || "Used for identity or administrative verification by the receiving office.")}</p>
            ${item.prepTip ? `<strong class="mt-2 block text-primary">💡 Preparation Tip:</strong><p>${escapeHTML(item.prepTip)}</p>` : ""}
          </div>
        </div>
      </div>

      <!-- Vault Matcher Badge & User Personal Note -->
      <div class="vault-indicator-row">
        ${vaultBadgeHTML}
        
        <div class="user-item-note-wrapper">
          <input type="text" class="item-note-input" data-item-id="${item.id}" placeholder="✏️ Add personal note (e.g. Get copy from accounts)..." value="${escapeHTML(userNote)}">
        </div>
      </div>
    </div>
  `;
}

function attachWhyToggleListeners() {
  document.querySelectorAll(".btn-why-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute("data-why-target");
      const popover = document.getElementById(targetId);
      if (popover) {
        const isHidden = popover.classList.toggle("hidden");
        btn.classList.toggle("active", !isHidden);
      }
    });
  });
}

function attachChecklistNotesListeners(processId) {
  document.querySelectorAll(".item-note-input").forEach(inp => {
    inp.addEventListener("change", () => {
      const itemId = inp.getAttribute("data-item-id");
      const text = inp.value.trim();
      saveChecklistNote(processId, itemId, text);
      showToast("Personal note saved!");
    });
  });
}

function getChecklistNote(processId, itemId) {
  try {
    return localStorage.getItem(STORAGE_KEYS.CHECKLIST_NOTES_PREFIX + processId + "_" + itemId) || "";
  } catch (e) { return ""; }
}

function saveChecklistNote(processId, itemId, noteText) {
  try {
    const key = STORAGE_KEYS.CHECKLIST_NOTES_PREFIX + processId + "_" + itemId;
    if (noteText) localStorage.setItem(key, noteText);
    else localStorage.removeItem(key);
  } catch (e) { console.error("Error saving note:", e); }
}

function updateChecklistProgressSummary(process, savedCheckedArray) {
  const requiredItems = process.required;
  const totalRequired = requiredItems.length;
  
  const completedRequiredItems = requiredItems.filter(i => savedCheckedArray.includes(i.id));
  const completedRequiredCount = completedRequiredItems.length;
  const remainingRequiredCount = totalRequired - completedRequiredCount;
  
  const missingRequiredItems = requiredItems.filter(i => !savedCheckedArray.includes(i.id));
  const percentage = totalRequired > 0 ? Math.round((completedRequiredCount / totalRequired) * 100) : 100;

  const statusTitle = document.getElementById("checklist-status-title");
  const percentBadge = document.getElementById("checklist-percentage-badge");
  const progressFill = document.getElementById("checklist-progress-fill");
  const itemsCountText = document.getElementById("checklist-items-count");
  const tipMsg = document.getElementById("checklist-tip-msg");

  if (percentBadge) percentBadge.textContent = `${percentage}%`;
  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (itemsCountText) itemsCountText.textContent = `${completedRequiredCount} of ${totalRequired} required items prepared`;

  let readinessStateText = "";
  let readinessStateClass = "";
  let statusMessage = "";

  if (percentage === 100) {
    readinessStateText = "Ready to verify";
    readinessStateClass = "status-ready-to-verify";
    statusMessage = "All required items prepared! Confirm final rules with the organization before visiting.";
  } else if (percentage >= 80) {
    readinessStateText = "Almost ready";
    readinessStateClass = "status-almost-ready";
    statusMessage = `Almost ready — ${remainingRequiredCount} required item${remainingRequiredCount > 1 ? "s" : ""} remaining.`;
  } else if (percentage >= 50) {
    readinessStateText = "Partially ready";
    readinessStateClass = "status-partially-ready";
    statusMessage = `Partially ready — ${remainingRequiredCount} required item${remainingRequiredCount > 1 ? "s" : ""} remaining.`;
  } else {
    readinessStateText = "Not ready yet";
    readinessStateClass = "status-not-ready";
    statusMessage = `Not ready yet — ${remainingRequiredCount} of ${totalRequired} required items remaining.`;
  }

  if (statusTitle) {
    statusTitle.textContent = readinessStateText;
    statusTitle.className = `readiness-status-title ${readinessStateClass}`;
  }

  if (tipMsg) tipMsg.textContent = statusMessage;

  renderFinalReadinessCard(process, percentage, completedRequiredCount, totalRequired, remainingRequiredCount, missingRequiredItems, completedRequiredItems, readinessStateText, readinessStateClass);
}

function renderFinalReadinessCard(process, percentage, completedCount, totalCount, remainingCount, missingItems, completedItems, stateText, stateClass) {
  let cardContainer = document.getElementById("final-readiness-card-container");
  if (!cardContainer) return;

  const isComplete = percentage === 100;

  let origAvailable = 0;
  let copyAvailable = 0;
  let digiAvailable = 0;

  completedItems.forEach(item => {
    const match = checkVaultMatchDetailed(item.title);
    if (match.status === "available") {
      if (match.hasOriginal) origAvailable++;
      if (match.hasPhotocopy) copyAvailable++;
      if (match.hasDigital) digiAvailable++;
    } else {
      origAvailable++;
      copyAvailable++;
    }
  });

  cardContainer.innerHTML = `
    <!-- Personalized Process Readiness Dashboard Widget -->
    <div class="final-readiness-card ${isComplete ? "is-100-complete" : ""}">
      <div class="readiness-card-header">
        <span class="rcard-tag">Personalized Process Dashboard</span>
        <div class="rcard-big-score">
          <span class="rcard-number">${percentage}%</span>
          <span class="rcard-badge ${stateClass}">${escapeHTML(stateText)}</span>
        </div>
        <p class="rcard-count-text">${completedCount} of ${totalCount} mandatory requirements prepared</p>
      </div>

      <!-- Format Breakdown Summary Pills -->
      <div class="udash-format-row mb-3">
        <span class="fmt-pill">📄 Originals: <strong>${origAvailable}/${completedCount}</strong></span>
        <span class="fmt-pill">🖨️ Copies: <strong>${copyAvailable}/${completedCount}</strong></span>
        <span class="fmt-pill">📱 Digital: <strong>${digiAvailable}/${completedCount}</strong></span>
      </div>

      ${!isComplete && missingItems.length > 0 ? `
        <div class="rcard-missing-box">
          <span class="missing-title">BEFORE YOU LEAVE — Missing Requirements (${remainingCount} item${remainingCount > 1 ? "s" : ""}):</span>
          <ul class="missing-items-list">
            ${missingItems.map(item => `<li>⚠ <strong>${escapeHTML(item.title)}</strong> — <small class="text-muted">${escapeHTML(item.note)}</small></li>`).join("")}
          </ul>
        </div>
      ` : ""}

      <div class="rcard-footer-disclaimer">
        ${isComplete ? `
          <div class="rcard-success-note">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <div>
              <strong>Ready to Verify!</strong>
              <p>Remember to confirm final requirements and office timings with the relevant organization before visiting.</p>
            </div>
          </div>
        ` : `
          <p class="text-muted">Review remaining requirements above or update your Document Vault.</p>
        `}
      </div>

      <div class="rcard-actions mt-3">
        <button class="btn btn-primary btn-sm" onclick="openCheckBeforeGoModal(SERVICES_DATA.find(p => p.id === '${process.id}'))">
          ✨ Check Before I Go Review
        </button>
        <button class="btn btn-outline btn-sm" id="card-copy-summary-btn">
          📋 Copy Summary
        </button>
        <button class="btn btn-outline btn-sm" onclick="window.print()">
          🖨️ Print Preparation List
        </button>
      </div>
    </div>
  `;

  const cpyBtn = document.getElementById("card-copy-summary-btn");
  if (cpyBtn) {
    cpyBtn.addEventListener("click", () => copyProcessSummaryToClipboard(process.id));
  }
}

// ----------------------------------------------------------------------------
// 10. REQUIREMENT MATCHER ENGINE
// ----------------------------------------------------------------------------
function checkVaultMatchDetailed(itemTitle) {
  if (!itemTitle || !currentState.myDocuments || currentState.myDocuments.length === 0) {
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

  const matchedDoc = currentState.myDocuments.find(doc => {
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

// ----------------------------------------------------------------------------
// 11. COPY SUMMARY TO CLIPBOARD UTILITY
// ----------------------------------------------------------------------------
function copyProcessSummaryToClipboard(processId) {
  const process = SERVICES_DATA.find(p => p.id === processId);
  if (!process) return;

  const savedChecked = getSavedChecklistProgress(processId);
  const totalReq = process.required.length;
  const completedReq = process.required.filter(i => savedChecked.includes(i.id));
  const missingReq = process.required.filter(i => !savedChecked.includes(i.id));
  const percent = totalReq > 0 ? Math.round((completedReq.length / totalReq) * 100) : 100;

  let text = `DocuReady Preparation Summary\n`;
  text += `Process: ${process.title}\n`;
  text += `Category: ${process.categoryName}\n`;
  text += `Readiness Score: ${percent}%\n`;
  text += `Completed: ${completedReq.length} of ${totalReq} required items\n\n`;

  if (completedReq.length > 0) {
    text += `✓ PREPARED ITEMS:\n`;
    completedReq.forEach(i => { text += `  - ${i.title}\n`; });
    text += `\n`;
  }

  if (missingReq.length > 0) {
    text += `⚠ STILL TO PREPARE:\n`;
    missingReq.forEach(i => { text += `  - ${i.title} (${i.note})\n`; });
    text += `\n`;
  }

  text += `Reminder: DocuReady provides general guidance. Always verify current requirements directly with the relevant organization.`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Summary copied to clipboard!");
    }).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast("Summary copied to clipboard!");
  } catch (err) {
    showToast("Unable to copy summary automatically.");
  }
  document.body.removeChild(textArea);
}

// ----------------------------------------------------------------------------
// 12. COMPARE PROCESSES MODULE
// ----------------------------------------------------------------------------
function initCompareModal() {
  const modal = document.getElementById("compare-modal");
  const closeBtn = document.getElementById("close-compare-modal-btn");
  const procASelect = document.getElementById("compare-select-a");
  const procBSelect = document.getElementById("compare-select-b");

  if (closeBtn && modal) closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

  if (procASelect && procBSelect) {
    const optionsHTML = SERVICES_DATA.map(p => `<option value="${p.id}">${escapeHTML(p.title)} (${escapeHTML(p.categoryName)})</option>`).join("");
    procASelect.innerHTML = optionsHTML;
    procBSelect.innerHTML = optionsHTML;
    if (SERVICES_DATA.length > 1) procBSelect.selectedIndex = 1;

    procASelect.addEventListener("change", renderCompareMatrix);
    procBSelect.addEventListener("change", renderCompareMatrix);
  }
}

function openCompareModal() {
  const modal = document.getElementById("compare-modal");
  if (!modal) return;
  renderCompareMatrix();
  modal.classList.remove("hidden");
}

function renderCompareMatrix() {
  const selectA = document.getElementById("compare-select-a");
  const selectB = document.getElementById("compare-select-b");
  const container = document.getElementById("compare-matrix-content");

  if (!selectA || !selectB || !container) return;

  const processA = SERVICES_DATA.find(p => p.id === selectA.value) || SERVICES_DATA[0];
  const processB = SERVICES_DATA.find(p => p.id === selectB.value) || SERVICES_DATA[1];

  const reqATitles = processA.required.map(i => i.title);
  const reqBTitles = processB.required.map(i => i.title);

  const common = reqATitles.filter(t => reqBTitles.some(b => b.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(b.toLowerCase())));
  const onlyA = reqATitles.filter(t => !common.includes(t));
  const onlyB = reqBTitles.filter(t => !common.includes(t));

  container.innerHTML = `
    <div class="compare-grid mt-3">
      <div class="compare-col">
        <h3>${escapeHTML(processA.title)}</h3>
        <span class="badge badge-accent mb-2">${escapeHTML(processA.categoryName)}</span>
        <p class="text-muted" style="font-size:0.85rem;">Total Requirements: ${processA.required.length}</p>
      </div>
      <div class="compare-vs">VS</div>
      <div class="compare-col">
        <h3>${escapeHTML(processB.title)}</h3>
        <span class="badge badge-accent mb-2">${escapeHTML(processB.categoryName)}</span>
        <p class="text-muted" style="font-size:0.85rem;">Total Requirements: ${processB.required.length}</p>
      </div>
    </div>

    <!-- Comparison Results -->
    <div class="compare-results-box mt-4">
      <div class="cres-block">
        <h4 class="text-success">✓ COMMON REQUIREMENTS (${common.length})</h4>
        ${common.length > 0 ? `
          <ul class="cres-ul">
            ${common.map(c => `<li>✓ ${escapeHTML(c)}</li>`).join("")}
          </ul>
        ` : `<p class="text-muted" style="font-size:0.85rem;">No overlapping document titles found.</p>`}
      </div>

      <div class="grid grid-2 gap-3 mt-3">
        <div class="cres-block">
          <h4 class="text-primary">ONLY IN ${escapeHTML(processA.title.toUpperCase())} (${onlyA.length})</h4>
          <ul class="cres-ul">
            ${onlyA.map(a => `<li>• ${escapeHTML(a)}</li>`).join("")}
          </ul>
        </div>
        <div class="cres-block">
          <h4 class="text-primary">ONLY IN ${escapeHTML(processB.title.toUpperCase())} (${onlyB.length})</h4>
          <ul class="cres-ul">
            ${onlyB.map(b => `<li>• ${escapeHTML(b)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 13. CUSTOM CHECKLIST BUILDER MODULE
// ----------------------------------------------------------------------------
function initCustomChecklistUI() {
  const form = document.getElementById("create-custom-checklist-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleInput = document.getElementById("custom-title-input");
      const title = titleInput.value.trim();
      if (!title) return;

      const newChecklist = {
        id: "custom_" + Date.now(),
        title: title,
        createdAt: new Date().toISOString(),
        items: [
          { id: "ci_1", title: "General Identification Copy", completed: false },
          { id: "ci_2", title: "Passport Photograph Set", completed: false }
        ]
      };

      currentState.customChecklists.unshift(newChecklist);
      saveCustomChecklistsToStorage();
      renderCustomChecklistsUI();

      form.reset();
      showToast(`Created custom checklist "${escapeHTML(title)}"!`);
    });
  }
}

function renderCustomChecklistsUI() {
  const container = document.getElementById("custom-checklists-container");
  if (!container) return;

  if (currentState.customChecklists.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>No Personal Checklists Created</h3>
        <p>Create your own checklist above for custom procedures like internship onboarding, passport visit, or scholarship submission.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = currentState.customChecklists.map(chk => {
    const total = chk.items.length;
    const completed = chk.items.filter(i => i.completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return `
      <div class="custom-chk-card mb-4" data-custom-id="${chk.id}">
        <div class="cchk-header">
          <div>
            <span class="badge badge-primary mb-1">Personal Checklist</span>
            <h3>${escapeHTML(chk.title)}</h3>
            <span class="text-muted" style="font-size:0.85rem;">${completed} of ${total} completed (${percent}%)</span>
          </div>
          <button class="btn-delete-item" onclick="deleteCustomChecklist('${chk.id}')" title="Delete custom checklist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>

        <div class="cchk-items-list mt-3">
          ${chk.items.map(item => `
            <div class="cchk-item-row ${item.completed ? 'is-checked' : ''}">
              <label class="cchk-item-label">
                <input type="checkbox" class="custom-checkbox" ${item.completed ? 'checked' : ''} onchange="toggleCustomChecklistItem('${chk.id}', '${item.id}')">
                <span class="check-item-title">${escapeHTML(item.title)}</span>
              </label>
              <button class="btn-delete-item" onclick="deleteCustomChecklistItem('${chk.id}', '${item.id}')" title="Delete item">×</button>
            </div>
          `).join("")}
        </div>

        <!-- Add Item Form -->
        <form class="add-cchk-item-form mt-3" onsubmit="event.preventDefault(); addCustomChecklistItem('${chk.id}', this.querySelector('input').value); this.reset();">
          <input type="text" placeholder="+ Add requirement item..." required class="form-input btn-sm">
          <button type="submit" class="btn btn-sm btn-outline">Add</button>
        </form>
      </div>
    `;
  }).join("");
}

function addCustomChecklistItem(checklistId, itemTitle) {
  if (!itemTitle.trim()) return;
  const chk = currentState.customChecklists.find(c => c.id === checklistId);
  if (!chk) return;

  chk.items.push({
    id: "ci_" + Date.now(),
    title: itemTitle.trim(),
    completed: false
  });

  saveCustomChecklistsToStorage();
  renderCustomChecklistsUI();
  showToast("Added requirement item!");
}

function toggleCustomChecklistItem(checklistId, itemId) {
  const chk = currentState.customChecklists.find(c => c.id === checklistId);
  if (!chk) return;

  const item = chk.items.find(i => i.id === itemId);
  if (!item) return;

  item.completed = !item.completed;
  saveCustomChecklistsToStorage();
  renderCustomChecklistsUI();
}

function deleteCustomChecklistItem(checklistId, itemId) {
  const chk = currentState.customChecklists.find(c => c.id === checklistId);
  if (!chk) return;

  chk.items = chk.items.filter(i => i.id !== itemId);
  saveCustomChecklistsToStorage();
  renderCustomChecklistsUI();
}

function deleteCustomChecklist(checklistId) {
  const chk = currentState.customChecklists.find(c => c.id === checklistId);
  if (!chk) return;

  if (confirm(`Are you sure you want to delete custom checklist "${chk.title}"?`)) {
    currentState.customChecklists = currentState.customChecklists.filter(c => c.id !== checklistId);
    saveCustomChecklistsToStorage();
    renderCustomChecklistsUI();
    showToast("Deleted personal checklist.");
  }
}

// ----------------------------------------------------------------------------
// 14. SETTINGS & JSON DATA EXPORT / IMPORT ENGINE
// ----------------------------------------------------------------------------
function initSettingsUI() {
  const exportBtn = document.getElementById("export-data-btn");
  const importInput = document.getElementById("import-data-file");
  const clearDataBtn = document.getElementById("clear-all-data-btn");

  if (exportBtn) exportBtn.addEventListener("click", exportAllDataJSON);
  if (importInput) importInput.addEventListener("change", importAllDataJSON);
  if (clearDataBtn) clearDataBtn.addEventListener("click", clearAllData);
}

function exportAllDataJSON() {
  const backupObject = {
    app: "DocuReady",
    version: "2.0",
    timestamp: new Date().toISOString(),
    myDocuments: currentState.myDocuments,
    favorites: currentState.favorites,
    recentProcesses: currentState.recentProcesses,
    customChecklists: currentState.customChecklists,
    lastProcess: localStorage.getItem(STORAGE_KEYS.LAST_PROCESS)
  };

  const jsonStr = JSON.stringify(backupObject, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `docuready_backup_${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Data backup exported successfully!");
}

function importAllDataJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const parsed = JSON.parse(event.target.result);
      if (!parsed || (!parsed.myDocuments && !parsed.favorites && !parsed.customChecklists && !parsed.app)) {
        showToast("Invalid DocuReady JSON backup file.");
        return;
      }

      if (parsed.myDocuments && Array.isArray(parsed.myDocuments)) {
        saveDocuments(parsed.myDocuments);
      }

      if (parsed.favorites && Array.isArray(parsed.favorites)) {
        saveFavorites(parsed.favorites);
      }

      if (parsed.recentProcesses && Array.isArray(parsed.recentProcesses)) {
        saveRecentProcesses(parsed.recentProcesses);
      }

      if (parsed.customChecklists && Array.isArray(parsed.customChecklists)) {
        currentState.customChecklists = parsed.customChecklists;
        saveCustomChecklistsToStorage();
      }

      showToast("Data imported successfully!");
      setTimeout(() => { window.location.reload(); }, 1000);
    } catch (err) {
      showToast("Error parsing JSON file. Invalid backup format.");
    }
  };
  reader.readAsText(file);
}

function clearAllData() {
  if (confirm("⚠️ WARNING: This will permanently delete all your saved document records, custom checklists, and favorites from this browser.\n\nAre you sure you want to clear all data?")) {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem("docuready_my_documents");
    localStorage.removeItem("docuready_recent_processes");
    localStorage.removeItem("docuready_onboarding_done");
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && (key.startsWith("docuready_") || key.startsWith(STORAGE_KEYS.CHECKLIST_NOTES_PREFIX))) {
        localStorage.removeItem(key);
      }
    }

    showToast("All local data cleared!");
    setTimeout(() => { window.location.reload(); }, 1000);
  }
}

// ----------------------------------------------------------------------------
// 15. FIRST-VISIT ONBOARDING BANNER
// ----------------------------------------------------------------------------
function initOnboardingUI() {
  const banner = document.getElementById("onboarding-banner");
  const dismissBtn = document.getElementById("dismiss-onboarding-btn");
  const startBtn = document.getElementById("start-onboarding-btn");

  if (!currentState.onboardingDone && banner) {
    banner.classList.remove("hidden");
  }

  function completeOnboarding() {
    currentState.onboardingDone = true;
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, "true");
    localStorage.setItem("docuready_onboarding_done", "true");
    if (banner) banner.classList.add("hidden");
  }

  if (dismissBtn) dismissBtn.addEventListener("click", completeOnboarding);
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      completeOnboarding();
      window.location.hash = "#services";
    });
  }
}

// ----------------------------------------------------------------------------
// 16. MY DOCUMENTS VAULT MODULE
// ----------------------------------------------------------------------------
function initVaultUI() {
  const form = document.getElementById("add-document-form");
  const searchInput = document.getElementById("vault-search-input");
  const clearBtn = document.getElementById("clear-vault-search");
  const filterGroup = document.querySelector(".vault-status-filter");
  const presetChips = document.getElementById("preset-chips-container");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleInput = document.getElementById("doc-title-input");
      const categorySelect = document.getElementById("doc-category-select");
      const notesInput = document.getElementById("doc-notes-input");
      const statusSelect = document.getElementById("doc-status-select");
      const expInput = document.getElementById("doc-expiry-input");

      const origChk = document.getElementById("doc-has-original");
      const copyChk = document.getElementById("doc-has-photocopy");
      const digiChk = document.getElementById("doc-has-digital");

      const title = titleInput.value.trim();
      if (!title) return;

      const newDoc = {
        id: "doc_" + Date.now(),
        title: title,
        category: categorySelect.value,
        notes: notesInput.value.trim(),
        status: statusSelect.value,
        hasOriginal: origChk ? origChk.checked : true,
        hasPhotocopy: copyChk ? copyChk.checked : true,
        hasDigital: digiChk ? digiChk.checked : true,
        expiryDate: expInput ? expInput.value : "",
        createdAt: new Date().toISOString()
      };

      currentState.myDocuments.unshift(newDoc);
      saveDocuments(currentState.myDocuments);
      renderVaultUI();

      form.reset();
      showToast(`Added "${escapeHTML(title)}" to Vault!`);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentState.vaultSearchTerm = e.target.value.toLowerCase().trim();
      if (clearBtn) clearBtn.classList.toggle("hidden", currentState.vaultSearchTerm === "");
      renderVaultItems();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      currentState.vaultSearchTerm = "";
      clearBtn.classList.add("hidden");
      renderVaultItems();
    });
  }

  if (filterGroup) {
    filterGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".vfilter-btn");
      if (btn) {
        currentState.vaultStatusFilter = btn.getAttribute("data-vfilter");
        filterGroup.querySelectorAll(".vfilter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderVaultItems();
      }
    });
  }

  if (presetChips) {
    presetChips.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip-btn");
      if (chip) {
        const docName = chip.getAttribute("data-doc");
        const docCat = chip.getAttribute("data-cat");

        const exists = currentState.myDocuments.some(d => d.title.toLowerCase() === docName.toLowerCase());
        if (exists) {
          showToast(`"${docName}" is already in your vault!`);
          return;
        }

        const newDoc = {
          id: "doc_" + Date.now(),
          title: docName,
          category: docCat,
          notes: "Quick preset document record",
          status: "available",
          hasOriginal: true,
          hasPhotocopy: true,
          hasDigital: true,
          expiryDate: "",
          createdAt: new Date().toISOString()
        };

        currentState.myDocuments.unshift(newDoc);
        saveDocuments(currentState.myDocuments);
        renderVaultUI();
        showToast(`Added "${docName}" to Vault!`);
      }
    });
  }
}

function renderVaultUI() {
  renderVaultItems();
  renderInAppRemindersWidget();
  renderCustomChecklistsUI();
  updateVaultStats();
}

function renderVaultItems() {
  const container = document.getElementById("vault-items-container");
  const emptyState = document.getElementById("vault-empty-state");
  const emptyTitle = document.getElementById("vault-empty-title");
  const emptyText = document.getElementById("vault-empty-text");

  if (!container) return;

  const filtered = currentState.myDocuments.filter(doc => {
    const matchesStatus = (currentState.vaultStatusFilter === "all") || (doc.status === currentState.vaultStatusFilter);
    const matchesSearch = currentState.vaultSearchTerm === "" ||
      doc.title.toLowerCase().includes(currentState.vaultSearchTerm) ||
      doc.category.toLowerCase().includes(currentState.vaultSearchTerm) ||
      doc.notes.toLowerCase().includes(currentState.vaultSearchTerm);
    
    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) {
      emptyState.classList.remove("hidden");
      if (currentState.myDocuments.length === 0) {
        if (emptyTitle) emptyTitle.textContent = "You haven't added any documents yet.";
        if (emptyText) emptyText.textContent = "Add your common documents above or click any quick preset to start tracking what you have.";
      } else {
        if (emptyTitle) emptyTitle.textContent = "No matching documents found";
        if (emptyText) emptyText.textContent = "Try adjusting your search terms or status filter options.";
      }
    }
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  container.innerHTML = filtered.map(doc => {
    const isAvailable = doc.status === "available";
    const hasOriginal = doc.hasOriginal !== false;
    const hasPhotocopy = doc.hasPhotocopy !== false;
    const hasDigital = doc.hasDigital !== false;
    const expInfo = getExpiryStatus(doc.expiryDate);

    return `
      <div class="vault-item-card" data-doc-id="${doc.id}">
        <div class="vitem-main">
          <div class="vitem-info">
            <span class="vitem-category">${escapeHTML(doc.category)}</span>
            <h4>${escapeHTML(doc.title)}</h4>
            ${doc.notes ? `<p class="vitem-notes">📍 ${escapeHTML(doc.notes)}</p>` : ""}
            
            <!-- Expiry Status Tag -->
            <div class="expiry-badge-tag mt-2 ${expInfo.badgeClass}">
              ${expInfo.label}
            </div>
          </div>

          <!-- Triple Format Toggles -->
          <div class="format-toggles-group">
            <button type="button" class="ftoggle-btn ${hasOriginal ? "active" : ""}" onclick="toggleDocFormat('${doc.id}', 'hasOriginal')" title="Toggle Original Document availability">
              📄 Original: ${hasOriginal ? "Yes" : "No"}
            </button>
            <button type="button" class="ftoggle-btn ${hasPhotocopy ? "active" : ""}" onclick="toggleDocFormat('${doc.id}', 'hasPhotocopy')" title="Toggle Photocopy availability">
              🖨️ Photocopy: ${hasPhotocopy ? "Yes" : "No"}
            </button>
            <button type="button" class="ftoggle-btn ${hasDigital ? "active" : ""}" onclick="toggleDocFormat('${doc.id}', 'hasDigital')" title="Toggle Digital Copy availability">
              📱 Digital: ${hasDigital ? "Yes" : "No"}
            </button>
          </div>
        </div>

        <div class="vitem-actions">
          <button class="status-toggle-btn ${isAvailable ? "available" : "missing"}" onclick="toggleVaultItemStatus('${doc.id}')" title="Click to toggle overall availability">
            ${isAvailable ? "✓ Available" : "⏳ Missing"}
          </button>
          <button class="btn-delete-item" onclick="deleteVaultItem('${doc.id}')" aria-label="Delete ${escapeHTML(doc.title)} document">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function renderInAppRemindersWidget() {
  const container = document.getElementById("in-app-reminders-container");
  if (!container) return;

  const reminders = generateInAppReminders();

  if (reminders.length === 0) {
    container.innerHTML = `
      <div class="alert alert-success">
        <span>✓ No pending reminders. All document expiry dates and copies are in order!</span>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="reminders-card">
      <div class="rem-header mb-3">
        <span class="badge badge-accent">IN-APP REMINDERS</span>
        <h3>Upcoming Preparation Events</h3>
      </div>
      <div class="reminders-list">
        ${reminders.map(rem => `
          <div class="reminder-item-row ${rem.type}">
            <span class="rem-icon">${rem.icon}</span>
            <div class="rem-info">
              <strong>${escapeHTML(rem.title)}</strong>
              <p>${escapeHTML(rem.text)}</p>
            </div>
            ${rem.processId ? `<button class="btn btn-sm btn-outline" onclick="navigateToChecklist('${rem.processId}')">Open Checklist</button>` : ""}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function toggleDocFormat(docId, formatKey) {
  const doc = currentState.myDocuments.find(d => d.id === docId);
  if (!doc) return;

  doc[formatKey] = !doc[formatKey];
  saveDocuments(currentState.myDocuments);
  renderVaultUI();

  if (currentState.activePage === "checklist" && currentState.activeProcessId) {
    renderProcessChecklistPage(currentState.activeProcessId);
  }
}

function toggleVaultItemStatus(docId) {
  const doc = currentState.myDocuments.find(d => d.id === docId);
  if (!doc) return;

  doc.status = (doc.status === "available") ? "missing" : "available";
  saveDocuments(currentState.myDocuments);
  renderVaultUI();
  
  if (currentState.activePage === "checklist" && currentState.activeProcessId) {
    renderProcessChecklistPage(currentState.activeProcessId);
  }
  
  showToast(`Updated status for "${escapeHTML(doc.title)}"`);
}

function deleteVaultItem(docId) {
  const doc = currentState.myDocuments.find(d => d.id === docId);
  if (!doc) return;

  if (confirm(`Are you sure you want to remove "${doc.title}" from your vault?`)) {
    currentState.myDocuments = currentState.myDocuments.filter(d => d.id !== docId);
    saveDocuments(currentState.myDocuments);
    renderVaultUI();
    showToast(`Removed "${escapeHTML(doc.title)}" from Vault.`);
  }
}

function updateVaultStats() {
  const total = currentState.myDocuments.length;
  const available = currentState.myDocuments.filter(d => d.status === "available").length;
  const missing = total - available;
  const percent = total > 0 ? Math.round((available / total) * 100) : 0;

  const totalEl = document.getElementById("vault-stat-total");
  const availEl = document.getElementById("vault-stat-available");
  const missEl = document.getElementById("vault-stat-missing");
  const fillEl = document.getElementById("vault-stat-fill");
  const textEl = document.getElementById("vault-stat-text");

  if (totalEl) totalEl.textContent = total;
  if (availEl) availEl.textContent = available;
  if (missEl) missEl.textContent = missing;
  if (fillEl) fillEl.style.width = `${percent}%`;
  if (textEl) textEl.textContent = `${percent}% of saved documents ready in vault`;
}

// ----------------------------------------------------------------------------
// 17. CHECK BEFORE I GO MODAL MODULE
// ----------------------------------------------------------------------------
function initCheckBeforeGoModal() {
  const modal = document.getElementById("check-before-go-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  const printModalBtn = document.getElementById("print-modal-btn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  if (printModalBtn) {
    printModalBtn.addEventListener("click", () => {
      window.print();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal && !modal.classList.contains("hidden")) modal.classList.add("hidden");
      const compModal = document.getElementById("compare-modal");
      if (compModal && !compModal.classList.contains("hidden")) compModal.classList.add("hidden");
    }
  });
}

function openCheckBeforeGoModal(process) {
  const modal = document.getElementById("check-before-go-modal");
  const content = document.getElementById("modal-review-content");
  if (!modal || !content || !process) return;

  const savedChecked = getSavedChecklistProgress(process.id);
  const totalReq = process.required.length;
  const completedReq = process.required.filter(i => savedChecked.includes(i.id));
  const missingReq = process.required.filter(i => !savedChecked.includes(i.id));
  const percentage = totalReq > 0 ? Math.round((completedReq.length / totalReq) * 100) : 100;

  let origCount = 0;
  let copyCount = 0;
  let digiCount = 0;

  completedReq.forEach(item => {
    const match = checkVaultMatchDetailed(item.title);
    if (match.status === "available") {
      if (match.hasOriginal) origCount++;
      if (match.hasPhotocopy) copyCount++;
      if (match.hasDigital) digiCount++;
    } else {
      origCount++;
      copyCount++;
    }
  });

  const warnings = [];
  if (missingReq.length > 0) {
    warnings.push(`${missingReq.length} mandatory item${missingReq.length > 1 ? "s" : ""} still require preparation.`);
  }

  completedReq.forEach(item => {
    const match = checkVaultMatchDetailed(item.title);
    if (match.status === "available" && match.hasDigital && !match.hasOriginal && !match.hasPhotocopy) {
      warnings.push(`"${item.title}" is recorded as Digital scan only. Print a physical photocopy before visiting.`);
    }
    if (match.expiryDate) {
      const expStatus = getExpiryStatus(match.expiryDate);
      if (expStatus.status === "expired") {
        warnings.push(`"${item.title}" in Vault is EXPIRED.`);
      } else if (expStatus.status === "expiring_soon") {
        warnings.push(`"${item.title}" in Vault expires soon (${expStatus.daysLeft} days left).`);
      }
    }
  });

  let statusText = "Ready to verify";
  let statusBadgeClass = "partial";

  if (percentage === 100 && warnings.length === 0) {
    statusText = "Ready to verify";
    statusBadgeClass = "ready";
  } else if (percentage >= 50) {
    statusText = "Partially ready";
    statusBadgeClass = "partial";
  } else {
    statusText = "Needs preparation";
    statusBadgeClass = "needs-prep";
  }

  content.innerHTML = `
    <div class="cgo-header">
      <span class="badge badge-accent mb-2">CHECK BEFORE I GO</span>
      <h2>${escapeHTML(process.title)}</h2>
      <span class="badge ${statusBadgeClass} mt-1">${escapeHTML(statusText)} (${percentage}%)</span>
    </div>

    <div class="grid grid-2 gap-3 mt-4">
      <div class="stat-mini-box">
        <span class="stat-mini-num">${completedReq.length} / ${totalReq}</span>
        <span class="stat-mini-label">Mandatory Documents Ready</span>
      </div>
      <div class="stat-mini-box">
        <span class="stat-mini-num">${missingReq.length}</span>
        <span class="stat-mini-label">Missing Items</span>
      </div>
    </div>

    <div class="udash-format-row mt-3">
      <span class="fmt-pill">📄 Originals: <strong>${origCount}/${completedReq.length}</strong></span>
      <span class="fmt-pill">🖨️ Copies: <strong>${copyCount}/${completedReq.length}</strong></span>
      <span class="fmt-pill">📱 Digital: <strong>${digiCount}/${completedReq.length}</strong></span>
    </div>

    ${missingReq.length > 0 ? `
      <div class="modal-section-box mt-3">
        <h4>MISSING REQUIREMENTS:</h4>
        <ul class="missing-items-list">
          ${missingReq.map(i => `<li>• <strong>${escapeHTML(i.title)}</strong> (${escapeHTML(i.note)})</li>`).join("")}
        </ul>
      </div>
    ` : ""}

    ${warnings.length > 0 ? `
      <div class="modal-section-box warning mt-3">
        <h4>⚠ PREPARATION WARNINGS:</h4>
        <ul class="warning-items-list">
          ${warnings.map(w => `<li>⚠️ ${escapeHTML(w)}</li>`).join("")}
        </ul>
      </div>
    ` : ""}

    <div class="hero-disclaimer-box mt-4">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span><strong>Final Reminder:</strong> Verify current requirements directly with the relevant organization before your visit.</span>
    </div>
  `;

  modal.classList.remove("hidden");
}

// ----------------------------------------------------------------------------
// 18. ABOUT & FAQ ACCORDION INTERACTIVITY
// ----------------------------------------------------------------------------
function initAboutFAQUI() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        faqItems.forEach(i => i.classList.remove("is-open"));
        if (!isOpen) item.classList.add("is-open");
      });
    }
  });
}

// ----------------------------------------------------------------------------
// 19. TOAST NOTIFICATION UTILITY & SANITIZATION
// ----------------------------------------------------------------------------
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 3000);
}

function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
