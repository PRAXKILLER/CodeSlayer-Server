import express from "express";

import {
  addAProblem,
  deleteAProblem,
  getAParticularProblem,
  getProblemsList,
  updateAProblem,
} from "../controllers/problemsController.js";

const router = express.Router();

router.get("/", getProblemsList);
router.get("/:_id", getAParticularProblem);
router.post("/add", addAProblem);
router.put("/update/:_id", updateAProblem);
router.delete("/delete/:_id", deleteAProblem);

export default router;
