import { Router } from "express";
import * as auth from "../app/controllers/authController.js.js";
const router = Router();

router.post('/signin', auth.signin);
router.post('/signup', auth.signup);


export default router;