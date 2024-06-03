import { Router } from "express";
import * as auth from "../../controllers/authController.js";
import { privateRouteAdmin } from "../../middlewares/auth.js";
const router = Router();

router.get('/pingAdmin',privateRouteAdmin);


export default router;