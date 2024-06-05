import { Router } from "express";
import * as auth from "../controllers/authController.js";
import { privateRoute } from "../middlewares/private.js";
const router = Router();

router.get('/isLogged',privateRoute);


export default router;