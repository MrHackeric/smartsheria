import { createBugReport, getAllBugReports, getBugReportById, deleteBugReport } from "../services/bugReportService.js";

// Handle creating a new bug report
export const submitBugReport = async (req, res) => {
  try {
    const bugReport = await createBugReport(req.body);
    res.status(201).json({ message: "Bug report submitted successfully", bugReport });
  } catch (error) {
    res.status(500).json({ error: "Error submitting bug report" });
  }
};

// Get all bug reports
export const fetchBugReports = async (req, res) => {
  try {
    const bugReports = await getAllBugReports();
    res.status(200).json(bugReports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bug reports" });
  }
};

// Get a single bug report by ID
export const fetchBugReportById = async (req, res) => {
  try {
    const bugReport = await getBugReportById(req.params.id);
    if (!bugReport) return res.status(404).json({ error: "Bug report not found" });
    res.status(200).json(bugReport);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bug report" });
  }
};

// Delete a bug report
export const removeBugReport = async (req, res) => {
  try {
    const deletedReport = await deleteBugReport(req.params.id);
    if (!deletedReport) return res.status(404).json({ error: "Bug report not found" });
    res.status(200).json({ message: "Bug report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting bug report" });
  }
};
