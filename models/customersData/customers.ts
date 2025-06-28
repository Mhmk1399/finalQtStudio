import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({

    name: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    BusinesName: { type: String },
    businesScale:{type:String},
    address: { type: String },
    email: { type: String },
    website: { type: String },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default mongoose.models.Customers || mongoose.model("Customers", customerSchema);