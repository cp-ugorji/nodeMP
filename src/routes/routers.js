import express from "express";
import {
    createUser,
    deleteUser,
    findUser,
    getUser,
    updateUser,
    getSuggestLogin
} from '../controllers/UserController.js';

const router = express.Router();

router.get("/", getUser);
router.get("/suggested-logins", getSuggestLogin);
router.post("/", createUser);
router.get('/:id', findUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;