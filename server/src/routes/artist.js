import express from "express";
import {
    addArtist,
    deleteArtist,
    getArtist,
    applyAsArtist,
    getMyApplication,
    getAllApplications,
    approveApplication,
    rejectApplication,
    getMyArtistProfile,
    updateMyArtistProfile,
} from "../controllers/artist.controller.js";
import { AuthMiddleware, adminOnly, requireCsrf } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/* ── Public ────────────────────────────────── */
router.get("/get", getArtist);

/* ── Logged-in users ───────────────────────── */
router.post("/apply", AuthMiddleware, requireCsrf, applyAsArtist);
router.get("/my-application", AuthMiddleware, getMyApplication);
router.get("/profile", AuthMiddleware, getMyArtistProfile);
router.patch("/profile", AuthMiddleware, requireCsrf, updateMyArtistProfile);

/* ── Admin only ────────────────────────────── */
router.post("/add", adminOnly, requireCsrf, addArtist);
router.delete("/delete/:id", adminOnly, requireCsrf, deleteArtist);
router.get("/applications", adminOnly, getAllApplications);
router.patch("/applications/:id/approve", adminOnly, requireCsrf, approveApplication);
router.patch("/applications/:id/reject", adminOnly, requireCsrf, rejectApplication);

export default router;
