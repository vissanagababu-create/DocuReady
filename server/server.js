/**
 * DocuReady Backend API
 *
 * Technology: Node.js + Express + Mongoose (CommonJS)
 * Database: MongoDB ('docuready')
 * Port: 5000
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

// ============================================================================
// ENVIRONMENT CONFIGURATION
// Reads server/.env without requiring external dependencies
// ============================================================================

function loadEnv() {
  const envPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf-8');
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    } catch (e) {
      console.warn('Could not read .env file:', e.message);
    }
  }
}
loadEnv();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/docuready';

// Import Mongoose Service Model
const Service = require('./models/Service');

// Initialize the Express application
const app = express();

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Parse incoming JSON request bodies
app.use(express.json());

// Enable CORS so the React frontend (running on port 5173 or other ports)
// can communicate with this API without requiring external packages
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logger for readable terminal debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ============================================================================
// DATABASE CONNECTION & AUTO-INITIALIZATION
// ============================================================================

const initialServices = [
  {
    id: 'passport-application',
    name: 'Passport Application',
    category: 'Government Services',
    description: 'Documents required for applying for a new Indian passport or renewal under Normal or Tatkaal scheme.',
    requiredDocuments: [
      'Proof of Present Address (Aadhaar Card, Water Bill, or Electricity Bill)',
      'Proof of Date of Birth (Birth Certificate or 10th Class Marks Memo)',
      'Photo ID Proof (PAN Card or Voter ID Card)'
    ],
    optionalDocuments: [
      'Marriage Certificate (if applicable)',
      'Old Passport booklet (for renewal/reissue)'
    ],
    processingTime: '7 - 21 business days',
    officialPortal: 'https://www.passportindia.gov.in'
  },
  {
    id: 'driving-licence',
    name: 'Driving Licence',
    category: 'Government Services',
    description: 'Requirements for applying for a Learner\'s Licence (LLR) or permanent Driving Licence (DL).',
    requiredDocuments: [
      'Age Proof (10th marks memo, Birth Certificate, or PAN Card)',
      'Current Address Proof (Aadhaar Card, Passport, or Ration Card)',
      'Learner\'s Licence Number (required for permanent DL)',
      'Passport Size Photographs (4 copies)'
    ],
    optionalDocuments: [
      'Medical Fitness Certificate (Form 1A for transport vehicles or applicants over 40)'
    ],
    processingTime: '1 - 14 business days',
    officialPortal: 'https://parivahan.gov.in'
  },
  {
    id: 'college-scholarship',
    name: 'College Scholarship',
    category: 'Scholarships',
    description: 'Standard documentation required for State and National Merit / Post-Matric college scholarships.',
    requiredDocuments: [
      'College Admission Letter & Allotment Order',
      'Current Academic Year Fee Receipt',
      'Family Income Certificate (issued by competent revenue authority)',
      'Caste / Community Certificate (if applying under reserved category)',
      'Previous Qualifying Examination Marksheets',
      'Student Bank Account Passbook (Aadhaar-linked)',
      'Aadhaar Card of the Student'
    ],
    optionalDocuments: [
      'Bonafide / Study Certificate from current College',
      'Hostel Fee Certificate (for residential students)'
    ],
    processingTime: '30 - 60 business days',
    officialPortal: 'https://scholarships.gov.in'
  },
  {
    id: 'bonafide-certificate',
    name: 'Bonafide Certificate',
    category: 'College / University',
    description: 'Verification certificate from college administration confirming active student enrollment.',
    requiredDocuments: [
      'College ID Card (original & photocopy)',
      'Current Year Fee Receipt',
      'Written Application Form stating purpose (bus pass, passport, loan, etc.)'
    ],
    optionalDocuments: [
      'Hostel Resident Card (if living on campus)'
    ],
    processingTime: '1 - 3 business days',
    officialPortal: ''
  },
  {
    id: 'bank-account',
    name: 'Bank Account Opening',
    category: 'Banking',
    description: 'Documents required to open a new Savings or Current Bank Account at public/private banks.',
    requiredDocuments: [
      'Aadhaar Card (identity and current address proof)',
      'PAN Card (or Form 60 if PAN is not yet assigned)',
      'Passport Size Photographs (2 copies)',
      'Initial Opening Deposit Amount'
    ],
    optionalDocuments: [
      'Utility Bill (if current residential address differs from Aadhaar address)',
      'Employer ID or Student ID Card'
    ],
    processingTime: 'Same day to 2 business days',
    officialPortal: ''
  },
  {
    id: 'job-joining',
    name: 'Job Joining Formalities',
    category: 'Jobs / Employment',
    description: 'Essential onboarding documentation needed by employers before or on your joining date.',
    requiredDocuments: [
      'Signed Offer / Appointment Letter Copy',
      'Educational Degree Certificates & Marksheets (10th, 12th, Graduation)',
      'PAN Card (for payroll & tax deduction)',
      'Aadhaar Card',
      'Cancelled Cheque or Bank Passbook copy for salary account setup'
    ],
    optionalDocuments: [
      'Relieving Letter and Experience Certificate from previous employer',
      'Last 3 Months Salary Slips (if experienced)',
      'Pre-employment Medical Fitness Certificate'
    ],
    processingTime: 'Submitted on or before the first day',
    officialPortal: ''
  }
];

// Helper to check MongoDB connection status
function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

// Safe auto-initialization: ensures default records exist without creating duplicates
async function initDatabaseDefaults() {
  try {
    for (const item of initialServices) {
      await Service.updateOne(
        { id: item.id },
        { $setOnInsert: item },
        { upsert: true }
      );
    }
    const count = await Service.countDocuments();
    console.log(`[MongoDB] Initialized default services. Total services in DB: ${count}`);
  } catch (err) {
    console.error('[MongoDB] Auto-seeding error:', err.message);
  }
}

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB] Connected successfully to database: ${mongoose.connection.name}`);
    await initDatabaseDefaults();
  } catch (err) {
    console.error(`[MongoDB] Initial connection failed: ${err.message}`);
    console.error(`[MongoDB] Backend will continue running, but MongoDB endpoints will return a 503 error until the database is available.`);
  }
}

// Event listeners for Mongoose connection health
mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection lost. Attempting reconnection...');
});

mongoose.connection.on('reconnected', () => {
  console.log('[MongoDB] Connection restored.');
});

// ============================================================================
// API ROUTES
// ============================================================================

/**
 * GET /
 * Returns a JSON welcome message, API summary, and live database status.
 */
