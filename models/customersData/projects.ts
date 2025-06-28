import mongoose from "mongoose";

interface IService {
  serviceId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

interface IProject extends Document {
  title: string;
  description: string;
  customerId: mongoose.Types.ObjectId;
  services: IService[];
  status: "pending" | "in_progress" | "completed" | "cancelled" | "on_hold";
  startDate: Date;
  expectedEndDate?: Date;
  actualEndDate?: Date;
  paymentStatus: "unpaid" | "partial" | "paid" | "refunded";
  paidAmount: number;
  totalPrice: number;
  finalPrice: number;
  discount: number;
  notes?: string;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  // Virtual properties
  remainingPayment: number;
  paymentPercentage: number;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    // Project basic information
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Customer information
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // Services with individual pricing
    services: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 4,
        },
      },
    ],

    // Project status
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled", "on_hold"],
      default: "pending",
    },

    // Project timeline
    startDate: {
      type: Date,
      default: Date.now,
    },
    expectedEndDate: {
      type: Date,
    },
    actualEndDate: {
      type: Date,
    },

    // Payment information
    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid", "refunded"],
      default: "unpaid",
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Project notes and communication
    notes: {
      type: String,
      trim: true,
    },
    internalNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to calculate total and final price
projectSchema.pre("save", function (next) {
  // Calculate total price from services
  this.totalPrice = this.services.reduce((total, service) => {
    return total + service.price * service.quantity;
  }, 0);

  // Calculate final price after discount
  this.finalPrice = this.totalPrice - this.discount;

  next();
});

// Virtual for remaining payment
projectSchema.virtual("remainingPayment").get(function () {
  return this.finalPrice - this.paidAmount;
});

// Virtual for payment percentage
projectSchema.virtual("paymentPercentage").get(function () {
  if (this.finalPrice === 0) return 0;
  return Math.round((this.paidAmount / this.finalPrice) * 100);
});

// Indexes for better query performance
projectSchema.index({ customerId: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ paymentStatus: 1 });
projectSchema.index({ createdAt: -1 });

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
