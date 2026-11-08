// Predefined Services Database with Priorities & Tips
export const SERVICES_DATA = [
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
