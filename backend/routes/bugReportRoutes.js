import express from "express";
import { submitBugReport, fetchBugReports, fetchBugReportById, removeBugReport } from "../controllers/bugReportController.js";

const router = express.Router();

router.post("/", submitBugReport); // Create bug report
router.get("/", fetchBugReports); // Get all bug reports
router.get("/:id", fetchBugReportById); // Get a single bug report by ID
router.delete("/:id", removeBugReport); // Delete a bug report

export default router;
