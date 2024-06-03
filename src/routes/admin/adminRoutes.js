import { Router } from "express";
import * as auth from "../../controllers/auth.js";
import { privateRouteAdmin } from "../../middlewares/auth.js";
const router = Router();

router.get('/pingAdmin',privateRouteAdmin);


export default router;