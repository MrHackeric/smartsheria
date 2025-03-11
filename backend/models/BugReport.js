import mongoose from "mongoose";

const bugReportSchema = new mongoose.Schema({
  issueDescription: { type: String, required: true },
  systemEnvironment: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
});

const BugReport = mongoose.model("BugReport", bugReportSchema);

export default BugReport;
