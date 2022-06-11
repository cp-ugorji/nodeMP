import {
    v4 as uuidv4
} from "uuid";
import {
    schemaValidation
} from '../utilities/validator.js';

import { addUser, getUsers, getUserById, getAutoSuggestUsers } from '../database/UsersDB.js';

export const createUser = async (req, res) => {
    const data = req.body;

    const schema = schemaValidation();
    const validation = schema.validate(req.body);

    const users = {
        ...data,
        id: uuidv4()
    }

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
    } else {

        await addUser(users);

        res.send(validation);

    }
};

export const getUser = async (req, res) => res.send(await getUsers());

export const findUser = async (req, res) => {
    const {
        id
    } = req.params;

    const user = await getUserById(id);

    res.send(user);
};

export const deleteUser = async (req, res) => {
    const {
        id
    } = req.params;

    const user = await getUserById(id);

    if (user) user.isDeleted = true;

    res.send(`User with the id ${id} deleted from the database.`);
};

export const updateUser = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        login,
        password,
        age,
    } = req.body;

    const schema = schemaValidation();
    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
    } else {
        const user = await getUserById(id);

        if (login) user.login = login;
        if (password) user.password = password;
        if (age) user.age = age;

        res.send(`User with the id ${id} has been updated`);
    }
};

export const getSuggestLogin = (req, res) => {
    const {
        login,
        limit
    } = req.query;

    const suggest = getAutoSuggestUsers(login, limit);

    res.json(suggest);
};