// src/routes/adminRoutes.ts
import express from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { auth } from "src/config/firebaseconfig";

const router = express.Router();

router.post(
  "/setCustomClaims",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  async (req, res, next) => {
    try {
      const { uid, role } = req.body;

      if (!uid || !role) {
        return res.status(400).json({ error: "UID and role are required" });
      }

      await auth.setCustomUserClaims(uid, { role });

      res.status(200).json({
        status: "success",
        message: `Role '${role}' assigned to user ${uid}`,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

