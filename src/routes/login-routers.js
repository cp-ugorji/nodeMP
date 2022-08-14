import express from "express";
import { login } from '../controllers/LoginController.js';
import { logParams } from '../log/logger.js';

const router = express.Router();

router.post("/", logParams, login);

export default router;