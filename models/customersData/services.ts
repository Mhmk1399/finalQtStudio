import mongoose from "mongoose";


const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },

    isActive: { type: Boolean, default: true }

}, {
    timestamps: true
});

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);