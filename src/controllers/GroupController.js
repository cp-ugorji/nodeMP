import {
    addGroup,
    findAllGroups,
    deleteGroupById,
    findOneGroup,
    updateGroupById,
} from '../services/groupService.js';

export const createGroup = async (req, res) => {
    try {
        const newGroup = await addGroup(req.body);

        if (newGroup) {
            return res.json({
                message: "Group created successfully",
                data: newGroup
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something goes wrong",
            data: {}
        });
    }

};

export const getAllGroups = async (req, res) => {
    const groups = await findAllGroups();

    res.json({
        groups
    });
};

export const getOneGroup = async (req, res) => {
    const {
        id
    } = req.params;

    const group = await findOneGroup(id);

    res.json(
        group
    );
};

export const updateGroup = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        userid,
        name,
        permission
    } = req.body;

    const updatedGroup = await updateGroupById(userid, name, permission, id);

    res.json({
        message: 'Group updated',
        updatedGroup
    });

};

export const deleteGroup = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const group = await deleteGroupById(id);

        res.json({
            message: 'Group deleted successfully',
            count: group
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something goes wrong",
            count: {}
        });
    }
};