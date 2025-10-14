import express from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

// Example: Admin-only endpoint
router.post(
  "/admin/setCustomClaims",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  async (req, res) => {
    // Only admins can reach here
    res.json({ message: "Admin access granted!" });
  }
);

// Example: User endpoint, self-access allowed
router.get(
  "/users/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"], allowSameUser: true }),
  async (req, res) => {
    res.json({ message: "Access granted to user data!" });
  }
);

export default router;
