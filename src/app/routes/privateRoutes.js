import { Router } from "express";
import * as auth from "../app/controllers/authController.js.js";
import { privateRoute } from "../app/middlewares/private.js.js";
const router = Router();

router.get('/isLogged',privateRoute);


export default router;