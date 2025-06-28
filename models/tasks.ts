import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
    taskType: { type: String, required: true }, // e.g. "editing", "filming", etc.
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["not_started", "in_progress", "submitted", "needs_changes", "approved"],
        default: "not_started"
    },
    submissionUrl: String,
    notes: String,
    dueDate: Date,
    workflowStage: Number,
}, {
    timestamps: true
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
