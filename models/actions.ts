import mongoose from "mongoose";


const actionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    sallaryPrice: Number,
    
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default mongoose.models.Action || mongoose.model("Action", actionSchema);