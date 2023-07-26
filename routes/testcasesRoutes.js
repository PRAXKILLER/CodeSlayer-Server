import express from "express";

import {
  addATestcase,
  deleteATestcase,
  getAllTestcasesForAProblem,
  updateATestcase,
} from "../controllers/testcasesContoller.js";

const router = express.Router();

router.post("/add", addATestcase);
router.get("/get/:problemId", getAllTestcasesForAProblem);
router.put("/update/:_id", updateATestcase);
router.delete("/delete/:_id", deleteATestcase);

export default router;
