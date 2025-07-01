import mongoose from "mongoose";

export interface IVerificationRequest {
  _id: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  salesUserId: mongoose.Types.ObjectId;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const verificationRequestSchema = new mongoose.Schema<IVerificationRequest>({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'in-review'],
    default: 'pending',
    required: true
  },
  salesUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const VerificationRequest = mongoose.models.VerificationRequest || 
  mongoose.model<IVerificationRequest>('VerificationRequest', verificationRequestSchema);

export default VerificationRequest;
