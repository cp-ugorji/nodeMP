import Sequelize from 'sequelize';
import {
    sequelize
} from '../config/database.js';

export const UserGroup = sequelize.define('userGroup', {
    userid: {
        type: Sequelize.STRING,
        references: {
            model: 'User',
            key: 'id',
            as: 'userid'
        }
    },
    groupid: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Group',
            key: 'id',
            as: 'groupid'
        }
    }
}, {
    timestamps: false
});

UserGroup.sync();