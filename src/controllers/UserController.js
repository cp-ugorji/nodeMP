import {
    v4 as uuidv4
} from "uuid";
import {
    schemaValidation
} from '../utilities/validator.js';

import { addUser, getUsers, getUserById, updateUserById, logicallyDeleteUserById } from '../services/userService.js';

export const createUser = async (req, res) => {
    try{
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
            const newUser = await addUser(users);
            if (newUser) {
                return res.json({
                    message: "User created successfully",
                    data: newUser
                });
            }
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something goes wrong",
            data: {}
        });
    }
};

export const getUser = async (req, res) => {
    const users = await getUsers();
    return res.json({
        data: users
    });
}

export const findUser = async (req, res) => {
    const {
        id
    } = req.params;

    const user = await getUserById(id);

    return res.json(user);
};

export const deleteUser = async (req, res) => {
    const {
        id
    } = req.params;

    const user = await getUserById(id);

    if (user) {
        const deleteRowCount = await logicallyDeleteUserById(id);
        return res.json({
            message: 'User deleted successfully',
            count: deleteRowCount
        });
    }
    else{
        return res.json({
            message: 'User not found'
        });
    }
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
        if(!user){
            return res.json({
                message: 'User not found'
            });
        }

        if (login) user.login = login;
        if (password) user.password = password;
        if (age) user.age = age;

        const updated = await updateUserById(id, user);

        return res.json({
            message: `User with the id ${id} has been updated`,
            data: updated
        });
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