import mongoose from "mongoose";

export interface IService {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  duration: string;
  requirements: string;
  teamType: string;
  isActive: boolean;
}

const serviceSchema = new mongoose.Schema<IService>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  requirements: {
    type: String,
    required: true,
    trim: true
  },
  teamType: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Service = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);

export default Service;
