import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    passwordHash: String,
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    phoneNumber: String,
    messagingPlatform: {
        type: String,
        enum: ["whatsapp", "telegram", "webapp"],
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    crmDetails: {
        companyName: String,
        address: String,
        email: String,
        website: String,
        birthDate: Date,
        imageUrl: String
    }
}, {
    timestamps: true
});


export default mongoose.models.userSchema ||
    mongoose.model("userSchema", userSchema);