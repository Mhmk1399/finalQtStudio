import mongoose from "mongoose";

export interface IContract {
  _id: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  contractNumber: string;
  status: 'draft' | 'active' | 'completed' | 'terminated' | 'expired';
  signedDate?: Date;
  expiryDate?: Date;
  totalValue: number;
  terms: string;
  salesPersonId: mongoose.Types.ObjectId;
  contractType: 'standard' | 'premium' | 'enterprise' | 'custom';
}

const contractSchema = new mongoose.Schema<IContract>({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  contractNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'terminated', 'expired'],
    default: 'draft',
    required: true
  },
  signedDate: {
    type: Date
  },
  expiryDate: {
    type: Date
  },
  totalValue: {
    type: Number,
    required: true,
    min: 0
  },
  terms: {
    type: String,
    required: true
  },
  salesPersonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contractType: {
    type: String,
    enum: ['standard', 'premium', 'enterprise', 'custom'],
    required: true
  }
}, {
  timestamps: true
});

const Contract = mongoose.models.Contract || mongoose.model<IContract>('Contract', contractSchema);

export default Contract;
