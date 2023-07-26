import express  from "express";
import passport from "passport";
import { getLoggedInUser } from "../controllers/userController.js";


const router = express.Router();

router.get('/', passport.authenticate("jwt"), getLoggedInUser)

export default router;