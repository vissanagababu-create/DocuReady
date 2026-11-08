/**
 * DocuReady API Service
 * 
 * Interacts with the Express backend REST API running at http://localhost:5000.
 * Uses the browser's native fetch API.
 * Adapts backend responses into the shape expected by DocuReady React components.
 */

export const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Maps category names from the API to frontend category slug IDs.
 */
export function getCategorySlug(categoryName = '') {
  const norm = String(categoryName).toLowerCase();
  if (norm.includes('college') || norm.includes('university')) return 'college';
  if (norm.includes('bank')) return 'banking';
  if (norm.includes('job') || norm.includes('employ')) return 'jobs';
  if (norm.includes('gov') || norm.includes('licence') || norm.includes('passport')) return 'govt';
  if (norm.includes('scholarship')) return 'scholarship';
  if (norm.includes('rent') || norm.includes('address')) return 'rental';
  return 'all';
}

/**
 * Adapts a raw service record from the backend into the format
 * expected by the DocuReady UI, preserving all original backend fields.
 */
export function adaptBackendService(raw, index = 0) {
  if (!raw) return null;

  const id = raw.id || `service-${index}`;
  const title = raw.name || raw.title || 'Untitled Service';
  const shortDesc = raw.description || raw.shortDesc || '';
  const categoryName = raw.category || raw.categoryName || 'General';
  const categorySlug = getCategorySlug(categoryName);

  // Normalize required documents
  const rawRequired = raw.requiredDocuments || raw.required || [];
  const required = rawRequired.map((doc, docIdx) => {
    if (typeof doc === 'string') {
      return {
        id: `${id}_req_${docIdx}`,
        title: doc,
        priority: docIdx === 0 ? 'high' : docIdx < 3 ? 'high' : 'medium',
        note: 'Mandatory requirement',
        why: `Required by authorities to establish identity, eligibility, or compliance for ${title}.`,
        prepTip: 'Carry original document along with self-attested photocopies.'
      };
    }
    return {
      id: doc.id || `${id}_req_${docIdx}`,
      title: doc.title || doc.name || `Requirement ${docIdx + 1}`,
      priority: doc.priority || (docIdx === 0 ? 'high' : 'medium'),
      note: doc.note || 'Mandatory requirement',
      why: doc.why || `Required for ${title} verification.`,
      prepTip: doc.prepTip || 'Carry original and photocopy.'
    };
  });

  // Normalize optional documents
  const rawOptional = raw.optionalDocuments || raw.optional || [];
  const optional = rawOptional.map((doc, docIdx) => {
    if (typeof doc === 'string') {
      return {
        id: `${id}_opt_${docIdx}`,
        title: doc,
        priority: 'low',
        note: 'Supporting document (if applicable)',
        why: `May be requested depending on specific applicant circumstances for ${title}.`,
        prepTip: 'Keep a copy ready in case requested by the evaluating officer.'
      };
    }
    return {
      id: doc.id || `${id}_opt_${docIdx}`,
      title: doc.title || doc.name || `Supporting Document ${docIdx + 1}`,
      priority: doc.priority || 'low',
      note: doc.note || 'Supporting document',
      why: doc.why || `Supporting documentation for ${title}.`,
      prepTip: doc.prepTip || 'Keep a copy ready if applicable.'
    };
  });

  // Normalize preparation notes
  const notes =
    Array.isArray(raw.notes) && raw.notes.length > 0
      ? raw.notes
      : [
          raw.processingTime
            ? `Expected processing time: ${raw.processingTime}.`
            : 'Processing time varies by local authority office.',
          raw.officialPortal
            ? `Official Portal: ${raw.officialPortal}`
            : 'Always confirm latest checklist rules with the issuing organization before visiting.',
          'Carry physical original documents for on-site verification.'
        ];

  return {
    ...raw,
    id,
    name: title,
    title,
    category: categorySlug,
    categoryName,
    description: shortDesc,
    shortDesc,
    requiredDocuments: raw.requiredDocuments || required.map((r) => r.title),
    optionalDocuments: raw.optionalDocuments || optional.map((o) => o.title),
    required,
    optional,
    notes,
    processingTime: raw.processingTime || null,
    officialPortal: raw.officialPortal || null
  };
}

/**
 * Fetches all services from http://localhost:5000/api/services using native fetch.
 * Returns { success: true, services: [...] } or throws an error.
 */
export async function fetchServicesApi() {
  const response = await fetch(`${API_BASE_URL}/services`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  // Handle both response shapes: { services: [...] } or plain array [...]
  const rawList = Array.isArray(data)
    ? data
    : Array.isArray(data?.services)
    ? data.services
    : [];

  return {
    success: true,
    total: rawList.length,
    services: rawList.map((item, idx) => adaptBackendService(item, idx))
  };
}

/**
 * Fetches a single service by ID from http://localhost:5000/api/services/:id.
 */
export async function fetchServiceByIdApi(id) {
  const response = await fetch(`${API_BASE_URL}/services/${encodeURIComponent(id)}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Service '${id}' not found (status ${response.status})`);
  }

  const data = await response.json();
  const rawService = data.service || data;
  return adaptBackendService(rawService);
}

/**
 * Checks server health from http://localhost:5000/api/health.
 */
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) return { healthy: false };
    const data = await response.json();
    return { healthy: data.status === 'healthy', data };
  } catch {
    return { healthy: false };
  }
}
