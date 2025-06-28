import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    sellPrice: Number,
    actions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "actions"
        , count: Number
    }],
    estimatedDeliveryDays: Number,
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
