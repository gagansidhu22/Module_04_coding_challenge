import express from "express";

import { auth } from "../../../config/firebaseconfig";

import { authenticate } from "../middleware/authorize";

import isAuthorized from "../middleware/authorize";
 
const router = express.Router();
 
/**

* POST /api/v1/admin/setCustomClaims

* Only admins can set roles for users

*/

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

      res.status(200).json({ message: `Role '${role}' assigned to user ${uid}` });

    } catch (error) {

      next(error);

    }

  }

);
 
export default router;

 