import Sequelize from 'sequelize';
import {
    sequelize
} from '../config/database.js';

export const User = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    login: {
        type: Sequelize.TEXT
    },
    password: {
        type: Sequelize.TEXT
    },
    age: {
        type: Sequelize.INTEGER
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

User.sync();