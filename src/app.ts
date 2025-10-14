// src/index.ts

import express from "express";

import adminRoutes from "../src/api/v1/routes/adminRoutes";

import userRoutes from "../src/api/v1/routes/userRoutes";

import profileRoutes from "../src/api/v1/routes/profileRoutes";

import { errorHandler } from "./middleware/errorHandler";
 
const app = express();

app.use(express.json());
 
// Routes

app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/profile", profileRoutes);
 
// Centralized error handler

app.use(errorHandler);
 
export default app;