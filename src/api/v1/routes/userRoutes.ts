// src/routes/userRoutes.ts
import express from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { auth } from "src/config/firebaseconfig";

const router = express.Router();

router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"], allowSameUser: true }),
  async (req, res, next) => {
    try {
      const userRecord = await auth.getUser(req.params.id);

      res.status(200).json({
        uid: userRecord.uid,
        email: userRecord.email,
        role: userRecord.customClaims?.role || "user",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
