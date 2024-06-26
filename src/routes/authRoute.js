import { Router } from "express";
import * as auth from "../controllers/authController.js";
const router = Router();

router.post('/signin', auth.signin);
router.post('/signup', auth.signup);


export default router;