import BugReport from "../models/BugReport.js";

// Create a new bug report
export const createBugReport = async (data) => {
  const newBugReport = new BugReport(data);
  return await newBugReport.save();
};

// Get all bug reports
export const getAllBugReports = async () => {
  return await BugReport.find();
};

// Get a single bug report by ID
export const getBugReportById = async (id) => {
  return await BugReport.findById(id);
};

// Delete a bug report
export const deleteBugReport = async (id) => {
  return await BugReport.findByIdAndDelete(id);
};
