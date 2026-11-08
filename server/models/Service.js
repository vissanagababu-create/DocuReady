const mongoose = require('mongoose');

/**
 * Service Mongoose Schema for DocuReady
 *
 * Represents an official service / checklist requirement record.
 */
const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Service ID is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    requiredDocuments: {
      type: [String],
      default: []
    },
    optionalDocuments: {
      type: [String],
      default: []
    },
    processingTime: {
      type: String,
      default: '',
      trim: true
    },
    officialPortal: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Prevent re-compilation in development environments
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

module.exports = Service;