app.get('/', (req, res) => {
  const dbConnected = isDbConnected();
  res.status(200).json({
    message: 'Welcome to the DocuReady REST API',
    status: 'online',
    version: '1.0.0',
    database: {
      type: 'MongoDB',
      connected: dbConnected,
      name: mongoose.connection.name || 'docuready',
      status: dbConnected ? 'connected' : 'disconnected'
    },
    endpoints: {
      health: 'GET /api/health',
      services: 'GET /api/services',
      serviceById: 'GET /api/services/:id'
    }
  });
});

/**
 * GET /api/health
 * Returns the current operational status of the server and database connection.
 * Preserves existing response fields (status, uptimeSeconds, timestamp).
 */
app.get('/api/health', (req, res) => {
  const dbConnected = isDbConnected();
  const dbState = mongoose.connection.readyState;
  const dbStateNames = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.status(200).json({
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      connected: dbConnected,
      status: dbStateNames[dbState] || 'unknown',
      name: mongoose.connection.name || 'docuready'
    }
  });
});

/**
 * GET /api/services
 * Retrieves the full list of document-related services from MongoDB.
 * Preserves the exact response shape: { success: true, total: ..., services: [...] }
 * Supports optional category query parameter: /api/services?category=Scholarships
 */
app.get('/api/services', async (req, res) => {
  if (!isDbConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently unavailable. Please verify MongoDB is running.',
      error: 'DB_DISCONNECTED'
    });
  }

  try {
    const { category } = req.query;
    const filter = {};

    if (category) {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    // Retrieve documents from MongoDB, excluding MongoDB internal __v
    const services = await Service.find(filter).select('-_v').lean();

    return res.status(200).json({
      success: true,
      total: services.length,
      services: services
    });
  } catch (err) {
    console.error('Error fetching services from MongoDB:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve services from database',
      error: err.message
    });
  }
});

/**
 * GET /api/services/:id
 * Retrieves a single service by its ID from MongoDB, or returns a 404 response.
 */
app.get('/api/services/:id', async (req, res) => {
  if (!isDbConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently unavailable. Please verify MongoDB is running.',
      error: 'DB_DISCONNECTED'
    });
  }

  try {
    const { id } = req.params;

    // Case-insensitive ID lookup in MongoDB
    const service = await Service.findOne({
      id: new RegExp(`^${id}$`, 'i')
    }).select('-_v').lean();

    if (!service) {
      const allServices = await Service.find({}).select('id').lean();
      return res.status(404).json({
        success: false,
        message: `Service with ID '${id}' was not found.`,
        availableIds: allServices.map((s) => s.id)
      });
    }

    return res.status(200).json({
      success: true,
      service: service
    });
  } catch (err) {
    console.error('Error fetching service by ID from MongoDB:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve service from database',
      error: err.message
    });
  }
});

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// ============================================================================
// START SERVER
// ============================================================================

// Start listening for requests immediately
const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`DocuReady Backend running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Services API: http://localhost:${PORT}/api/services`);
  console.log(`Database: MongoDB (${MONGODB_URI})`);
  console.log(`===============================================`);
});

// Connect to MongoDB
connectToDatabase();

module.exports = app;
