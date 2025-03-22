import mongoose from "mongoose";

const bugReportSchema = new mongoose.Schema({
  email: { type: String, required: true }, // ✅ Added email field
  operatingSystem: { type: String, required: true },
  browser: { type: String, required: true },
  issueDescription: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
});

const BugReport = mongoose.model("BugReport", bugReportSchema);

export default BugReport;
