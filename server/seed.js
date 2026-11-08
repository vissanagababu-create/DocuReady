/**
 * DocuReady Database Seeder
 *
 * Populates the MongoDB 'docuready' database with the initial six document services.
 * Safe to run multiple times: uses upsert to prevent duplicate records.
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Safe, lightweight .env loader (zero external dependencies)
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

const Service = require('./models/Service');

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

async function seedDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/docuready';
  console.log(`Connecting to MongoDB at: ${uri}`);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    let insertedCount = 0;
    let updatedCount = 0;

    for (const serviceData of initialServices) {
      const existing = await Service.findOne({ id: serviceData.id });
      if (!existing) {
        await Service.create(serviceData);
        insertedCount++;
        console.log(` + Inserted service: ${serviceData.name} (${serviceData.id})`);
      } else {
        await Service.updateOne({ id: serviceData.id }, { $set: serviceData });
        updatedCount++;
        console.log(` = Updated service: ${serviceData.name} (${serviceData.id})`);
      }
    }

    const totalCount = await Service.countDocuments();
    console.log('----------------------------------------------------');
    console.log(`Seeding completed successfully!`);
    console.log(`Inserted: ${insertedCount}, Updated: ${updatedCount}, Total in DB: ${totalCount}`);
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

// Execute if run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, initialServices };
