import express from "express";
import {
    createGroup,
    getAllGroups,
    getOneGroup,
    deleteGroup,
    updateGroup,
} from '../controllers/GroupController.js';

// import { addUsersToGroup } from '../controllers/UserGroupController.js';

import {
    logParams
} from '../log/logger.js';

const router = express.Router();

router.post('/', logParams, createGroup);
router.get('/', logParams, getAllGroups);

router.get('/:id', logParams, getOneGroup);
router.delete('/:id', logParams, deleteGroup);
router.put('/:id', logParams, updateGroup);

// router.post('/user-groups', addUsersToGroup);

export default router;