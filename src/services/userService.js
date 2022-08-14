import {User} from '../database/models/User.js';

export const getUsers = async id => {
    if (id) {
        return await User.findAll({
            attributes: ['id', 'login', 'password', 'age'],
            where: {
                id
            }
        });
    }
    return await User.findAll();
};

export const addUser = async ({
    id,
    login,
    password,
    age
}) => {
    return User.create({
        id,
        login,
        password,
        age
    }, {
        fields: ["login", "password", "age"]
    },
    {
        include: [{
            model: Group,
            as: 'groups'
        }]
    });
};

export const getUserById = async id =>
    await User.findOne({
        where: {
            id
        }
    });

export const updateUserById = async (id, {
    login,
    password,
    age
}) =>
    await User.update(
        {
            login,
            password,
            age
        }, 
        {
            where: {
                id
            }
        }
);

export const deleteUserById = async id =>
    await User.destroy({
        where: {
            id
        }
    }
);

export const logicallyDeleteUserById = async id =>
    await User.update(
        { isDeleted: true }, 
        {
            where: {
                id
            }
        }
);