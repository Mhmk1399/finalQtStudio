import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    // Project basic information
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },

    // Customer information
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },

    // Services with individual pricing
    services: [
        {
            serviceId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            quantity: {
                type: Number,
                default: 1,
                min: 4
            }
        }
    ],


    // Project status
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'cancelled', 'on_hold'],
        default: 'pending'
    },

    // Project timeline
    startDate: {
        type: Date,
        default: Date.now
    },
    expectedEndDate: {
        type: Date
    },
    actualEndDate: {
        type: Date
    },

    // Payment information
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'partial', 'paid', 'refunded'],
        default: 'unpaid'
    },
    paidAmount: {
        type: Number,
        default: 0,
        min: 0
    },



    // Project notes and communication
    notes: {
        type: String,
        trim: true
    },
    internalNotes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});




const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
