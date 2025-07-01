import mongoose from "mongoose";

export interface IServiceRequest {
  _id: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  quantity: number;
  agreedPrice: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  requestedDate: Date;
  scheduledDate?: Date;
  requirements: string;
  notes: string;
  requestedBy: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const serviceRequestSchema = new mongoose.Schema<IServiceRequest>({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  agreedPrice: {
    type: Number,
    required: true,
    min: 0
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
    required: true
  },
  requestedDate: {
    type: Date,
    required: true
  },
  scheduledDate: {
    type: Date
  },
  requirements: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    default: '',
    trim: true
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

const ServiceRequest = mongoose.models.ServiceRequest || 
  mongoose.model<IServiceRequest>('ServiceRequest', serviceRequestSchema);

export default ServiceRequest;
