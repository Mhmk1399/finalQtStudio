import mongoose from "mongoose";

export interface ICustomer {
  _id: mongoose.Types.ObjectId;
  name: string;
  phoneNumber: string;
  businessName: string;
  businessScale: string;
  address: string;
  email: string;
  website?: string;
  isActive: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
}

const customerSchema = new mongoose.Schema<ICustomer>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessScale: {
    type: String,
    required: true,
    enum: ['startup', 'small', 'medium', 'large', 'enterprise']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  website: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  }
}, {
  timestamps: true
});

const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', customerSchema);

export default Customer;
