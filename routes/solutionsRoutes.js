import express from "express";

import {
  addASolution,
  getAllSolutionsForAParticularUserForAProblem,
  runAProblem,
  submitAProblem,
} from "../controllers/solutionsController.js";
import passport from "passport";

const router = express.Router();

router.post("/add", passport.authenticate("jwt"), addASolution);
router.get(
  "/get/:problemId/:userId",
  getAllSolutionsForAParticularUserForAProblem
);
router.post("/run/:problemId", passport.authenticate("jwt"), runAProblem);
router.post("/submit/:problemId", passport.authenticate("jwt"), submitAProblem);

export default router;
