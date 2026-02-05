import express from "express";
import {
    ideate,
    draft,
    refine,
    repurpose,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/ideate", ideate);
router.post("/draft", draft);
router.post("/refine", refine);
router.post("/repurpose", repurpose);

export default router;
