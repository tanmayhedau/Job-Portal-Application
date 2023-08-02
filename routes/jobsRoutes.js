import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJob,
  getAllJobs,
  jobStats,
  updateJob,
} from "../controllers/jobsController.js";

const router = express.Router();

router.post("/create-job", userAuth, createJobController);
router.get("/get-jobs", userAuth, getAllJobs);
router.patch("/update-job/:id", userAuth, updateJob);
router.delete("/delete-job/:id", userAuth, deleteJob);
router.get("/job-stats", userAuth, jobStats);

export default router;
