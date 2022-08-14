import express from "express";
import {
    createUser,
    deleteUser,
    findUser,
    getUser,
    updateUser,
    getSuggestLogin
} from '../controllers/UserController.js';

import {
    logParams
} from '../log/logger.js';

const router = express.Router();

router.get("/", logParams, getUser);
// router.get("/suggested-logins", getSuggestLogin);
router.post("/", logParams, createUser);
// /api/users/:userID
router.get('/:id', logParams, findUser);
router.delete('/:id', logParams, deleteUser);
router.patch('/:id', logParams, updateUser);

export default router;