import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    permissions: [String], // e.g., ["view_tasks", "submit_work", "approve_tasks"]
    taskTypes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"actions"
    }], // e.g., ["editing", "color_grading", "shooting"]
    workflowStage: Number, // To define execution order, e.g. editor = 1, colorist = 2
}, {
    timestamps: true
});


export default mongoose.models.roleSchema ||
    mongoose.model("roleSchema", roleSchema);