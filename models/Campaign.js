import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  raisedAmount: {
    type: Number,
    default: 0,
  },
  donors: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'completed'],
    default: 'pending',
  },
  // Store the public ID and URL from Cloudinary
  image: {
    publicId: { type: String, required: true },
    url: { type: String, required: true }
  },
  // Store Stripe's Product ID and Price ID for easy retrieval
  stripeProductId: { type: String },
  stripePriceId: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);