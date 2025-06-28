import mongoose from "mongoose";



const requestSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    contentDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentDetails'
    }],
    status: {
        type: String,
        enum: ["pending", "in_progress", "awaiting_approval", "rejected", "re_edited", "completed"],
        default: "pending"
    },
    price: Number,
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },
    tasks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, {
    timestamps: true
});

export default mongoose.models.Request || mongoose.model("Request", requestSchema);
