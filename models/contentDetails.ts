import mongoose from "mongoose";


const contentDetailsSchema = new mongoose.Schema({
    referenceLinks: [String],
    name: String,
    description: String,
    dueDate: Date,
    status: {
        type: String,
        enum: ["pending", "in_progress", "awaiting_approval", "completed", "rejected"],
        default: "pending"
    },
    price: Number,
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },
    deliverableUrls: [String],
}, { _id: false });



export default mongoose.models.contentDetailsSchema ||
    mongoose.model("contentDetailsSchema", contentDetailsSchema);