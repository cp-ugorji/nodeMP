import { Group } from "../database/models/Group.js";

export const addGroup = async ({
    name,
    permission,
    userid
}) => {
    return await Group.create({
        name,
        permission,
        userid
    }, {
        fields: ["name", "permission", "userid"]
    });
};

export const findAllGroups = async () => {
    return await Group.findAll({
        attributes: ['id', 'userid', 'name', 'permission'],
        order: [
            'id'
        ]
    });
};

export const deleteGroupById = async id => {
    return await Group.destroy({
        where: {
            id
        }
    });
};

export const findOneGroup = async id => {
    return await Group.findOne({
        attributes: ['name', 'userid', 'permission', 'id'],
        where: {
            id
        }
    });
};

export const updateGroupById = async (
    userid,
    name,
    permission,
    id
) => {
    return await Group.update({
        userid,
        name,
        permission,
    }, {
        where: {
            id
        }
    });
};
