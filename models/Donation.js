// models/Donation.js
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'bank_transfer', 'paypal', 'cash'],
    default: 'stripe'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  transactionId: {
    type: String
  },
  donorName: {
    type: String
  },
  donorEmail: {
    type: String
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: Object
  }
}, {
  timestamps: true
});

// Indexes for faster queries
donationSchema.index({ campaignId: 1, createdAt: -1 });
donationSchema.index({ donorId: 1, createdAt: -1 });
donationSchema.index({ status: 1 });
donationSchema.index({ createdAt: -1 });

const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);
export default Donation;