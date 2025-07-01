import mongoose from "mongoose";

export interface IProject {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  customerId: mongoose.Types.ObjectId;
  contractId: mongoose.Types.ObjectId;
  projectManagerId: mongoose.Types.ObjectId;
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate?: Date;
  expectedEndDate?: Date;
  actualEndDate?: Date;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  paidAmount: number;
  totalPrice: number;
  finalPrice: number;
  discount: number;
  notes: string;
  internalNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: true
  },
  projectManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'paused', 'completed', 'cancelled'],
    default: 'planning',
    required: true
  },
  startDate: {
    type: Date
  },
  expectedEndDate: {
    type: Date
  },
  actualEndDate: {
    type: Date
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'overdue'],
    default: 'pending',
    required: true
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  finalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    default: '',
    trim: true
  },
  internalNotes: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;
