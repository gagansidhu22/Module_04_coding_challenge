import express from "express";
import authenticate from "../middleware/authenticate";
 
const router = express.Router();
 
router.get("/", authenticate, (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile",
    uid: res.locals.uid,
    role: res.locals.role,
  });
});
 
export default router;